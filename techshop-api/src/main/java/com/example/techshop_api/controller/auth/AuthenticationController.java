package com.example.techshop_api.controller.auth;

import com.example.techshop_api.dto.request.auth.UserLoginRequest;
import com.example.techshop_api.dto.request.auth.UserLogoutRequest;
import com.example.techshop_api.dto.request.user.UserCreationRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.auth.AuthenticationResponse;
import com.example.techshop_api.dto.response.user.UserResponse;
import com.example.techshop_api.service.AuthenticationService;
import com.example.techshop_api.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> login(@RequestBody UserLoginRequest request) {
        ApiResponse<AuthenticationResponse> apiResponse = authenticationService.login(request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@RequestBody UserLogoutRequest request) {
        ApiResponse<Void> apiResponse = authenticationService.logout(request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(@RequestBody UserCreationRequest request) {
        ApiResponse<UserResponse> apiResponse = userService.store(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
}
