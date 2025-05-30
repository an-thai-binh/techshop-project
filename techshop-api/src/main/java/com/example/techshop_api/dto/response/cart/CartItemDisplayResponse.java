package com.example.techshop_api.dto.response.cart;

public interface CartItemDisplayResponse {
    Long getId();
    Long getProductVariationId();
    Long getProductId();
    String getProductName();
    Double getProductFinalPrice(); // basePrice + changePrice
    String getProductTotalPrice(); // basePrice * quantity
    String getProductDescription();
    Integer getQuantity();
    String getProductImgUrl();
}
