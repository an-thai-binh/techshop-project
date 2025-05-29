package com.example.techshop_api.repository;

import com.example.techshop_api.entity.image.Image;
import com.example.techshop_api.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByImgUrl(String imgUrl);
    @Query(
            value = "SELECT i.*" +
                    " FROM image i JOIN product_image pi ON i.id = pi.image_id" +
                    " WHERE pi.product_id = :productId" +
                    " AND is_first = TRUE",
            nativeQuery = true)
    Optional<Image> findByProductId(Long productId);
}
