package com.example.techshop_api.controller.review;

import com.example.techshop_api.dto.request.review.ReviewCreationRequestDto;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.review.ReviewResponseDto;
import com.example.techshop_api.dto.response.review.ReviewDisplayResponseDto;
import com.example.techshop_api.dto.response.review.ReviewableDisplayItemDto;
import com.example.techshop_api.dto.response.review.UserReviewDto;
import com.example.techshop_api.service.ReviewService;
import com.example.techshop_api.utils.SecurityUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReviewController {
    ReviewService reviewService;

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<List<ReviewDisplayResponseDto>>> getProductReviews(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(productId));
    }

    @GetMapping("/user/{userId}/reviews")
    public ResponseEntity<ApiResponse<List<UserReviewDto>>> getReviewsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(reviewService.getReviewsByUserId(userId));
    }

    @GetMapping("/user/{userId}/reviewable-items")
    public ResponseEntity<ApiResponse<List<ReviewableDisplayItemDto>>> getReviewableItems(@PathVariable Long userId) {
        return ResponseEntity.ok(reviewService.getReviewableItems(userId));
    }


    @GetMapping("/product/{productId}/average")
    public ResponseEntity<ApiResponse<Double>> getAverageRating(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getAverageRatingForProduct(productId));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ReviewResponseDto>> addReview(
            @RequestBody ReviewCreationRequestDto dto
    ) {
        Long userId = Long.valueOf(SecurityUtil.getCurrentUserId());
        return ResponseEntity.ok(reviewService.createReview(dto, userId));
    }

}
