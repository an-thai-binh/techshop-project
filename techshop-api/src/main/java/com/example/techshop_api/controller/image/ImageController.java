package com.example.techshop_api.controller.image;

import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.image.ImageResponse;
import com.example.techshop_api.service.ImageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ImageController {
    ImageService imageService;

    @PostMapping("/file")
    public ResponseEntity<ApiResponse<ImageResponse>> store(@RequestParam("file") MultipartFile file) {
        ApiResponse<ImageResponse> apiResponse = imageService.store(file);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}

