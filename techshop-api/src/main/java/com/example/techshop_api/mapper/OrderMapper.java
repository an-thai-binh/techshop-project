package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.response.order.OrderResponse;
import com.example.techshop_api.entity.order.Order;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderResponse toOrderResponse(Order order);
}
