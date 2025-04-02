package com.example.techshop_api.repository;


import com.example.techshop_api.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    /**
     * Tìm kiếm danh sách sản phẩm theo tên (với fulltext index)
     * @param query từ khoá
     * @return List<Product>
     */
    @Query(value = "SELECT * FROM product WHERE MATCH(product_name) AGAINST (?1 IN NATURAL LANGUAGE MODE)", nativeQuery = true)
    List<Product> searchByProductName(String query);

    /**
     * Tìm kiếm danh sách sản phẩm theo tên (với fulltext index)
     * @param query từ khoá
     * @param pageable Pageable instance
     * @return Page<Product><
     */
    @Query(value = "SELECT * FROM product WHERE MATCH(product_name) AGAINST (?1 IN NATURAL LANGUAGE MODE)", nativeQuery = true)
    Page<Product> searchByProductName(String query, Pageable pageable);
}
