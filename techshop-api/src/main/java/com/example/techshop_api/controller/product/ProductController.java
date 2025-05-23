package com.example.techshop_api.controller.product;

import com.example.techshop_api.dto.request.product.ProductCreationRequest;
import com.example.techshop_api.dto.request.product.ProductUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.product.ProductDisplayResponse;
import com.example.techshop_api.dto.response.product.ProductResponse;
import com.example.techshop_api.service.ProductService;
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

import java.util.List;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor()
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {
    ProductService productService;

    @GetMapping
    @PreAuthorize("hasAuthority('product:view')")
    public ResponseEntity<ApiResponse<Page<ProductResponse>>> index(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        ApiResponse<Page<ProductResponse>> apiResponse = productService.index(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/display")
    @PreAuthorize("hasAuthority('product:view')")
    public ResponseEntity<ApiResponse<Page<ProductDisplayResponse>>> indexDisplay(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        ApiResponse<Page<ProductDisplayResponse>> apiResponse = productService.indexDisplay(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('product:view')")
    public ResponseEntity<ApiResponse<ProductResponse>> show(@PathVariable Long id) {
        ApiResponse<ProductResponse> apiResponse = productService.show(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/searchList")
    @PreAuthorize("hasAuthority('product:view')")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> searchList(@RequestParam String query) {
        ApiResponse<List<ProductResponse>> apiResponse = productService.searchList(query);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/searchPage")
    @PreAuthorize("hasAuthority('product:view')")
    public ResponseEntity<ApiResponse<Page<ProductResponse>>> searchPage(
            @RequestParam String query,
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction)
    {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        ApiResponse<Page<ProductResponse>> apiResponse = productService.searchPage(query, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('product:create')")
    public ResponseEntity<ApiResponse<ProductResponse>> store(@RequestBody ProductCreationRequest request) {
        ApiResponse<ProductResponse> apiResponse = productService.store(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PostMapping("/storeWithImage")
    @PreAuthorize("hasAuthority('product:create')")
    public ResponseEntity<ApiResponse<ProductResponse>> storeWithImage(@RequestBody ProductCreationRequest request, @RequestParam Long imageId) {
        ApiResponse<ProductResponse> apiResponse = productService.storeWithImage(request, imageId);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('product:update')")
    public ResponseEntity<ApiResponse<ProductResponse>> update(@PathVariable Long id, @RequestBody ProductUpdateRequest request) {
        ApiResponse<ProductResponse> apiResponse = productService.update(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('product:delete')")
    public ResponseEntity<ApiResponse<Void>> destroy(@PathVariable Long id) {
        ApiResponse<Void> apiResponse = productService.destroy(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
