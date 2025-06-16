package com.example.techshop_api.dto.response.order;

import com.example.techshop_api.dto.response.payment.PaymentDetailResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetailResponse {
    Long id;
    String userId;
    String orderName;
    String orderAddress;
    String orderEmail;
    String orderPhoneNumber;
    LocalDateTime orderTime;
    String status;
    double totalAmount;
    List<OrderItemDetailResponse> orderItemList;
    PaymentDetailResponse payment;
}
