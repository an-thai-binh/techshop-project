package com.example.techshop_api.dto.response.user;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    Long id;
    String username;
    String password;
    String email;
    String phoneNumber;
    String fullName;
    int birthYear;
    String gender;
}