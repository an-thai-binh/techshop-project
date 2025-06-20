package com.example.techshop_api.dto.request.inventory;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InventoryCreationRequest {
    @NotNull
    Long variationId;
    @Min(value = 0, message = "Số lượng tồn kho phải lớn hơn hoặc bằng 0")
    int quantity;
}
