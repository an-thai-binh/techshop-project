package com.example.techshop_api.dto.request.product;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariationWithValuesRequest {
    Long productId;
    double variationPriceChange;
    Long imageId;
    int quantity;
    String[] choiceValueIds;
}
