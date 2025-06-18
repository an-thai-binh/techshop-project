package com.example.techshop_api.dto.response.order;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    Long id;
    Long userId;
    String orderName;
    String orderAddress;
    String orderEmail;
    String orderPhoneNumber;
    LocalDateTime orderTime;
    String status;
    double totalAmount;
}
