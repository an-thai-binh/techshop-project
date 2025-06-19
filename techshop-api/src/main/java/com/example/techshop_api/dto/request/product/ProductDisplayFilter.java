package com.example.techshop_api.dto.request.product;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDisplayFilter {
    @NotNull
    Long productId;
    @NotNull
    String productName;
    @NotNull
    double minBasePrice;
    @NotNull
    double maxBasePrice;
}
