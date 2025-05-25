package com.example.techshop_api.dto.request.choice;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChoiceUpdateRequest {
    Long productId;
    String choiceName;
}