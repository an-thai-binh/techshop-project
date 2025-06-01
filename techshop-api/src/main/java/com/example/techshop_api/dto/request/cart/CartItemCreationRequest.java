package com.example.techshop_api.dto.request.cart;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)

public class CartItemCreationRequest {
    Long productVariationId;
    int quantity;
}
