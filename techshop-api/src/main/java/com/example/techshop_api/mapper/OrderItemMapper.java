package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.order.OrderItemCreationRequest;
import com.example.techshop_api.entity.order.Order;
import com.example.techshop_api.entity.order.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "order", source = "order")
    OrderItem toOrderItem(Order order, OrderItemCreationRequest request);
}
