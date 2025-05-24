package com.example.techshop_api.controller.auth;

import com.example.techshop_api.dto.request.auth.UserLoginRequest;
import com.example.techshop_api.dto.request.user.UserCreationRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.auth.AuthenticationResponse;
import com.example.techshop_api.dto.response.user.UserResponse;
import com.example.techshop_api.service.AuthenticationService;
import com.example.techshop_api.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(@RequestBody UserCreationRequest request) {
        ApiResponse<UserResponse> apiResponse = userService.store(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
//    @PostMapping("/refresh-token")
//    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
//        String token = extractRefreshToken(request);
//
//
//    }

    private String extractRefreshToken(HttpServletRequest request) {
        if(request.getCookies() != null) return null;
        for(Cookie cookie : request.getCookies()) {
            if(cookie.getName().equals("refresh_token")) {
                return cookie.getValue();
            }
        }
        return null;
    }
}
