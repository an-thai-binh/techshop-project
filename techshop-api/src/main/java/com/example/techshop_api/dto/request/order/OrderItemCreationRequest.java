package com.example.techshop_api.dto.request.order;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItemCreationRequest {
    @NotNull
    Long variationId;
    @Min(value = 0, message = "Giá sản phẩm phải lớn hơn hoặc bằng 0")
    double unitPrice;
    @Min(value = 1, message = "Số lượng sản phẩm phải lớn hơn hoặc bằng 1")
    int quantity;
}
