package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.cart.CartItemCreationRequest;
import com.example.techshop_api.dto.request.cart.CartItemUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.cart.CartItemResponse;
import com.example.techshop_api.entity.cart.Cart;
import com.example.techshop_api.entity.cart.CartItem;
import com.example.techshop_api.entity.inventory.Inventory;
import com.example.techshop_api.entity.product.ProductVariation;
import com.example.techshop_api.entity.user.User;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.CartItemMapper;
import com.example.techshop_api.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartItemService {

    CartItemRepository cartItemRepository;
    UserRepository userRepository;
    CartRepository cartRepository;
    ProductVariationRepository productVariationRepository;
    InventoryRepository inventoryRepository;
    CartItemMapper cartItemMapper;

    public ApiResponse<Page<CartItemResponse>> index(Pageable pageable) {
        Page<CartItem> cartItems = cartItemRepository.findAll(pageable);
        Page<CartItemResponse> cartItemResponses = cartItems.map(cartItemMapper::toCartItemResponse);
        return new ApiResponse<>(true, "Paged cart items", cartItemResponses);
    }

    public ApiResponse<CartItemResponse> show(Long id) {
        CartItem cartItem = cartItemRepository.findById(id).orElse(null);
        CartItemResponse cartItemResponse = cartItemMapper.toCartItemResponse(cartItem);
        return ApiResponse.<CartItemResponse>builder()
                .success(true)
                .data(cartItemResponse)
                .build();
    }

    public ApiResponse<CartItemResponse> store(Long userId, CartItemCreationRequest cartItemCreationRequest) {
        CartItem cartItem = cartItemMapper.toCartItem(cartItemCreationRequest);
        User user = userRepository.findById(userId).orElse(null);

        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));

        ProductVariation variation = productVariationRepository.findById(cartItem.getProductVariation().getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy biến thể sản phẩm"));

        Inventory inventory = inventoryRepository.findByProductVariationId(cartItem.getProductVariation().getId())
                .orElseThrow(() -> new RuntimeException("Sản phẩm không còn trong kho"));

        if (inventory.getQuantity() <= 0) {
            return ApiResponse.<CartItemResponse>builder().success(false).message("Sold out").build();
        }

        Optional<com.example.techshop_api.entity.cart.CartItem> existingItem = cartItemRepository
                .findByCartIdAndProductVariationId(cart.getId(), variation.getId());

        if (existingItem.isPresent()) {
            com.example.techshop_api.entity.cart.CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + 1);
            cartItemRepository.save(item);
        } else {
            com.example.techshop_api.entity.cart.CartItem newItem = com.example.techshop_api.entity.cart.CartItem.builder()
                    .cart(cart)
                    .productVariation(variation)
                    .quantity(1)
                    .build();
            cartItemRepository.save(newItem);
        }
        CartItemResponse cartItemResponse = cartItemMapper.toCartItemResponse(cartItem);
        return ApiResponse.<CartItemResponse>builder().success(true).data(cartItemResponse).build();
    }

    public ApiResponse<CartItemResponse> update(Long id, CartItemUpdateRequest cartItemUpdateRequest) {
        CartItem cartItem = cartItemRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));
        cartItemMapper.updateCartItem(cartItem, cartItemUpdateRequest);
        try {
            cartItem = cartItemRepository.save(cartItem);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.UPDATE_FAILED);
        }
        CartItemResponse cartItemResponse = cartItemMapper.toCartItemResponse(cartItem);
        return ApiResponse.<CartItemResponse>builder()
                .success(true)
                .data(cartItemResponse)
                .build();
    }

    public ApiResponse<Void> destroy(Long id) {
        try {
            cartItemRepository.deleteByCartId(id);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.DELETE_FAILED);
        }
        return ApiResponse.<Void>builder()
                .success(true)
                .message("Delete Successful")
                .build();
    }
}
