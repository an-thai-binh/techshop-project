package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.auth.UserLoginRequest;
import com.example.techshop_api.dto.request.user.UserCreationRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.auth.AuthenticationResponse;
import com.example.techshop_api.entity.user.User;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.repository.UserRepository;
import com.example.techshop_api.utils.JwtGenerator;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;
    JwtGenerator jwtGenerator;

    public ApiResponse<AuthenticationResponse> login(UserLoginRequest request) {
        User user = userRepository.findByUsernameOrEmail(request.getIdentifier(), request.getIdentifier());
        if (user == null) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        if (!user.isVerified()) {
            throw new AppException(ErrorCode.USER_NOT_VERIFIED);
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.WRONG_PASSWORD);
        }
        String token = jwtGenerator.generateAccessToken(user);
        AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
                .token(token)
                .build();
        return ApiResponse.<AuthenticationResponse>builder()
                .success(true)
                .data(authenticationResponse)
                .build();
    }

}
