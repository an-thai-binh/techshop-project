package com.example.techshop_api.service;

import com.example.techshop_api.enums.OtpAction;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class OtpAsyncService {
    @Async
    public void preAction(OtpAction otpAction, String otp) {
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
