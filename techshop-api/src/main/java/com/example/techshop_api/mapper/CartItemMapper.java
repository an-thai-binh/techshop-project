package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.cart.CartCreationRequest;
import com.example.techshop_api.dto.request.cart.CartItemCreationRequest;
import com.example.techshop_api.dto.request.cart.CartItemUpdateRequest;
import com.example.techshop_api.dto.request.cart.CartUpdateRequest;
import com.example.techshop_api.dto.response.cart.CartItemResponse;
import com.example.techshop_api.dto.response.cart.CartResponse;
import com.example.techshop_api.entity.cart.Cart;
import com.example.techshop_api.entity.cart.CartItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CartItemMapper {
    CartItem toCartItem(CartItemCreationRequest cartItemCreationRequest);
    CartItemResponse toCartItemResponse(CartItem cart);
    void updateCartItem(@MappingTarget CartItem cartItem, CartItemUpdateRequest cartItemUpdateRequest);
}
