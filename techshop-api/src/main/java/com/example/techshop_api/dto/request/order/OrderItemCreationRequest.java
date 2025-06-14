package com.example.techshop_api.dto.request.order;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItemCreationRequest {
    Long variationId;
    double unitPrice;
    int quantity;
}
