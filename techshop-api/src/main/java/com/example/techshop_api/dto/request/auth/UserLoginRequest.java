package com.example.techshop_api.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserLoginRequest {
    @NotBlank(message = "Email/Username không được để trống")
    String identifier; // username hoặc email
    @NotNull(message = "Mật khẩu không được để trống")
    @Size(min = 1, message = "Mật khẩu không được để trống")
    String password;
}