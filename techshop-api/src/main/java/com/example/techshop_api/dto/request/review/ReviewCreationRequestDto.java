package com.example.techshop_api.dto.request.review;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewCreationRequestDto {
    Long orderItemId;
    String content;
    int rating;
}
