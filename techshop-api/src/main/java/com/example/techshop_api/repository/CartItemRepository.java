package com.example.techshop_api.repository;

import com.example.techshop_api.dto.response.cart.CartItemDisplayResponse;
import com.example.techshop_api.dto.response.cart.CartItemResponse;
import com.example.techshop_api.entity.cart.Cart;
import com.example.techshop_api.entity.cart.CartItem;
import com.example.techshop_api.entity.product.ProductVariation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Query(value = """
    SELECT 
        ci.id AS id,
        ci.quantity AS quantity,
        p.id AS productId,
        pv.id AS productVariationId,
        p.product_description AS productDescription,
        p.product_name AS productName,
        (p.product_base_price + pv.variation_price_change) AS productFinalPrice,
        img.img_url AS productImgUrl,
        CAST(((p.product_base_price + pv.variation_price_change) * ci.quantity) AS CHAR) AS productTotalPrice
    FROM cart_item ci
    JOIN product_variation pv ON ci.product_variation_id = pv.id
    JOIN product p ON pv.product_id = p.id
    LEFT JOIN product_image pi ON pi.product_id = p.id AND pi.is_first = true
    LEFT JOIN image img ON pi.image_id = img.id
    WHERE ci.cart_id = (SELECT id FROM cart WHERE user_id = :userId)
""", nativeQuery = true)
    List<CartItemDisplayResponse> findCartItemsByUserId(@Param("userId") Long userId);
    Optional<CartItem> findByCartIdAndProductVariationId(Long cartId, Long productVariationId);

    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.cart.id = :cartId")
    void deleteByCartId(@Param("cartId") Long cartId);

}
