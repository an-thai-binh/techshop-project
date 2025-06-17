package com.example.techshop_api.dto.response.review;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewResponseDto {
    Long reviewId;
    String userFullName;
    String content;
    int rating;
    String reviewTime;
    String productName;
    String sku;
}
