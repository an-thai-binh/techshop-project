package com.example.techshop_api.repository;

import com.example.techshop_api.entity.inventory.Inventory;
import com.example.techshop_api.entity.product.ProductVariation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<InventoryQuantityView> getQuantityViewByProductVariation(ProductVariation productVariation);

    void deleteByProductVariation(ProductVariation productVariation);

    void deleteByProductVariationIn(List<ProductVariation> productVariations);

    Optional<Inventory> findByProductVariationId(Long id);

    interface InventoryQuantityView {   // giúp truy vấn chỉ 1 thuộc hoặc nhiều thuộc tính xác định
        int getQuantity();
    }
}