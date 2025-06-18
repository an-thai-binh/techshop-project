package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.order.OrderCreationRequest;
import com.example.techshop_api.dto.response.order.OrderDetailResponse;
import com.example.techshop_api.dto.response.order.OrderItemDetailResponse;
import com.example.techshop_api.dto.response.order.OrderResponse;
import com.example.techshop_api.dto.response.payment.PaymentDetailResponse;
import com.example.techshop_api.entity.order.Order;
import com.example.techshop_api.entity.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    @Mapping(target = "id", source = "order.id")
    @Mapping(target = "userId", source = "order.user.id")
    OrderResponse toOrderResponse(Order order);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", source = "user")
    Order toOrder(User user, OrderCreationRequest request);

    @Mapping(target = "id", source = "order.id")
    @Mapping(target = "userId", source = "order.user.id")
    @Mapping(target = "orderItemList", source = "orderItemDetailResponseList")
    @Mapping(target = "payment", source = "paymentDetailResponse")
    OrderDetailResponse toOrderDetailResponse(Order order, PaymentDetailResponse paymentDetailResponse, List<OrderItemDetailResponse> orderItemDetailResponseList);
}
