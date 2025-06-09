package com.example.techshop_api.dto.request.user;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateInfoRequest {
    String fullName;
    int birthYear;
    String gender;
}
