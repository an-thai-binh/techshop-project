package com.example.techshop_api.dto.response.product;

import com.example.techshop_api.entity.product.Product;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariationResponse {
    Long id;
    ProductResponse product;
    String sku;
    int variationPriceChange;
}
