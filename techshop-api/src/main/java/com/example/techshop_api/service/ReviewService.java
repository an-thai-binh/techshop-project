package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.review.ReviewCreationRequestDto;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.review.ReviewResponseDto;
import com.example.techshop_api.dto.response.review.ReviewDisplayResponseDto;
import com.example.techshop_api.dto.response.review.ReviewableDisplayItemDto;
import com.example.techshop_api.dto.response.review.UserReviewDto;
import com.example.techshop_api.entity.order.OrderItem;
import com.example.techshop_api.entity.review.Review;
import com.example.techshop_api.entity.user.User;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.repository.OrderItemRepository;
import com.example.techshop_api.repository.ReviewRepository;
import com.example.techshop_api.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReviewService {
    ReviewRepository reviewRepository;
    OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;

    @Transactional
    public ApiResponse<ReviewResponseDto> createReview(ReviewCreationRequestDto dto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        OrderItem orderItem = orderItemRepository.findById(dto.getOrderItemId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng."));

        if (!orderItem.getOrder().getUser().getId().equals(userId)) {
            throw new RuntimeException("Bạn không thể đánh giá đơn hàng không thuộc về bạn.");
        }

        if (!"SUCCESS".equalsIgnoreCase(orderItem.getOrder().getStatus())) {
            throw new RuntimeException("Chỉ đánh giá các đơn hàng đã thanh toán.");
        }

        if (reviewRepository.existsByOrderItemId(orderItem.getId())) {
            throw new RuntimeException("Đơn hàng này đã được đánh giá rồi.");
        }

        Review review = Review.builder()
                .user(user)
                .orderItem(orderItem)
                .content(dto.getContent())
                .rating(dto.getRating())
                .reviewTime(LocalDateTime.now())
                .build();
        Review savedReview = reviewRepository.save(review);
        return ApiResponse.<ReviewResponseDto>builder().success(true).data(ReviewResponseDto.builder()
                .reviewId(savedReview.getId())
                .userFullName(savedReview.getUser().getFullName())
                .content(savedReview.getContent())
                .rating(savedReview.getRating())
                .reviewTime(savedReview.getReviewTime().toString())
                .productName(savedReview.getOrderItem().getProductVariation().getProduct().getProductName())
                .sku(savedReview.getOrderItem().getProductVariation().getSku())
                .build()).build();
    }

    public ApiResponse<List<UserReviewDto>> getReviewsByUserId(Long userId) {
        return ApiResponse.<List<UserReviewDto>>builder().success(true).data(reviewRepository.findByUserId(userId).stream()
                .map(r -> UserReviewDto.builder()
                        .orderItemId(r.getOrderItem().getId())
                        .rating(r.getRating())
                        .content(r.getContent())
                        .build()
                ).toList()).build();
    }

    public ApiResponse<List<ReviewDisplayResponseDto>> getReviewsByProduct(Long productId) {
        return ApiResponse.<List<ReviewDisplayResponseDto>>builder().success(true).data(reviewRepository.findAllByProductId(productId)).build();
    }

    public ApiResponse<List<ReviewableDisplayItemDto>> getReviewableItems(Long userId) {
        return ApiResponse.<List<ReviewableDisplayItemDto>>builder().success(true).data(reviewRepository.findReviewableItemsByUserId(userId)).build();
    }

    public ApiResponse<Double> getAverageRatingForProduct(Long productId) {
        List<ReviewDisplayResponseDto> reviews = reviewRepository.findAllByProductId(productId);
        double average = reviews.stream()
                .mapToInt(ReviewDisplayResponseDto::getRating)
                .average()
                .orElse(0.0);
        return ApiResponse.<Double>builder()
                .success(true)
                .data(average)
                .build();
    }

}
