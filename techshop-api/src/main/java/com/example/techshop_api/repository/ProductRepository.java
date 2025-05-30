package com.example.techshop_api.repository;


import com.example.techshop_api.dto.response.product.ProductDisplayResponse;
import com.example.techshop_api.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(
            value = "SELECT p.id AS id, c.id AS categoryId, c.category_name AS categoryName, p.product_name AS productName, " +
                    "p.product_description AS productDescription, p.product_base_price AS productBasePrice, i.img_url AS productImgUrl" +
                    " FROM product p " +
                    " JOIN product_image pi ON p.id = pi.product_id" +
                    " JOIN image i ON pi.image_id = i.id  " +
                    " JOIN category c ON p.category_id = c.id" +
                    " WHERE pi.is_first = TRUE"
            ,
            countQuery = "SELECT COUNT(*)" +
                    " FROM product p " +
                    " JOIN product_image pi ON p.id = pi.product_id" +
                    " JOIN image i ON pi.image_id = i.id  " +
                    " JOIN category c ON p.category_id = c.id" +
                    " WHERE pi.is_first = TRUE"
            ,
            nativeQuery = true)
    Page<ProductDisplayResponse> findAllProductsDisplay(Pageable pageable);

    @Query(value = """
            SELECT 
                p.id AS id, 
                c.id AS categoryId, 
                c.category_name AS categoryName, 
                p.product_name AS productName, 
                p.product_description AS productDescription, 
                p.product_base_price AS productBasePrice, 
                i.img_url AS productImgUrl
            FROM product p
            JOIN category c ON p.category_id = c.id
            JOIN product_image pi ON p.id = pi.product_id
            JOIN image i ON pi.image_id = i.id
            WHERE pi.is_first = TRUE
              AND c.id = :categoryId
            """,
            countQuery = """
                    SELECT COUNT(*) FROM product p
                    JOIN category c ON p.category_id = c.id
                    JOIN product_image pi ON p.id = pi.product_id
                    JOIN image i ON pi.image_id = i.id
                    WHERE pi.is_first = TRUE
                      AND c.id = :categoryId
                    """,
            nativeQuery = true)
    Page<ProductDisplayResponse> findByCategoryId(Long categoryId, Pageable pageable);

    /**
     * Tìm kiếm danh sách sản phẩm theo tên (với fulltext index)
     *
     * @param query từ khoá
     * @return List<Product>
     */
    @Query(value = "SELECT * FROM product WHERE MATCH(product_name) AGAINST (?1 IN NATURAL LANGUAGE MODE)", nativeQuery = true)
    List<Product> searchByProductName(String query);

    /**
     * Tìm kiếm danh sách sản phẩm theo tên (với fulltext index)
     *
     * @param query    từ khoá
     * @param pageable Pageable instance
     * @return Page<Product><
     */
    @Query(value = "SELECT * FROM product WHERE MATCH(product_name) AGAINST (?1 IN NATURAL LANGUAGE MODE)", nativeQuery = true)
    Page<Product> searchByProductName(String query, Pageable pageable);

}
