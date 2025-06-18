package com.example.techshop_api.repository;

import com.example.techshop_api.entity.order.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findAllByStatusIsNotLike(String status, Pageable pageable);

    @Query(value = """
    UPDATE orders
    SET status = :status
    WHERE id = :orderId
    """,
    nativeQuery = true)
    void updateStatus(Long orderId, String status);

    List<Order> findAllByUserId(Long userId);

    long countByStatus(String status);
}
