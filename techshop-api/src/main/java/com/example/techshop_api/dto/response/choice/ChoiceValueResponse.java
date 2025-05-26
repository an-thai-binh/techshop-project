package com.example.techshop_api.dto.response.choice;

import lombok.*;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChoiceValueResponse {
    Long id;
    Long choiceId;
    String choiceValue;
    String skuValue;
}
