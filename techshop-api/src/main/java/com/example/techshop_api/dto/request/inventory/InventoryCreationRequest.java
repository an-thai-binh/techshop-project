package com.example.techshop_api.dto.request.inventory;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InventoryCreationRequest {
    Long variationId;
    int quantity;
}
