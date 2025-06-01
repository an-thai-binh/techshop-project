package com.example.techshop_api.repository;

import com.example.techshop_api.entity.product.ProductVariation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductVariationRepository extends JpaRepository<ProductVariation, Long> {
    @Query(
            value ="SELECT * " +
                    " FROM product_variation pv" +
                    " WHERE pv.product_id = :productId" +
                    " AND pv.sku NOT LIKE '%\\\\_%' ESCAPE '\\\\'",
            nativeQuery = true)
    ProductVariation findDefaultByProduct(Long productId);

    boolean existsBySku(String sku);
}
