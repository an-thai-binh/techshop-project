package com.example.techshop_api.dto.response.auth;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    String token;
    String refreshToken;
    Boolean isVerified;
    Long userId;
}