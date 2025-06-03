package com.example.techshop_api.controller.otp;

import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.service.OtpService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/otp")
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OtpController {
    OtpService otpService;

    @PostMapping("/generate")
    public ResponseEntity<ApiResponse<Void>> generate(@RequestParam String action, @RequestParam Long userId) {
        ApiResponse<Void> apiResponse = otpService.generate(action, userId);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping("/validate")
    public ResponseEntity<ApiResponse<Void>> validate(@RequestParam String key, @RequestParam String otp) {
        ApiResponse<Void> apiResponse = otpService.validate(key, otp);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
