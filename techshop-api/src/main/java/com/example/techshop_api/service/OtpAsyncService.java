package com.example.techshop_api.service;

import com.example.techshop_api.entity.user.User;
import com.example.techshop_api.enums.OtpAction;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OtpAsyncService {
    JavaMailSender mailSender;

    @Async
    public void preAction(OtpAction otpAction, User user, String otp) {
        String subject = "";
        String content = "";
        switch (otpAction) {
            case VERIFY_ACCOUNT -> {
                subject = "Xác minh tài khoản";
                content = "Mã OTP của bạn để xác minh tài khoản là: " + otp;
            }
            case CHANGE_EMAIL -> {
                subject = "Thay đổi email";
                content = "Mã OTP để thay đổi email là: " + otp;
            }
            case CHANGE_PASSWORD -> {
                subject = "Thay đổi mật khẩu";
                content = "Mã OTP để thay đổi mật khẩu là: " + otp;
            }
        }
        if(!subject.isEmpty() && user.getEmail() != null){
            sendOtpEmail(user.getEmail(), subject, content);
        }
    }
    private void sendOtpEmail(String to, String subject, String content){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }
}
