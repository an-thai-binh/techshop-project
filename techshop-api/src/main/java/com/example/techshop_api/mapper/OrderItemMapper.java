package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.order.OrderItemCreationRequest;
import com.example.techshop_api.entity.order.Order;
import com.example.techshop_api.entity.order.OrderItem;
import com.example.techshop_api.entity.product.ProductVariation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "order", source = "order")
    @Mapping(target = "productVariation", source = "productVariation")
    OrderItem toOrderItem(Order order, ProductVariation productVariation, OrderItemCreationRequest request);
}
