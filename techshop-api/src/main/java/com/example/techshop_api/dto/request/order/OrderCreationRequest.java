package com.example.techshop_api.dto.request.order;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderCreationRequest {
    Long userId;
    String orderName;
    String orderAddress;
    String orderEmail;
    String orderPhoneNumber;
    List<OrderItemCreationRequest> orderItems;
}
