package com.example.techshop_api.dto.response.choice;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChoiceWithValuesResponse {
    Long id;
    Long productId;
    String choiceValue;
    List<ChoiceValueResponse> choiceValueList;
}
