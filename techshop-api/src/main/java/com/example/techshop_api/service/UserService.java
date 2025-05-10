package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.user.UserCreationRequest;
import com.example.techshop_api.dto.request.user.UserUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.user.UserResponse;
import com.example.techshop_api.entity.user.User;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.UserMapper;
import com.example.techshop_api.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;

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
        if(userRepository.findByUsername(userCreationRequest.getUsername()) != null) {
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }
        if(userRepository.findByEmail(userCreationRequest.getEmail()) != null) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_BIND);
        }
        User user = userMapper.toUser(userCreationRequest);
        try {
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
