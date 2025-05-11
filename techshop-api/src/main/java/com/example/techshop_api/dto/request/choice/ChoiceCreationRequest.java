package com.example.techshop_api.dto.request.choice;

import lombok.*;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChoiceCreationRequest {
    String choiceName;
}
