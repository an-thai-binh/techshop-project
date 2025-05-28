package com.example.techshop_api.repository;

import com.example.techshop_api.entity.image.Image;
import com.example.techshop_api.entity.image.ProductImage;
import com.example.techshop_api.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    Optional<ProductImage> findByProductAndIsFirstIsTrue(Product product);
    void deleteByProductAndIsFirstIsTrue(Product product);
    boolean existsByProductAndImage(Product product, Image image);
}
