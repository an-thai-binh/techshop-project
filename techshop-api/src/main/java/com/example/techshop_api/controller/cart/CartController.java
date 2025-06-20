package com.example.techshop_api.controller.cart;

import com.example.techshop_api.dto.request.cart.CartCreationRequest;
import com.example.techshop_api.dto.request.cart.CartUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.cart.CartResponse;
import com.example.techshop_api.service.CartService;
import com.example.techshop_api.utils.SecurityUtil;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
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
@RequestMapping("/cart")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor()
public class CartController {
    CartService cartService;


    @GetMapping
    public ResponseEntity<ApiResponse<Page<CartResponse>>> index(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        ApiResponse<Page<CartResponse>> apiResponse = cartService.index(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/show")
    public ResponseEntity<ApiResponse<CartResponse>> show() {
        Long userId = Long.parseLong(SecurityUtil.getCurrentUserId());
        ApiResponse<CartResponse> apiResponse = cartService.show(userId);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CartResponse>> store(@Valid @RequestBody CartCreationRequest request) {
        ApiResponse<CartResponse> apiResponse = cartService.store(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CartResponse>> update(
            @PathVariable Long id,
            @RequestBody CartUpdateRequest request
    ) {
        ApiResponse<CartResponse> apiResponse = cartService.update(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> destroy(@PathVariable Long id) {
        ApiResponse<Void> apiResponse = cartService.destroy(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }


//    @PostMapping("/add")
//    public ResponseEntity<ApiResponse<Void>> add(@RequestParam Long productVariationId) {
//        Long userId = Long.parseLong(SecurityUtil.getCurrentUserId());
//        ApiResponse<Void> apiResponse = cartService.add(userId, productVariationId);
//        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
//    }

//    @PostMapping("/remove")
//    public ResponseEntity<ApiResponse<Void>> remove(@RequestParam Long cartItemId) {
//        Long userId = Long.parseLong(SecurityUtil.getCurrentUserId());
//        ApiResponse<Void> apiResponse = cartService.remove(userId, cartItemId);
//        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
//    }

//    @PostMapping("/delete")
//    public ResponseEntity<ApiResponse<Void>> delete(@RequestParam Long cartItemId) {
//        Long userId = Long.parseLong(SecurityUtil.getCurrentUserId());
//        ApiResponse<Void> apiResponse = cartService.delete(userId, cartItemId);
//        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
//    }

//    @PostMapping("/delete-all")
//    public ResponseEntity<ApiResponse<Void>> deleteAll() {
//        Long userId = Long.parseLong(SecurityUtil.getCurrentUserId());
//        ApiResponse<Void> apiResponse = cartService.deleteAll(userId);
//        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
//    }

}
