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
import jakarta.transaction.Transactional;
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
    public ApiResponse<Void> addWithQuantity(Long userId, CartItemCreationRequest cartItemCreationRequest) {
        if (cartItemCreationRequest.getQuantity() <= 0) {
            return ApiResponse.<Void>builder().success(false).message("Số lượng phải lớn hơn 0").build();
        }

        User user = userRepository.findById(userId).orElse(null);
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));

        ProductVariation variation = productVariationRepository.findById(cartItemCreationRequest.getProductVariationId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy biến thể sản phẩm"));

        Inventory inventory = inventoryRepository.findByProductVariationId(cartItemCreationRequest.getProductVariationId())
                .orElseThrow(() -> new RuntimeException("Sản phẩm không còn trong kho"));

        int availableStock = inventory.getQuantity();
        int requestedQuantity = cartItemCreationRequest.getQuantity();

        if (availableStock == 0) {
            return ApiResponse.<Void>builder().success(false).message("Sản phẩm đã hết hàng").build();
        }

        Optional<CartItem> existingItem = cartItemRepository
                .findByCartIdAndProductVariationId(cart.getId(), variation.getId());

        int finalQuantityToSet;
        String infoMessage = null;

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            int currentQuantity = item.getQuantity();
            int totalRequested = currentQuantity + requestedQuantity;
            finalQuantityToSet = Math.min(totalRequested, availableStock);

            item.setQuantity(finalQuantityToSet);
            cartItemRepository.save(item);

            if (finalQuantityToSet < totalRequested) {
                infoMessage = String.format("Chỉ thêm được %d sản phẩm vào giỏ do giới hạn tồn kho.", finalQuantityToSet - currentQuantity);
            }
        } else {
            finalQuantityToSet = Math.min(requestedQuantity, availableStock);

            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .productVariation(variation)
                    .quantity(finalQuantityToSet)
                    .build();
            cartItemRepository.save(newItem);

            if (finalQuantityToSet < requestedQuantity) {
                infoMessage = String.format("Chỉ thêm được %d sản phẩm vào giỏ do giới hạn tồn kho.", finalQuantityToSet);
            }
        }

        return ApiResponse.<Void>builder()
                .success(true)
                .message(infoMessage != null ? infoMessage : "Thêm vào giỏ hàng thành công")
                .build();
    }


    public ApiResponse<Void> subtract(Long userId, Long cartItemId) {
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
    public ApiResponse<Void> updateQuantity(Long userId, CartItemUpdateRequest cartItemUpdateRequest) {
        if (cartItemUpdateRequest.getQuantity() <= 0) {
            return ApiResponse.<Void>builder().success(false).message("Số lượng phải lớn hơn 0").build();
        }

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng"));

        Optional<CartItem> optionalCartItem = cartItemRepository
                .findByCartIdAndProductVariationId(cart.getId(), cartItemUpdateRequest.getProductVariationId());

        CartItem cartItem;
        int newQuantity;

        if (optionalCartItem.isPresent()) {
            cartItem = optionalCartItem.get();
            newQuantity = cartItem.getQuantity() + cartItemUpdateRequest.getQuantity();
        } else {
            ProductVariation productVariation = productVariationRepository.findById(cartItemUpdateRequest.getProductVariationId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy biến thể sản phẩm"));

            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProductVariation(productVariation);
            newQuantity = cartItemUpdateRequest.getQuantity();
        }

        Inventory inventory = inventoryRepository.findByProductVariationId(cartItem.getProductVariation().getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tồn kho"));

        if (inventory.getQuantity() < newQuantity) {
            return ApiResponse.<Void>builder().success(false).message("Không đủ hàng trong kho").build();
        }

        cartItem.setQuantity(newQuantity);
        cartItemRepository.save(cartItem);

        return ApiResponse.<Void>builder().success(true).message("Cập nhật số lượng thành công").build();
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
