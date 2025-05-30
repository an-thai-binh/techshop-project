package com.example.techshop_api.dto.response.cart;

import com.example.techshop_api.entity.cart.CartItem;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartResponse {
    List<CartItemDisplayResponse> items;
    String totalPriceCart;
}
