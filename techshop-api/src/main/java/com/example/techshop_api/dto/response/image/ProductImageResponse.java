package com.example.techshop_api.dto.response.image;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductImageResponse {
    Long id;
    Long productId;
    ImageResponse image;
    boolean isFirst;
}