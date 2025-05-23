package com.example.techshop_api.repository;

import com.example.techshop_api.entity.image.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
}
