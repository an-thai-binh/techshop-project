package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.cart.CartCreationRequest;
import com.example.techshop_api.dto.request.cart.CartUpdateRequest;
import com.example.techshop_api.dto.response.cart.CartItemDisplayResponse;
import com.example.techshop_api.dto.response.cart.CartResponse;
import com.example.techshop_api.entity.cart.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CartMapper {
    Cart toCart(CartCreationRequest cartCreationRequest);
    CartResponse toCartResponse(Cart cart);
    default CartResponse toCartResponse(List<CartItemDisplayResponse> items, String totalPrice){
        return CartResponse.builder().items(items).totalPriceCart(totalPrice).build();
    };
    void updateCart(@MappingTarget Cart cart, CartUpdateRequest cartUpdateRequest);
}
