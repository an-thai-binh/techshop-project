package com.example.techshop_api.controller.payment;

import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.payment.StripeCheckoutResponse;
import com.example.techshop_api.service.PaymentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentController {
    PaymentService paymentService;

    @PostMapping("/checkout/cod")
    public ResponseEntity<ApiResponse<Void>> checkoutCod(Long orderId) {
        ApiResponse<Void> apiResponse = paymentService.checkoutCod(orderId);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping("/checkout/transfer")
    public ResponseEntity<ApiResponse<StripeCheckoutResponse>> checkoutTransfer(Long orderId) {
        ApiResponse<StripeCheckoutResponse> apiResponse = paymentService.checkoutTransfer(orderId);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping("/stripe/webhook")
    public ResponseEntity<ApiResponse<Void>> handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String signature) {
        ApiResponse<Void> apiResponse = paymentService.handleStripeWebhook(payload, signature);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}