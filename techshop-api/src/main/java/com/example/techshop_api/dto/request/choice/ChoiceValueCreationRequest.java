package com.example.techshop_api.dto.request.choice;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChoiceValueCreationRequest {
    @NotNull
    Long choiceId;
    @NotBlank
    String choiceValue;
    String skuValue;
}
