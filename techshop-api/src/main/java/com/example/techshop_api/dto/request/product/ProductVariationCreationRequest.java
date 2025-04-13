package com.example.techshop_api.dto.request.product;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariationCreationRequest {
    Long productId;
    String sku;
    int variationPriceChange;
    String variationImgUrl;
}
