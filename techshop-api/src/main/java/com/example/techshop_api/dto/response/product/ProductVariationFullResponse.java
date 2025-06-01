package com.example.techshop_api.dto.response.product;

import com.example.techshop_api.dto.response.image.ImageResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductVariationFullResponse {
    Long id;
    ProductResponse product;
    String sku;
    int variationPriceChange;
    ImageResponse image;
    int quantity;
}
