package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.cart.CartCreationRequest;
import com.example.techshop_api.dto.request.cart.CartUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.cart.CartItemDisplayResponse;
import com.example.techshop_api.dto.response.cart.CartResponse;
import com.example.techshop_api.entity.cart.Cart;
import com.example.techshop_api.entity.cart.CartItem;
import com.example.techshop_api.entity.inventory.Inventory;
import com.example.techshop_api.entity.product.ProductVariation;
import com.example.techshop_api.entity.user.User;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.CartMapper;
import com.example.techshop_api.repository.*;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartService {
    CartRepository cartRepository;
    UserRepository userRepository;
    CartItemRepository cartItemRepository;
    CartMapper cartMapper;
    private final ProductVariationRepository productVariationRepository;
    private final InventoryRepository inventoryRepository;

    public ApiResponse<Page<CartResponse>> index(Pageable pageable) {
        Page<Cart> carts = cartRepository.findAll(pageable);
        Page<CartResponse> cartResponses = carts.map(cartMapper::toCartResponse);
        return ApiResponse.<Page<CartResponse>>builder()
                .success(true)
                .data(cartResponses)
                .build();
    }

    public ApiResponse<CartResponse> show(Long userId) {
        List<CartItemDisplayResponse> items = cartItemRepository.findCartItemsByUserId(userId);
        CartResponse cartResponse = new CartResponse();
        BigDecimal totalPrice = BigDecimal.ZERO;
        for (CartItemDisplayResponse item : items) {
            totalPrice = totalPrice.add(new BigDecimal(item.getProductTotalPrice()));
        }
        cartResponse.setItems(items);
        cartResponse.setTotalPriceCart(totalPrice.toPlainString());
        return ApiResponse.<CartResponse>builder().success(true).data(cartResponse).build();
    }

    public ApiResponse<CartResponse> store(CartCreationRequest cartCreationRequest) {
        Cart cart = cartMapper.toCart(cartCreationRequest);
        try {
            cart = cartRepository.save(cart);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INSERT_FAILED);
        }
        CartResponse cartResponse = cartMapper.toCartResponse(cart);
        return ApiResponse.<CartResponse>builder()
                .success(true)
                .data(cartResponse)
                .build();
    }

    public ApiResponse<CartResponse> update(Long id, CartUpdateRequest cartUpdateRequest) {
        Cart cart = cartRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
        cartMapper.updateCart(cart, cartUpdateRequest);
        try {
            cart = cartRepository.save(cart);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.UPDATE_FAILED);
        }
        CartResponse cartResponse = cartMapper.toCartResponse(cart);
        return ApiResponse.<CartResponse>builder()
                .success(true)
                .data(cartResponse)
                .build();
    }

    public ApiResponse<Void> destroy(Long id) {
        try {
            cartRepository.deleteById(id);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.DELETE_FAILED);
        }
        return ApiResponse.<Void>builder()
                .success(true)
                .message("Delete Successful")
                .build();
    }

    //public ApiResponse<Void> add(Long userId, Long productId) {
//    User user = userRepository.findById(userId).orElse(null);
//    Cart cart = cartRepository.findByUserId(userId)
//            .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));
//
//    Product product = productRepository.findById(productId)
//            .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
//
//    // Lấy variation đầu tiên (hoặc tùy chọn logic chọn biến thể phù hợp)
//    ProductVariation variation = product.getProductVariationList().stream()
//            .findFirst()
//            .orElseThrow(() -> new RuntimeException("Sản phẩm không có biến thể"));
//
//    Inventory inventory = inventoryRepository.findByProductVariationId(variation.getId())
//            .orElseThrow(() -> new RuntimeException("Sản phẩm không còn trong kho"));
//
//    if (inventory.getQuantity() <= 0) {
//        return ApiResponse.<Void>builder().success(false).message("Sold out").build();
//    }
//
//    Optional<CartItem> existingItem = cartItemRepository
//            .findByCartIdAndProductVariationId(cart.getId(), variation.getId());
//
//    if (existingItem.isPresent()) {
//        CartItem item = existingItem.get();
//        item.setQuantity(item.getQuantity() + 1);
//        cartItemRepository.save(item);
//    } else {
//        CartItem newItem = CartItem.builder()
//                .cart(cart)
//                .productVariation(variation)
//                .quantity(1)
//                .build();
//        cartItemRepository.save(newItem);
//    }
//
//    return ApiResponse.<Void>builder().success(true).message("Add to cart successful").build();
//}
    public ApiResponse<Void> add(Long userId, Long productVariationId) {
        User user = userRepository.findById(userId).orElse(null);

        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));

        ProductVariation variation = productVariationRepository.findById(productVariationId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy biến thể sản phẩm"));

        Inventory inventory = inventoryRepository.findByProductVariationId(productVariationId)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không còn trong kho"));

        if (inventory.getQuantity() <= 0) {
            return ApiResponse.<Void>builder().success(false).message("Sold out").build();
        }

        Optional<CartItem> existingItem = cartItemRepository
                .findByCartIdAndProductVariationId(cart.getId(), variation.getId());

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + 1);
            cartItemRepository.save(item);
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .productVariation(variation)
                    .quantity(1)
                    .build();
            cartItemRepository.save(newItem);
        }

        return ApiResponse.<Void>builder().success(true).message("Add to cart successful").build();
    }

    public ApiResponse<Void> remove(Long userId, Long cartItemId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng của người dùng"));

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm trong giỏ hàng"));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            return ApiResponse.<Void>builder().success(false).message("Sản phẩm không thuộc giỏ hàng người dùng").build();
        }

        if (cartItem.getQuantity() <= 1) {
            return ApiResponse.<Void>builder()
                    .success(false)
                    .message("Không thể giảm số lượng dưới 1. Nếu muốn xoá, hãy dùng chức năng xoá.")
                    .build();
        }

        cartItem.setQuantity(cartItem.getQuantity() - 1);
        cartItemRepository.save(cartItem);

        return ApiResponse.<Void>builder().success(true).message("Giảm số lượng thành công").build();
    }

    public ApiResponse<Void> delete(Long userId, Long cartItemId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng"));

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm trong giỏ hàng"));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            return ApiResponse.<Void>builder().message("Product isn't belong this cart of user").build();
        }

        cartItemRepository.delete(cartItem);

        return ApiResponse.<Void>builder().success(true).message("Delete successful").build();
    }

    @Transactional
    public ApiResponse<Void> deleteAll(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng"));

        cartItemRepository.deleteByCartId(cart.getId());

        return ApiResponse.<Void>builder().success(true).message("Delete all successful").build();
    }


}
