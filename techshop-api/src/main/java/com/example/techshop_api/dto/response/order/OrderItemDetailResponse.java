package com.example.techshop_api.dto.response.order;

public interface OrderItemDetailResponse {
    Long getId();
    String getProductName();
    String getSku();
    String getImgUrl();
    double getUnitPrice();
    int getQuantity();
}
