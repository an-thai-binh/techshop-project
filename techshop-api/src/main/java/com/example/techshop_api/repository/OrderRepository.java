package com.example.techshop_api.repository;

import com.example.techshop_api.entity.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = """
    UPDATE orders
    SET status = :status
    WHERE id = :orderId
    """,
    nativeQuery = true)
    void updateStatus(Long orderId, String status);
}
