package com.example.techshop_api.controller.user;

import com.example.techshop_api.dto.response.ApiResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserSecurityController {
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
