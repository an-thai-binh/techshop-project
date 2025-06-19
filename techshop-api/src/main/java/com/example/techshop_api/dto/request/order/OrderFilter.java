package com.example.techshop_api.dto.request.order;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderFilter {
    String orderId;
    String orderName;
    String status;
    LocalDateTime afterTime;
    LocalDateTime beforeTime;
    String minAmount;
    String maxAmount;
}
