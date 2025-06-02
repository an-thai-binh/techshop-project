package com.example.techshop_api.entity.cart;

import com.example.techshop_api.entity.product.Product;
import com.example.techshop_api.entity.product.ProductVariation;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "cart_item", uniqueConstraints = @UniqueConstraint(columnNames = {"id", "product_variation_id"}))
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id", referencedColumnName = "id")
    Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_variation_id", referencedColumnName = "id")
    ProductVariation productVariation;

    int quantity;
}
