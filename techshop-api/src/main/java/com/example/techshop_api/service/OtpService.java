package com.example.techshop_api.service;

import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.entity.user.User;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.enums.OtpAction;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OtpService {
    RedisTemplate<String, String> redisTemplate;
    UserRepository userRepository;
    OtpAsyncService otpAsyncService;

    public ApiResponse<Void> generate(String action, Long userId) {
        OtpAction otpAction;
        try {
            otpAction = OtpAction.valueOf(action);
        } catch(IllegalArgumentException e) {
            throw new AppException(ErrorCode.OTP_ACTION_NOT_FOUND);
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        String key = otpAction.name() + ":" + user.getId();
        otpAsyncService.preAction(otpAction, otp);
        redisTemplate.opsForValue().set(key, otp, otpAction.getDuration());
        return ApiResponse.<Void>builder()
                .success(true)
                .message("Khởi tạo OTP thành công")
                .build();
    }

    public ApiResponse<Void> validate(String key, String otp) {
        String storedOtp = redisTemplate.opsForValue().get(key);
        if (storedOtp == null) {
            return ApiResponse.<Void>builder()
                    .success(false)
                    .message("OTP không tồn tại hoặc đã hết hạn")
                    .build();
        }
        if (!storedOtp.equals(otp)) {
            return ApiResponse.<Void>builder()
                    .success(false)
                    .message("OTP không hợp lệ")
                    .build();
        }
        return ApiResponse.<Void>builder()
                .success(true)
                .message("OTP hợp lệ")
                .build();
    }
}
