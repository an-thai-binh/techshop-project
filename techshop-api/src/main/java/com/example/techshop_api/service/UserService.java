package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.user.UserCreationRequest;
import com.example.techshop_api.dto.request.user.UserUpdateInfoRequest;
import com.example.techshop_api.dto.request.user.UserUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.user.UserResponse;
import com.example.techshop_api.entity.user.Role;
import com.example.techshop_api.entity.user.User;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.enums.OtpAction;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.UserMapper;
import com.example.techshop_api.repository.RoleRepository;
import com.example.techshop_api.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    RoleRepository roleRepository;
    UserMapper userMapper;
    private final OtpService otpService;

    public ApiResponse<Page<UserResponse>> index(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        Page<UserResponse> userResponses = users.map(userMapper::toUserResponse);
        return ApiResponse.<Page<UserResponse>>builder()
                .success(true)
                .data(userResponses)
                .build();
    }

    public ApiResponse<UserResponse> show(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        UserResponse userResponse = userMapper.toUserResponse(user);
        return ApiResponse.<UserResponse>builder()
                .success(true)
                .data(userResponse)
                .build();
    }

    @Transactional
    public ApiResponse<UserResponse> store(UserCreationRequest userCreationRequest) {
        if (userRepository.findByUsername(userCreationRequest.getUsername()) != null) {
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }
        if (userRepository.findByEmail(userCreationRequest.getEmail()) != null) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_BIND);
        }
        User user = userMapper.toUser(userCreationRequest);
        user.setVerified(false);
        Role role = roleRepository.findByRoleName("ROLE_USER").orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        user.setRoleList(List.of(role));
        try {
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
            user.setPassword(passwordEncoder.encode(user.getPassword())); // hash password
            user = userRepository.save(user);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INSERT_FAILED);
        }
        UserResponse userResponse = userMapper.toUserResponse(user);
        return ApiResponse.<UserResponse>builder()
                .success(true)
                .data(userResponse)
                .build();
    }

    @Transactional
    public ApiResponse<UserResponse> update(Long id, UserUpdateRequest userUpdateRequest) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        userMapper.updateUser(user, userUpdateRequest);
        try {
            user = userRepository.save(user);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.UPDATE_FAILED);
        }
        UserResponse userResponse = userMapper.toUserResponse(user);
        return ApiResponse.<UserResponse>builder()
                .success(true)
                .data(userResponse)
                .build();
    }

    @Transactional
    public ApiResponse<Void> verifyAccount(String otp, Long userId) {
        if (!otpService.validate(OtpAction.VERIFY_ACCOUNT, userId, otp)) {
            throw new AppException(ErrorCode.INVALID_OTP);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        user.setVerified(true);
        userRepository.save(user);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Tài khoản đã được xác minh.")
                .build();
    }

    @Transactional
    public ApiResponse<UserResponse> updateUserInfo(Long id, UserUpdateInfoRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        user.setFullName(request.getFullName());
        user.setBirthYear(request.getBirthYear());
        user.setGender(request.getGender());

        userRepository.save(user);

        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .fullName(user.getFullName())
                .birthYear(user.getBirthYear())
                .gender(user.getGender())
                .build();

        return ApiResponse.<UserResponse>builder()
                .success(true)
                .message("Cập nhật thông tin thành công.")
                .data(userResponse)
                .build();
    }

    @Transactional
    public ApiResponse<Void> changePassword(Long userId, String newPassword, String otp) {
        if (!otpService.validate(OtpAction.CHANGE_PASSWORD, userId, otp)) {
            throw new AppException(ErrorCode.INVALID_OTP);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        PasswordEncoder encoder = new BCryptPasswordEncoder(10);
        user.setPassword(encoder.encode(newPassword));
        userRepository.save(user);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Đổi mật khẩu thành công.")
                .build();
    }

    @Transactional
    public ApiResponse<UserResponse> changeEmail(Long userId, String newEmail, String otp) {
        if (!otpService.validate(OtpAction.CHANGE_EMAIL, userId, otp)) {
            throw new AppException(ErrorCode.INVALID_OTP);
        }

        User existingUser = userRepository.findByEmail(newEmail);
        if (existingUser != null && !existingUser.getId().equals(userId)) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        user.setEmail(newEmail);
        userRepository.save(user);

        UserResponse response = UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .fullName(user.getFullName())
                .birthYear(user.getBirthYear())
                .gender(user.getGender())
                .password(null)
                .build();

        return ApiResponse.<UserResponse>builder()
                .success(true)
                .message("Cập nhật email thành công.")
                .data(response)
                .build();
    }

    public ApiResponse<Void> destroy(Long id) {
        try {
            userRepository.deleteById(id);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.DELETE_FAILED);
        }
        return ApiResponse.<Void>builder()
                .success(true)
                .message("Delete Successful")
                .build();
    }
}
