package com.example.techshop_api.dto.request.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductUpdateRequest {
    @NotNull
    Long categoryId;
    @NotBlank
    String productName;
    String productDescription;
    @Min(value = 0, message = "Giá sản phẩm phải lớn hơn hoặc bằng 0")
    double productBasePrice;
}