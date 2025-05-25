package com.example.techshop_api.dto.response.product;

import com.example.techshop_api.dto.response.category.CategoryResponse;
import com.example.techshop_api.dto.response.image.ProductImageResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetailResponse {
    Long id;
    CategoryResponse category;
    String productName;
    String productDescription;
    double productBasePrice;
    List<ProductVariationDetailResponse> productVariationList;
    List<ProductImageResponse> productImageList;
}
