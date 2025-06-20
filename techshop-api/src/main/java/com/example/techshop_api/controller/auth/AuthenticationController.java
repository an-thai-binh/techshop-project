package com.example.techshop_api.controller.auth;

import com.example.techshop_api.dto.request.auth.UserLoginRequest;
import com.example.techshop_api.dto.request.auth.UserTokenRequest;
import com.example.techshop_api.dto.request.user.UserCreationRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.auth.AuthenticationResponse;
import com.example.techshop_api.dto.response.user.UserResponse;
import com.example.techshop_api.service.AuthenticationService;
import com.example.techshop_api.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;
    UserService userService;

    @PostMapping("/introspect")
    public ResponseEntity<ApiResponse<Void>> introspect(@Valid @RequestBody UserTokenRequest request) {
        ApiResponse<Void> apiResponse = authenticationService.introspect(request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> login(@Valid @RequestBody UserLoginRequest request) {
        ApiResponse<AuthenticationResponse> apiResponse = authenticationService.login(request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@Valid @RequestBody UserTokenRequest request) {
        ApiResponse<Void> apiResponse = authenticationService.logout(request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> refresh(@Valid @RequestBody UserTokenRequest request) {
        ApiResponse<AuthenticationResponse> apiResponse = authenticationService.refresh(request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(@RequestBody UserCreationRequest request) {
        ApiResponse<UserResponse> apiResponse = userService.store(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
    @PostMapping("/forgotPassword")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@RequestParam String email) {
        ApiResponse<String> apiResponse = userService.forgotPassword(email);
        return ResponseEntity.ok(apiResponse);
    }

//    @PostMapping("/refresh")
//    public ResponseEntity<ApiResponse<AuthenticationResponse>> refresh(@CookieValue("refreshToken") String refreshToken) {
//        UserTokenRequest request = new UserTokenRequest();
//        request.setToken(refreshToken);
//        ApiResponse<AuthenticationResponse> apiResponse = authenticationService.refresh(request);
//        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
//    }


}
