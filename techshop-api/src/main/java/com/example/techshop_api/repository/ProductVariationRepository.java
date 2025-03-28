package com.example.techshop_api.repository;

import com.example.techshop_api.entity.product.ProductVariation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductVariationRepository extends JpaRepository<ProductVariation, Integer> {
}
