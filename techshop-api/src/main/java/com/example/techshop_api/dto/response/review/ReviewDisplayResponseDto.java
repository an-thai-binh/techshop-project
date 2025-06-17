package com.example.techshop_api.dto.response.review;

public interface ReviewDisplayResponseDto {
    String getUserFullName();
    int getRating();
    String getContent();
    String getProductName();
    String getSku();
    String getReviewTime();
}
