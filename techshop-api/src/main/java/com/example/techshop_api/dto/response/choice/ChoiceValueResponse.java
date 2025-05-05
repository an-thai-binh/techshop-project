package com.example.techshop_api.dto.response.choice;

import com.example.techshop_api.entity.product.ProductVariation;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChoiceValueResponse {
    long id;
    long choiceId;
    String choiceValue;
    List<ProductVariation> variationList;
}
