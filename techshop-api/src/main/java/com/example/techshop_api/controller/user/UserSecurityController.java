package com.example.techshop_api.controller.user;

import com.example.techshop_api.dto.request.user.UserUpdateInfoRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.user.UserResponse;
import com.example.techshop_api.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserSecurityController {
    private final UserService userService;

    @PutMapping("/updateInfo/{id}")
    @PreAuthorize("(hasRole('ADMIN') or #id.toString() == authentication.name) and hasAuthority('user:update')")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(@PathVariable Long id, @RequestBody UserUpdateInfoRequest request) {
        return ResponseEntity.ok(userService.updateUserInfo(id, request));
    }
    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<Void>> verifyAccount(@RequestParam Long userId, @RequestParam String otp) {
        ApiResponse<Void> apiResponse = userService.verifyAccount(otp, userId);
        return ResponseEntity.ok(apiResponse);
    }

    @PatchMapping("/{id}/changePassword")
    @PreAuthorize("(hasRole('ADMIN') or #id.toString() == authentication.name) and hasAuthority('user:update')")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @PathVariable Long id,
            @RequestParam String newPassword,
            @RequestParam String otp
    ) {
        return ResponseEntity.ok(userService.changePassword(id, newPassword, otp));
    }

    @PatchMapping("/{id}/forgotPassword")
    @PreAuthorize("(hasRole('ADMIN') or #id.toString() == authentication.name) and hasAuthority('user:update')")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(
            @PathVariable Long id,
            @RequestParam String newPassword,
            @RequestParam String otp
    ) {
        return ResponseEntity.ok(userService.changePassword(id, newPassword, otp));
    }

    @PatchMapping("/{id}/changeEmail")
    @PreAuthorize("(hasRole('ADMIN') or #id.toString() == authentication.name) and hasAuthority('user:update')")
    public ResponseEntity<ApiResponse<UserResponse>> changeEmail(
            @PathVariable Long id,
            @RequestParam String newEmail,
            @RequestParam String otp
    ) {
        return ResponseEntity.ok(userService.changeEmail(id, newEmail, otp));
    }



//    @PatchMapping("/{id}/changePassword")
//    public ResponseEntity<ApiResponse<Void>> changePassword(@PathVariable Long id, @RequestParam(name = "newPassword") String newPassword, @RequestParam String otp) {
//        // service
//        // return
//    }
//
//    @PatchMapping("/{id}/changeEmail")
//    public ResponseEntity<ApiResponse<Void>> changeEmail(@PathVariable Long id, @RequestParam(name = "newEmail") String newEmail, @RequestParam String otp) {
//        // service
//        // return
//    }
}
