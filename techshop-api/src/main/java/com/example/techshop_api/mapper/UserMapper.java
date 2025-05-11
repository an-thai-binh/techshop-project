package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.user.UserCreationRequest;
import com.example.techshop_api.dto.request.user.UserUpdateRequest;
import com.example.techshop_api.dto.response.user.UserResponse;
import com.example.techshop_api.entity.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toUserResponse(User user);
    User toUser(UserCreationRequest request);
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
