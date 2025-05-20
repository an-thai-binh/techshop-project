package com.example.techshop_api.dto.response.product;

public interface ProductDisplayResponse {
    Long getId();
    Long getCategoryId();
    String getCategoryName();
    String getProductName();
    String getProductDescription();
    double getProductBasePrice();
    String getProductImgUrl();
}
