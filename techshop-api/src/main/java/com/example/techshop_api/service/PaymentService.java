package com.example.techshop_api.service;

import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.payment.StripeCheckoutResponse;
import com.example.techshop_api.entity.order.Order;
import com.example.techshop_api.entity.order.OrderItem;
import com.example.techshop_api.entity.payment.Payment;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.repository.OrderRepository;
import com.example.techshop_api.repository.PaymentRepository;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentService {
    final PaymentRepository paymentRepository;
    final OrderRepository orderRepository;

    @Value("${stripe.secret-key}")
    String stripeSecretKey;

    @Value("${stripe.webhook-signing-secret}")
    String webhookSigningSecret;

    @Value("${stripe.success-url}")
    String successUrl;

    @Value("${stripe.cancel-url}")
    String cancelUrl;

    @Transactional
    public ApiResponse<Void> checkoutCod(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        order.setStatus("PENDING");
        Payment payment = Payment.builder()
                .order(order)
                .amount(order.getTotalAmount())
                .paymentMethod("COD")
                .paymentStatus("PENDING")
                .build();
        try {
            orderRepository.save(order);
            paymentRepository.save(payment);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.UPDATE_FAILED);
        }
        return ApiResponse.<Void>builder()
                .success(true)
                .message("Set payment successfully")
                .build();
    }

    @Transactional
    public ApiResponse<StripeCheckoutResponse> checkoutTransfer(Long orderId) {
        Stripe.apiKey = stripeSecretKey;
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        List<OrderItem> orderItemList = order.getOrderItemList();

        List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();
        for(OrderItem item : orderItemList) {
            // ProductData
            SessionCreateParams.LineItem.PriceData.ProductData productData =
                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                            .setName(item.getProductVariation().getSku())
                            .build();

            // PriceData
            SessionCreateParams.LineItem.PriceData priceData =
                    SessionCreateParams.LineItem.PriceData.builder()
                            .setCurrency("vnd")
                            .setUnitAmountDecimal(new BigDecimal(item.getUnitPrice()))
                            .setProductData(productData)
                            .build();

            // LineItem
            SessionCreateParams.LineItem lineItem =
                    SessionCreateParams.LineItem.builder()
                            .setQuantity(Long.valueOf(item.getQuantity()))
                            .setPriceData(priceData)
                            .build();

            lineItems.add(lineItem);
        }

        SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successUrl)
                .setCancelUrl(cancelUrl)
                .setClientReferenceId(orderId.toString())
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD);

        for(SessionCreateParams.LineItem lineItem : lineItems) {
            paramsBuilder.addLineItem(lineItem);
        }

        try {
            Session session = Session.create(paramsBuilder.build());
            StripeCheckoutResponse stripeCheckoutResponse = StripeCheckoutResponse.builder()
                    .sessionId(session.getId())
                    .sessionUrl(session.getUrl())
                    .build();
            return ApiResponse.<StripeCheckoutResponse>builder()
                    .success(true)
                    .data(stripeCheckoutResponse)
                    .build();
        } catch (StripeException e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.CREATE_PAYMENT_FAILED);
        }
    }

    @Transactional
    public ApiResponse<Void> handleStripeWebhook(String payload, String signature) {
        try {
            Event event = Webhook.constructEvent(payload, signature, webhookSigningSecret);
            if(!event.getApiVersion().equals(Stripe.API_VERSION)) {
                log.error("Please update Stripe dependency");
            }
            if (event.getType().equals("checkout.session.completed")) {
                Session session = (Session) event.getDataObjectDeserializer()
                        .getObject().orElseThrow(() -> new AppException(ErrorCode.SESSION_NOT_FOUND));
                Long orderId = Long.valueOf(session.getClientReferenceId());
                String status = session.getPaymentStatus();
                if (status.equals("paid")) {
                    Order order = orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
                    order.setStatus("PENDING");
                    double amount = session.getAmountTotal();
                    Payment payment = Payment.builder()
                            .order(order)
                            .amount(amount)
                            .paymentMethod("TRANSFER")
                            .paymentStatus("SUCCESS")
                            .paymentGateway("STRIPE")
                            .build();
                    try {
                        orderRepository.save(order);
                        paymentRepository.save(payment);
                    } catch (Exception e) {
                        log.error(e.getMessage());
                        throw new AppException(ErrorCode.UPDATE_FAILED);
                    }
                }
            }
            return ApiResponse.<Void>builder()
                    .success(true)
                    .build();
        } catch (SignatureVerificationException e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INVALID_SIGNATURE);
        }
    }
}
