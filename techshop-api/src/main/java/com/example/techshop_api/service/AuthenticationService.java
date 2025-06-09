package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.auth.UserLoginRequest;
import com.example.techshop_api.dto.request.auth.UserTokenRequest;
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
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    RedisTemplate<String, String> redisTemplate;
    UserRepository userRepository;
    RevocatedTokenRepository revocatedTokenRepository;
    JwtUtil jwtUtil;

    private AuthenticationResponse createAuthenticationResponse(User user) {
        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);
        redisTemplate.opsForValue().set("REFRESH_TOKEN:" + user.getId(), refreshToken, 24, TimeUnit.HOURS);
        return AuthenticationResponse.builder()
                .token(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

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
        AuthenticationResponse authenticationResponse = createAuthenticationResponse(user);
        return ApiResponse.<AuthenticationResponse>builder()
                .success(true)
                .data(authenticationResponse)
                .build();
    }

    public ApiResponse<Void> logout(UserTokenRequest request) {
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
                // thu hồi refresh token của user
                redisTemplate.delete("REFRESH_TOKEN:" + signedJWT.getJWTClaimsSet().getSubject());
            } catch (Exception e) {
                log.error("Revoke token failed: {}", e.getMessage());
                throw new AppException(ErrorCode.INSERT_FAILED);
            }
        }
        return ApiResponse.<Void>builder()
                .success(true)
                .message("Successfully logged out")
                .build();
    }

    public ApiResponse<AuthenticationResponse> refresh(UserTokenRequest request) {
        try {
            String token = request.getToken();
            SignedJWT signedJWT = jwtUtil.verifyToken(token);
            if(signedJWT == null) {
                throw new AppException(ErrorCode.INVALID_TOKEN);
            }
            JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();
            if(!claimsSet.getClaim("type").equals("refresh")) {
                throw new AppException(ErrorCode.INVALID_TOKEN);
            }
            if(!redisTemplate.opsForValue().get("REFRESH_TOKEN:" + claimsSet.getSubject()).equals(token)) {
                throw new AppException(ErrorCode.INVALID_TOKEN);
            }
            User user = userRepository.findById(Long.parseLong(claimsSet.getSubject())).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
            AuthenticationResponse authenticationResponse = createAuthenticationResponse(user);
            return ApiResponse.<AuthenticationResponse>builder()
                    .success(true)
                    .data(authenticationResponse)
                    .build();
        } catch (ParseException | JOSEException e) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }
    }
}
