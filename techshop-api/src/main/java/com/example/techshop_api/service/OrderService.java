package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.order.OrderCreationRequest;
import com.example.techshop_api.dto.request.order.OrderItemCreationRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.order.OrderResponse;
import com.example.techshop_api.entity.cart.CartItem;
import com.example.techshop_api.entity.order.Order;
import com.example.techshop_api.entity.order.OrderItem;
import com.example.techshop_api.entity.user.User;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.OrderItemMapper;
import com.example.techshop_api.mapper.OrderMapper;
import com.example.techshop_api.repository.CartItemRepository;
import com.example.techshop_api.repository.InventoryRepository;
import com.example.techshop_api.repository.OrderRepository;
import com.example.techshop_api.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService {
    OrderRepository orderRepository;
    CartItemRepository cartItemRepository;
    UserRepository userRepository;
    InventoryRepository inventoryRepository;
    OrderMapper orderMapper;
    OrderItemMapper orderItemMapper;

    public ApiResponse<Page<OrderResponse>> index(Pageable pageable) {
        Page<Order> orders = orderRepository.findAll(pageable);
        Page<OrderResponse> orderResponses = orders.map(orderMapper::toOrderResponse);
        return ApiResponse.<Page<OrderResponse>>builder()
                .success(true)
                .data(orderResponses)
                .build();
    }

    public ApiResponse<OrderResponse> show(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        OrderResponse orderResponse = orderMapper.toOrderResponse(order);
        return ApiResponse.<OrderResponse>builder()
                .success(true)
                .data(orderResponse)
                .build();
    }

    @Transactional
    public ApiResponse<OrderResponse> store(OrderCreationRequest request) {
        // kiểm tra user tồn tại
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        List<OrderItemCreationRequest> requestItems = request.getOrderItems();
        // kiểm tra kho còn đủ số lượng
        for(OrderItemCreationRequest item: requestItems) {
            if(inventoryRepository.isOutOfStock(item.getVariationId(), item.getQuantity())) {
                throw new AppException(ErrorCode.PRODUCT_OUT_OF_STOCK);
            }
        }
        // khởi tạo order và order item
        Order order = orderMapper.toOrder(user, request);
        order.setOrderTime(LocalDateTime.now());
        order.setStatus("INVALID"); // đơn chưa cài đặt thanh toán sẽ có status là INVALID
        double totalAmount = requestItems.stream()
                        .mapToDouble(item -> item.getUnitPrice() * item.getQuantity())
                        .sum();
        order.setTotalAmount(totalAmount);
        List<OrderItem> orderItemList = requestItems.stream().map((item) -> orderItemMapper.toOrderItem(order, item)).toList();
        order.setOrderItemList(orderItemList);
        try {
            orderRepository.save(order);
        } catch (Exception e) {
            throw new AppException(ErrorCode.INSERT_FAILED);
        }
        OrderResponse orderResponse = orderMapper.toOrderResponse(order);
        return ApiResponse.<OrderResponse>builder()
                .success(true)
                .data(orderResponse)
                .build();
    }
}
