package com.example.techshop_api.dto.request.product;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariationCreationRequest {
    @NotNull
    Long productId;
    String sku;
    @NotNull
    int variationPriceChange;
    Long imageId;
}
