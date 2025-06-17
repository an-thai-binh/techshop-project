package com.example.techshop_api.dto.response.payment;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentDetailResponse {
    Long id;
    double amount;
    String paymentMethod;
    String paymentStatus;
    String paymentGateway;
}