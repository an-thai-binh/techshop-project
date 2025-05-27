package com.example.techshop_api.dto.response.choice;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChoiceResponse {
    Long id;
    Long productId;
    String choiceName;
}
