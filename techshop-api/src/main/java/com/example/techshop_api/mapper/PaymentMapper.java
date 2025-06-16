package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.response.payment.PaymentDetailResponse;
import com.example.techshop_api.dto.response.payment.PaymentResponse;
import com.example.techshop_api.entity.payment.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PaymentMapper {
    @Mapping(target = "orderId", source = "payment.order.id")
    PaymentResponse toPaymentResponse(Payment payment);

    PaymentDetailResponse toPaymentDetailResponse(Payment payment);
}
