package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.order.OrderCreationRequest;
import com.example.techshop_api.dto.request.order.OrderFilter;
import com.example.techshop_api.dto.request.order.OrderItemCreationRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.order.OrderDetailResponse;
import com.example.techshop_api.dto.response.order.OrderItemDetailResponse;
import com.example.techshop_api.dto.response.order.OrderResponse;
import com.example.techshop_api.dto.response.payment.PaymentDetailResponse;
import com.example.techshop_api.entity.order.Order;
import com.example.techshop_api.entity.order.OrderItem;
import com.example.techshop_api.entity.payment.Payment;
import com.example.techshop_api.entity.product.ProductVariation;
import com.example.techshop_api.entity.user.User;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.OrderItemMapper;
import com.example.techshop_api.mapper.OrderMapper;
import com.example.techshop_api.mapper.PaymentMapper;
import com.example.techshop_api.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService {
    OrderRepository orderRepository;
    UserRepository userRepository;
    InventoryRepository inventoryRepository;
    ProductVariationRepository productVariationRepository;
    PaymentRepository paymentRepository;
    OrderItemRepository orderItemRepository;
    OrderMapper orderMapper;
    OrderItemMapper orderItemMapper;
    PaymentMapper paymentMapper;

    public ApiResponse<Page<OrderResponse>> index(Pageable pageable) {
        Specification<Order> spec = Specification.where(OrderRepository.OrderSpecification.statusIsNotLike("INVALID"));
        Page<Order> orders = orderRepository.findAll(spec, pageable);
        Page<OrderResponse> orderResponses = orders.map(orderMapper::toOrderResponse);
        return ApiResponse.<Page<OrderResponse>>builder()
                .success(true)
                .data(orderResponses)
                .build();
    }

    public ApiResponse<Page<OrderResponse>> indexFilter(Pageable pageable, OrderFilter filter) {
        Specification<Order> spec = Specification.where(OrderRepository.OrderSpecification.hasId(filter.getOrderId()))
                .and(OrderRepository.OrderSpecification.hasOrderName(filter.getOrderName()))
                .and(OrderRepository.OrderSpecification.hasStatus(filter.getStatus()))
                .and(OrderRepository.OrderSpecification.statusIsNotLike("INVALID"))
                .and(OrderRepository.OrderSpecification.orderTimeAfter(filter.getAfterTime()))
                .and(OrderRepository.OrderSpecification.orderTimeBefore(filter.getBeforeTime()))
                .and(OrderRepository.OrderSpecification.amountGreaterThanOrEqualTo(filter.getMinAmount()))
                .and(OrderRepository.OrderSpecification.amountLessThanOrEqualTo(filter.getMaxAmount()));
        Page<Order> orders = orderRepository.findAll(spec, pageable);
        Page<OrderResponse> orderResponses = orders.map(orderMapper::toOrderResponse);
        return ApiResponse.<Page<OrderResponse>>builder()
                .success(true)
                .data(orderResponses)
                .build();
    }

    public ApiResponse<OrderResponse> show(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        OrderResponse orderResponse = orderMapper.toOrderResponse(order);
        return ApiResponse.<OrderResponse>builder()
                .success(true)
                .data(orderResponse)
                .build();
    }

    public ApiResponse<List<OrderResponse>> getOrdersByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        List<Order> orders = orderRepository.findAllByUserIdOrderByOrderTimeDesc(userId);
        List<OrderResponse> orderResponses = orders.stream()
                .map(orderMapper::toOrderResponse)
                .toList();
        return ApiResponse.<List<OrderResponse>>builder()
                .success(true)
                .data(orderResponses)
                .build();
    }

    public ApiResponse<OrderDetailResponse> showDetail(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        // payment
        Payment payment = paymentRepository.findByOrder(order).orElseThrow(() -> new AppException(ErrorCode.PAYMENT_NOT_FOUND));
        PaymentDetailResponse paymentDetailResponse = paymentMapper.toPaymentDetailResponse(payment);
        // order item
        List<OrderItemDetailResponse> orderItemDetailResponseList = orderItemRepository.findAllDetailByOrder(order.getId());
        OrderDetailResponse orderDetailResponse = orderMapper.toOrderDetailResponse(order, paymentDetailResponse, orderItemDetailResponseList);
        return ApiResponse.<OrderDetailResponse>builder()
                .success(true)
                .data(orderDetailResponse)
                .build();
    }

    @Transactional
    public ApiResponse<OrderResponse> store(OrderCreationRequest request) {
        // kiểm tra user tồn tại
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        List<OrderItemCreationRequest> requestItems = request.getOrderItems();
        // kiểm tra kho còn đủ số lượng
        for(OrderItemCreationRequest item: requestItems) {
            if(inventoryRepository.reduceIfEnough(item.getVariationId(), item.getQuantity()) != 1) {
                throw new AppException(ErrorCode.PRODUCT_OUT_OF_STOCK);
            }
        }
        // khởi tạo order và order item
        Order order = orderMapper.toOrder(user, request);
        order.setOrderTime(LocalDateTime.now());
        order.setStatus("INVALID"); // đơn chưa cài đặt thanh toán sẽ có status là INVALID
        double totalAmount = requestItems.stream()
                        .mapToDouble(item -> item.getUnitPrice() * item.getQuantity())
                        .sum();
        order.setTotalAmount(totalAmount);
        List<OrderItem> orderItemList = new ArrayList<>();
        for(OrderItemCreationRequest item: requestItems) {
            ProductVariation productVariation = productVariationRepository.findById(item.getVariationId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIATION_NOT_FOUND));
            OrderItem orderItem = orderItemMapper.toOrderItem(order, productVariation, item);
            orderItemList.add(orderItem);
        }
        order.setOrderItemList(orderItemList);
        try {
            orderRepository.save(order);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INSERT_FAILED);
        }
        OrderResponse orderResponse = orderMapper.toOrderResponse(order);
        return ApiResponse.<OrderResponse>builder()
                .success(true)
                .data(orderResponse)
                .build();
    }

    @Transactional
    public ApiResponse<OrderResponse> updateStatus(Long id, String status) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        order.setStatus(status);
        try {
            orderRepository.save(order);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.UPDATE_FAILED);
        }
        OrderResponse orderResponse = orderMapper.toOrderResponse(order);
        return ApiResponse.<OrderResponse>builder()
                .success(true)
                .data(orderResponse)
                .build();
    }
}
