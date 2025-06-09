package com.example.techshop_api.enums;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION("Uncategorized Exception", HttpStatus.INTERNAL_SERVER_ERROR),
    CHOICE_NOT_FOUND("Choice Not Found", HttpStatus.NOT_FOUND),
    CHOICE_VALUE_NOT_FOUND("Choice Value Not Found", HttpStatus.NOT_FOUND),
    CATEGORY_NOT_FOUND("Category Not Found", HttpStatus.NOT_FOUND),
    PRODUCT_NOT_FOUND("Product Not Found", HttpStatus.NOT_FOUND),
    PRODUCT_VARIATION_NOT_FOUND("Product Variation Not Found", HttpStatus.NOT_FOUND),
    INVENTORY_NOT_FOUND("Inventory Not Found", HttpStatus.NOT_FOUND),
    IMAGE_NOT_FOUND("Image Not Found", HttpStatus.NOT_FOUND),
    PRODUCT_IMAGE_NOT_FOUND("Product Image Not Found", HttpStatus.NOT_FOUND),
    USER_NOT_FOUND("User Not Found", HttpStatus.NOT_FOUND),
    ROLE_NOT_FOUND("Role Not Found", HttpStatus.NOT_FOUND),
    CART_NOT_FOUND("Cart Not Found", HttpStatus.NOT_FOUND),
    CART_ITEM_NOT_FOUND("Cart Item Not Found", HttpStatus.NOT_FOUND),
    ORDER_NOT_FOUND("Order Not Found", HttpStatus.NOT_FOUND),
    OTP_ACTION_NOT_FOUND("OTP Action Not Found", HttpStatus.NOT_FOUND),
    INSERT_FAILED("Insert Failed", HttpStatus.INTERNAL_SERVER_ERROR),
    UPDATE_FAILED("Update Failed", HttpStatus.INTERNAL_SERVER_ERROR),
    DELETE_FAILED("Delete Failed", HttpStatus.INTERNAL_SERVER_ERROR),
    PRODUCT_VARIATION_ALREADY_EXISTS("Product Variation with those choice values already exists", HttpStatus.BAD_REQUEST),
    USER_ALREADY_EXISTS("User Already Exists", HttpStatus.BAD_REQUEST),
    EMAIL_ALREADY_EXISTS("Email Already Exists", HttpStatus.BAD_REQUEST),
    EMAIL_ALREADY_BIND("Email Already Bind", HttpStatus.BAD_REQUEST),
    WRONG_PASSWORD("Wrong Password", HttpStatus.BAD_REQUEST),
    USER_NOT_VERIFIED("User Not Verified", HttpStatus.FORBIDDEN),
    INVALID_TOKEN("Invalid Token", HttpStatus.BAD_REQUEST),
    INVALID_OTP("Invalid OTP", HttpStatus.BAD_REQUEST),
    CREATE_TOKEN_FAILED("Create Token Failed", HttpStatus.INTERNAL_SERVER_ERROR),
    VERIFY_TOKEN_FAILED("Verify Token Failed", HttpStatus.INTERNAL_SERVER_ERROR),
    REQUEST_EXTERNAL_FAILED("Request To External Resource Failed", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHORIZED("Unauthorized", HttpStatus.UNAUTHORIZED),
    ;

    private String message;
    private HttpStatusCode statusCode;

    ErrorCode(String message, HttpStatusCode statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
