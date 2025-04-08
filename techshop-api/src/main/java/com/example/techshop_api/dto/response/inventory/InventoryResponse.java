package com.example.techshop_api.dto.response.inventory;

import com.example.techshop_api.entity.product.ProductVariation;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InventoryResponse {
    Long id;
    ProductVariation productVariation;
    int quantity;
}
