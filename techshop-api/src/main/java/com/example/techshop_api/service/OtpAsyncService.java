package com.example.techshop_api.service;

import com.example.techshop_api.entity.user.User;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.enums.OtpAction;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OtpAsyncService {

    @Async
    public void preAction(OtpAction otpAction, User user, String otp) {
        switch (otpAction) {
            case VERIFY_ACCOUNT: {
                break;
            }
            case CHANGE_EMAIL: {
                break;
            }
            case CHANGE_PASSWORD: {
                break;
            }
        }
    }
}
