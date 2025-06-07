package com.example.techshop_api.service;

import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.order.OrderResponse;
import com.example.techshop_api.entity.cart.CartItem;
import com.example.techshop_api.entity.order.Order;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.OrderMapper;
import com.example.techshop_api.repository.CartItemRepository;
import com.example.techshop_api.repository.OrderRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService {
    OrderRepository orderRepository;
    OrderMapper orderMapper;
    private final CartItemRepository cartItemRepository;

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

//    public ApiResponse<OrderResponse> store(OrderCreationRequest request, Long[] cartItemIds) {
//        // user
//        List<CartItem> itemList = cartItemRepository.findAllById(List.of(cartItemIds));
//        if(itemList.isEmpty()) {
//            throw new AppException(ErrorCode.CART_ITEM_NOT_FOUND);
//        }
//        // boolean: query: select 1 from cart c join inventory i on c.variation_id = i.variation_id where c.id IN (...) and c.quantity > i.quantity
//        // mapping from cartitem to orderitem
//        // order.setOrderItemList = ...
//        // try save
//        // reduce in inventory: update inventory i join orderitem oi on i.variation_id = oi.variation_id set i.quantity = i.quantity - oi.quantity where oi.id IN (...)
//        // start 15 minutes to add payment (restore in inventory, cancel order)
//    }
}
