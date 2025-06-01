package com.example.techshop_api.controller.cart;

import com.example.techshop_api.dto.request.cart.CartItemCreationRequest;
import com.example.techshop_api.dto.request.cart.CartItemUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.cart.CartItemResponse;
import com.example.techshop_api.service.CartItemService;
import com.example.techshop_api.utils.SecurityUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cartItem")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartItemController {

    CartItemService cartItemService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<CartItemResponse>>> index(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        ApiResponse<Page<CartItemResponse>> apiResponse = cartItemService.index(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CartItemResponse>> show(@PathVariable Long id) {
        ApiResponse<CartItemResponse> apiResponse = cartItemService.show(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<CartItemResponse>> store(
            @RequestParam Long userId,
            @RequestBody CartItemCreationRequest request
    ) {
        ApiResponse<CartItemResponse> apiResponse = cartItemService.store(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Void>> add(@RequestParam Long productVariationId) {
        Long userId = Long.parseLong(SecurityUtil.getCurrentUserId());
        ApiResponse<Void> apiResponse = cartItemService.add(userId, productVariationId);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @PostMapping("/addWithQuantity")
    public ResponseEntity<ApiResponse<Void>> addWithQuantity(@RequestBody CartItemCreationRequest request) {
        Long userId = Long.parseLong(SecurityUtil.getCurrentUserId());
        ApiResponse<Void> apiResponse = cartItemService.addWithQuantity(userId, request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @PostMapping("/subtract")
    public ResponseEntity<ApiResponse<Void>> remove(@RequestParam Long cartItemId) {
        Long userId = Long.parseLong(SecurityUtil.getCurrentUserId());
        ApiResponse<Void> apiResponse = cartItemService.subtract(userId, cartItemId);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @PostMapping("/delete")
    public ResponseEntity<ApiResponse<Void>> delete(@RequestParam Long cartItemId) {
        Long userId = Long.parseLong(SecurityUtil.getCurrentUserId());
        ApiResponse<Void> apiResponse = cartItemService.delete(userId, cartItemId);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @PostMapping("/deleteAll")
    public ResponseEntity<ApiResponse<Void>> deleteAll() {
        Long userId = Long.parseLong(SecurityUtil.getCurrentUserId());
        ApiResponse<Void> apiResponse = cartItemService.deleteAll(userId);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CartItemResponse>> update(
            @PathVariable Long id,
            @RequestBody CartItemUpdateRequest request
    ) {
        ApiResponse<CartItemResponse> apiResponse = cartItemService.update(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @PutMapping("/updateQuantity")
    public ResponseEntity<ApiResponse<Void>> updateQuantity(
            @RequestBody CartItemUpdateRequest request
    ) {
        Long userId = Long.parseLong(SecurityUtil.getCurrentUserId());
        ApiResponse<Void> apiResponse = cartItemService.updateQuantity(userId, request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> destroy(@PathVariable Long id) {
        ApiResponse<Void> apiResponse = cartItemService.destroy(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

}
