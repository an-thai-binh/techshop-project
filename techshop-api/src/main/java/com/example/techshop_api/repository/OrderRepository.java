package com.example.techshop_api.repository;

import com.example.techshop_api.entity.order.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findAllByStatusIsNotLike(String status, Pageable pageable);

    Page<Order> findAll(Specification<Order> spec, Pageable pageable);

    @Query(value = """
    UPDATE orders
    SET status = :status
    WHERE id = :orderId
    """,
    nativeQuery = true)
    void updateStatus(Long orderId, String status);

    List<Order> findAllByUserIdOrderByOrderTimeDesc(Long userId);

    long countByStatus(String status);

    Page<Order> findByUserId(Long user_id, Pageable pageable);

    class OrderSpecification {
        public static Specification<Order> hasId(String orderId) {
            return (root, query, builder) -> {
                if(orderId == null || orderId.isEmpty()) {
                    return builder.conjunction();
                }
                Long id;
                try {
                    id = Long.parseLong(orderId);
                } catch (NumberFormatException e) {
                    return builder.disjunction();
                }
                return builder.equal(root.get("id"), id);
            };
        }

        public static Specification<Order> hasOrderName(String orderName) {
            return (root, query, builder) -> {
                if(orderName == null || orderName.isEmpty()) {
                    return builder.conjunction();
                }
                return builder.like(root.get("orderName"), "%" + orderName + "%");
            };
        }

        public static Specification<Order> hasStatus(String status) {
            return (root, query, builder) ->  {
                if(status == null || status.isEmpty()) {
                    return builder.conjunction();
                }
                return builder.like(root.get("status"), "%" + status + "%");
            };
        }

        public static Specification<Order> statusIsNotLike(String status) {
            return (root, query, builder) ->  {
                if(status == null || status.isEmpty()) {
                    return builder.conjunction();
                }
                return builder.notLike(root.get("status"), "%" + status + "%");
            };
        }

        public static Specification<Order> orderTimeAfter(LocalDateTime afterTime) {
            return (root, query, builder) -> {
                if(afterTime == null) {
                   return builder.conjunction();
                }
                return builder.greaterThanOrEqualTo(root.get("orderTime"), afterTime);
            };
        }

        public static Specification<Order> orderTimeBefore(LocalDateTime beforeTime) {
            return (root, query, builder) -> {
                if(beforeTime == null) {
                    return builder.conjunction();
                }
                return builder.lessThanOrEqualTo(root.get("orderTime"), beforeTime);
            };
        }

        public static Specification<Order> amountGreaterThanOrEqualTo(String minAmount) {
            return (root, query, criteriaBuilder) -> {
                double min;
                try {
                    min = Double.parseDouble(minAmount);
                } catch (NumberFormatException | NullPointerException e) {
                    min = 0;
                }
                return criteriaBuilder.greaterThanOrEqualTo(root.get("totalAmount"), min);
            };
        }

        public static Specification<Order> amountLessThanOrEqualTo(String maxAmount) {
            return (root, query, criteriaBuilder) -> {
                double max;
                try {
                    max = Double.parseDouble(maxAmount);
                } catch (NumberFormatException | NullPointerException e) {
                    max = Double.MAX_VALUE;
                }
                return criteriaBuilder.lessThanOrEqualTo(root.get("totalAmount"), max);
            };
        }
    }
}
