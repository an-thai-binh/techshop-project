package com.example.techshop_api.controller.order;

import com.example.techshop_api.dto.request.order.OrderCreationRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.order.OrderDetailResponse;
import com.example.techshop_api.dto.response.order.OrderResponse;
import com.example.techshop_api.service.OrderService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
    OrderService orderService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') and hasAuthority('order:view')")
    public ResponseEntity<ApiResponse<Page<OrderResponse>>> index(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        ApiResponse<Page<OrderResponse>> apiResponse = orderService.index(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("(hasRole('ADMIN') or #userId.toString() == authentication.name) and hasAuthority('order:view')")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getOrdersByUserId(@PathVariable Long userId) {
        ApiResponse<List<OrderResponse>> apiResponse = orderService.getOrdersByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/detail/{id}")
    @PreAuthorize("hasAuthority('order:view')")
    @PostAuthorize("(hasRole('ADMIN') or returnObject.body.data.userId.toString() == authentication.name)")
    public ResponseEntity<ApiResponse<OrderDetailResponse>> showDetail(@PathVariable Long id) {
        ApiResponse<OrderDetailResponse> apiResponse = orderService.showDetail(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> store(@Valid @RequestBody OrderCreationRequest request) {
        ApiResponse<OrderResponse> apiResponse = orderService.store(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> updateStatus(@PathVariable Long id, @RequestParam String status) {
        ApiResponse<OrderResponse> apiResponse = orderService.updateStatus(id, status);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}