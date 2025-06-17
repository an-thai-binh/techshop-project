package com.example.techshop_api.repository;

import com.example.techshop_api.dto.response.review.ReviewDisplayResponseDto;
import com.example.techshop_api.dto.response.review.ReviewableDisplayItemDto;
import com.example.techshop_api.entity.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query(value = """
        SELECT 
            u.full_name AS userFullName,
            r.rating AS rating,
            r.content AS content,
            p.product_name AS productName,
            pv.sku AS sku,
            r.review_time AS reviewTime
        FROM review r
        JOIN users u ON r.user_id = u.id
        JOIN order_item oi ON r.order_item_id = oi.id
        JOIN product_variation pv ON oi.variation_id = pv.id
        JOIN product p ON pv.product_id = p.id
        WHERE p.id = :productId
        ORDER BY r.review_time DESC
    """, nativeQuery = true)

    List<ReviewDisplayResponseDto> findAllByProductId(Long productId);
    @Query(value = """
        SELECT oi.id AS orderItemId,
               p.product_name AS productName,
               pv.sku AS sku
        FROM order_item oi
        JOIN orders o ON oi.order_id = o.id
        JOIN product_variation pv ON oi.variation_id = pv.id
        JOIN product p ON pv.product_id = p.id
        LEFT JOIN review r ON oi.id = r.order_item_id
        WHERE o.user_id = :userId
          AND o.status = 'SUCCESS'
          AND r.id IS NULL
    """, nativeQuery = true)
    List<ReviewableDisplayItemDto> findReviewableItemsByUserId(Long userId);

    boolean existsByOrderItemId(Long orderItemId);

    @Query("SELECT r FROM Review r WHERE r.user.id = :userId")
    List<Review> findByUserId(@Param("userId") Long userId);

}




