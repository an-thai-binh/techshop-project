package com.example.techshop_api.enums;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION("Uncategorized Exception", HttpStatus.INTERNAL_SERVER_ERROR),
    CATEGORY_NOT_FOUND("Category Not Found", HttpStatus.NOT_FOUND),
    PRODUCT_NOT_FOUND("Product Not Found", HttpStatus.NOT_FOUND),
    PRODUCT_VARIATION_NOT_FOUND("Product Variation Not Found", HttpStatus.NOT_FOUND),
    INVENTORY_NOT_FOUND("Inventory Not Found", HttpStatus.NOT_FOUND),
    INSERT_FAILED("Insert Failed", HttpStatus.INTERNAL_SERVER_ERROR),
    UPDATE_FAILED("Update Failed", HttpStatus.INTERNAL_SERVER_ERROR),
    DELETE_FAILED("Delete Failed", HttpStatus.INTERNAL_SERVER_ERROR),
    ;

    private String message;
    private HttpStatusCode statusCode;
    ErrorCode(String message, HttpStatusCode statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
