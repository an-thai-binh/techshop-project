package com.example.techshop_api.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentService {
    @Value("${stripe.secret-key}")
    String stripeSecretKey;

//    public ApiResponse<StripeCheckoutResponse> checkout(Long orderId) {
//
//    }
}
