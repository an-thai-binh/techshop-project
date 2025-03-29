package com.example.techshop_api.enums;

public enum ErrorMessage {
    UNCATEGORIZED_EXCEPTION("Uncategorized Exception"),
    ;

    private String message;
    ErrorMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
