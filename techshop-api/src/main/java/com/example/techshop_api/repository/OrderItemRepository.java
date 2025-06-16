package com.example.techshop_api.repository;

import com.example.techshop_api.dto.response.order.OrderItemDetailResponse;
import com.example.techshop_api.entity.order.Order;
import com.example.techshop_api.entity.order.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    @Query(value = """
        SELECT oi.id AS id, p.product_name AS productName, pv.sku AS sku, i.img_url AS imgUrl,
                   oi.unit_price AS unitPrice, oi.quantity AS quantity
        FROM order_item oi 
        JOIN product_variation pv ON oi.variation_id = pv.id
        JOIN product p ON pv.product_id = p.id
        LEFT JOIN image i ON pv.image_id = i.id
        WHERE oi.order_id = :orderId
    """,
    nativeQuery = true)
    List<OrderItemDetailResponse> findAllDetailByOrder(Long orderId);
}
