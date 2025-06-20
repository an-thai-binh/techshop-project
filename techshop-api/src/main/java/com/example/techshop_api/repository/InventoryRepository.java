package com.example.techshop_api.repository;

import com.example.techshop_api.entity.inventory.Inventory;
import com.example.techshop_api.entity.product.ProductVariation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<InventoryQuantityView> getQuantityViewByProductVariation(ProductVariation productVariation);

    void deleteByProductVariation(ProductVariation productVariation);

    void deleteByProductVariationIn(List<ProductVariation> productVariations);

    Optional<Inventory> findByProductVariationId(Long id);

    @Modifying
    @Query(value= """
        UPDATE inventory i 
        SET i.quantity = i.quantity - :quantity
        WHERE i.variation_id = :variationId 
        AND i.quantity >= :quantity
    """,
    nativeQuery = true)
    int reduceIfEnough(Long variationId, int quantity);

    interface InventoryQuantityView {   // giúp truy vấn chỉ 1 thuộc hoặc nhiều thuộc tính xác định
        int getQuantity();
    }
}