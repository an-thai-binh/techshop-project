package com.example.techshop_api.controller.product;

import com.example.techshop_api.dto.request.product.ProductVariationCreationRequest;
import com.example.techshop_api.dto.request.product.ProductVariationUpdateRequest;
import com.example.techshop_api.dto.request.product.ProductVariationWithValuesRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.product.ProductVariationFullResponse;
import com.example.techshop_api.dto.response.product.ProductVariationResponse;
import com.example.techshop_api.service.ProductVariationService;
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
@RequestMapping("/productVariation")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductVariationController {
    ProductVariationService productVariationService;

    @GetMapping
    @PreAuthorize("hasAuthority('product:view')")
    public ResponseEntity<ApiResponse<Page<ProductVariationResponse>>> index(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        ApiResponse<Page<ProductVariationResponse>> apiResponse = productVariationService.index(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('product:view')")
    public ResponseEntity<ApiResponse<ProductVariationResponse>> show(@PathVariable Long id) {
        ApiResponse<ProductVariationResponse> apiResponse = productVariationService.show(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/{id}/full")
    @PreAuthorize("hasAuthority('product:view')")
    public ResponseEntity<ApiResponse<ProductVariationFullResponse>> showFull(@PathVariable Long id) {
        ApiResponse<ProductVariationFullResponse> apiResponse = productVariationService.showFull(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('product:create')")
    public ResponseEntity<ApiResponse<ProductVariationResponse>> store(@RequestBody ProductVariationCreationRequest request) {
        ApiResponse<ProductVariationResponse> apiResponse = productVariationService.store(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PostMapping("/storeWithValues")
    public ResponseEntity<ApiResponse<ProductVariationResponse>> storeWithValues(@RequestBody ProductVariationWithValuesRequest request) {
        ApiResponse<ProductVariationResponse> apiResponse = productVariationService.storeWithValues(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('product:update')")
    public ResponseEntity<ApiResponse<ProductVariationResponse>> update(@PathVariable Long id, @RequestBody ProductVariationUpdateRequest request) {
        ApiResponse<ProductVariationResponse> apiResponse = productVariationService.update(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasAuthority('product:update')")
    public ResponseEntity<ApiResponse<ProductVariationResponse>> patch(@PathVariable Long id, @RequestParam int variationPriceChange, @RequestParam int quantity, @RequestParam Long imageId) {
        ApiResponse<ProductVariationResponse> apiResponse = productVariationService.patch(id, variationPriceChange, quantity, imageId);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('product:delete')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        ApiResponse<Void> apiResponse = productVariationService.destroy(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
