package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.auth.UserLoginRequest;
import com.example.techshop_api.dto.request.auth.UserLogoutRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.auth.AuthenticationResponse;
import com.example.techshop_api.entity.user.RevocatedToken;
import com.example.techshop_api.entity.user.User;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.repository.RevocatedTokenRepository;
import com.example.techshop_api.repository.UserRepository;
import com.example.techshop_api.utils.JwtUtil;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;
    RevocatedTokenRepository revocatedTokenRepository;
    JwtUtil jwtUtil;

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
        String token = jwtUtil.generateAccessToken(user);
        AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
                .token(token)
                .build();
        return ApiResponse.<AuthenticationResponse>builder()
                .success(true)
                .data(authenticationResponse)
                .build();
    }

    public ApiResponse<Void> logout(UserLogoutRequest request) {
        SignedJWT signedJWT = null;
        try {
            signedJWT = jwtUtil.verifyToken(request.getToken());
        } catch (ParseException | JOSEException e) {
            log.error("JWT verification failed: {}", e.getMessage());
        }
        // nếu token user truyền lên là hợp lệ thì đưa vào CSDL (thu hồi)
        if(signedJWT != null) {
            try {
                RevocatedToken revocatedToken = RevocatedToken.builder()
                        .id(signedJWT.getJWTClaimsSet().getJWTID())
                        .expiryTime(signedJWT.getJWTClaimsSet().getExpirationTime())
                        .build();
                revocatedTokenRepository.save(revocatedToken);
            } catch (Exception e) {
                log.error("Insert revocated token failed: {}", e.getMessage());
                throw new AppException(ErrorCode.INSERT_FAILED);
            }
        }
        return ApiResponse.<Void>builder()
                .success(true)
                .message("Successfully logged out")
                .build();
    }
}
