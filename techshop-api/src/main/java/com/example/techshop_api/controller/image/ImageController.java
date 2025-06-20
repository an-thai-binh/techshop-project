package com.example.techshop_api.controller.image;

import com.example.techshop_api.dto.request.image.ImageCreationRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.image.ImageResponse;
import com.example.techshop_api.service.ImageService;
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
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ImageController {
    ImageService imageService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Page<ImageResponse>>> index(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        ApiResponse<Page<ImageResponse>> apiResponse = imageService.index(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ImageResponse>> show(@PathVariable Long id) {
        ApiResponse<ImageResponse> apiResponse = imageService.show(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/showByUrl")
    public ResponseEntity<ApiResponse<ImageResponse>> showByUrl(@RequestParam String url) {
        ApiResponse<ImageResponse> apiResponse = imageService.showByUrl(url);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/showByProduct")
    public ResponseEntity<ApiResponse<ImageResponse>> showByProduct(@RequestParam Long productId) {
        ApiResponse<ImageResponse> apiResponse = imageService.showByProduct(productId);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping("/url")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ImageResponse>> store(@RequestBody ImageCreationRequest request) {
        ApiResponse<ImageResponse> apiResponse = imageService.store(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PostMapping("/file")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ImageResponse>> store(@RequestParam("file") MultipartFile file) {
        ApiResponse<ImageResponse> apiResponse = imageService.store(file);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
}

