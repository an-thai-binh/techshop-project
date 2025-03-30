package com.example.techshop_api.exception;

import com.example.techshop_api.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    /**
     * Xử lý exception tổng quan (không biết rõ lỗi)
     * @param exception Exception instance
     * @return ResponseEntity status code 503
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleException(Exception exception) {
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .success(false)
                .message(exception.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(apiResponse);
    }

    /**
     * Xử lý app exception (các lỗi đã biết khi xử lý logic)
     * @param appException AppException instance
     * @return ResponseEntity status code 400
     */
    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<Object>> handleAppException(AppException appException) {
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .success(false)
                .message(appException.getErrorCode().getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
    }
}
