package com.example.techshop_api.controller.user;

import com.example.techshop_api.dto.request.user.UserCreationRequest;
import com.example.techshop_api.dto.request.user.UserUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.user.UserResponse;
import com.example.techshop_api.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') and hasAuthority('user:view')")
    public ResponseEntity<ApiResponse<Page<UserResponse>>> index(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        ApiResponse<Page<UserResponse>> apiResponse = userService.index(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/{id}")
    @PreAuthorize("(hasRole('ADMIN') or #id.toString() == authentication.name) and hasAuthority('user:view')")
    public ResponseEntity<ApiResponse<UserResponse>> show(@PathVariable Long id) {
        ApiResponse<UserResponse> apiResponse = userService.show(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('user:create')")
    public ResponseEntity<ApiResponse<UserResponse>> store(@RequestBody UserCreationRequest request) {
        ApiResponse<UserResponse> apiResponse = userService.store(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping("/{id}")
    @PreAuthorize("(hasRole('ADMIN') or #id.toString() == authentication.name) and hasAuthority('user:update')")
    public ResponseEntity<ApiResponse<UserResponse>> update(@PathVariable Long id, @RequestBody UserUpdateRequest request) {
        ApiResponse<UserResponse> apiResponse = userService.update(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('user:delete')")
    public ResponseEntity<ApiResponse<Void>> destroy(@PathVariable Long id) {
        ApiResponse<Void> apiResponse = userService.destroy(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}