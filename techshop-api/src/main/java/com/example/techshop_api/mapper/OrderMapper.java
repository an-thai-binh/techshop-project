package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.order.OrderCreationRequest;
import com.example.techshop_api.dto.response.order.OrderResponse;
import com.example.techshop_api.entity.order.Order;
import com.example.techshop_api.entity.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderResponse toOrderResponse(Order order);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", source = "user")
    Order toOrder(User user, OrderCreationRequest request);
}
