package com.example.techshop_api.exception;

import com.example.techshop_api.dto.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    /**
     * Xử lý exception tổng quan (không biết rõ lỗi)
     * @param exception Exception instance
     * @return ResponseEntity status code 503
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleException(Exception exception) {
        log.error("Unhandled Exception:", exception);
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .success(false)
                .message(exception.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(apiResponse);
    }

    /**
     * Xử lý app exception (các lỗi đã biết khi xử lý logic thông thường)
     * @param appException AppException instance
     * @return ResponseEntity
     */
    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<Object>> handleAppException(AppException appException) {
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .success(false)
                .message(appException.getErrorCode().getMessage())
                .build();
        return ResponseEntity.status(appException.getErrorCode().getStatusCode()).body(apiResponse);
    }

    /**
     * Xử lý file exception (các lỗi đã biết khi xử lý logic liên quan tới file)
     * @param fileException
     * @return ResponseEntity status code 400
     */
    @ExceptionHandler(FileException.class)
    public ResponseEntity<ApiResponse<Object>> handleFileException(FileException fileException) {
        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .success(false)
                .message(fileException.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
    }

    /**
     * Xử lý các lỗi khi xác thực dữ liệu từ request
     * @param exception
     * @return ResponseEntity status code 400
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
            errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        ApiResponse<Map<String, String>> apiResponse = ApiResponse.<Map<String, String>>builder()
                .success(false)
                .data(errors)
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
    }
}
