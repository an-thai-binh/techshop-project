package com.example.techshop_api.dto.response.product;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariationSimpleResponse {
    Long id;
    String sku;
    int variationPriceChange;
    Long imageId;
}
