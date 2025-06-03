package com.example.techshop_api.enums;

import lombok.Getter;

import java.time.Duration;

@Getter
public enum OtpAction {
    VERIFY_ACCOUNT(Duration.ofMinutes(10)),
    CHANGE_PASSWORD(Duration.ofMinutes(5)),
    CHANGE_EMAIL(Duration.ofMinutes(5)),
    ;
    private Duration duration;
    OtpAction(Duration duration) {
        this.duration = duration;
    }
}
