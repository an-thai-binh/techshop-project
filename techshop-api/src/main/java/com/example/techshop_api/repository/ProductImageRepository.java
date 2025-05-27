package com.example.techshop_api.repository;

import com.example.techshop_api.entity.image.ProductImage;
import com.example.techshop_api.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    void deleteByProductAndIsFirstIsTrue(Product product);
}
