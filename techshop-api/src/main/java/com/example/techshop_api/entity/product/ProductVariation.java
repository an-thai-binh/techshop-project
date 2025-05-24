package com.example.techshop_api.entity.product;

import com.example.techshop_api.entity.choice.ChoiceValue;
import com.example.techshop_api.entity.image.Image;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "product_variation")
public class ProductVariation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    Product product;

    String sku;

    int variationPriceChange;

    @ManyToOne
    @JoinColumn(name = "image_id")
    Image image;

    @ManyToMany
    @JoinTable(
            name = "variation_choice",
            joinColumns = @JoinColumn(name = "variation_id"),
            inverseJoinColumns = @JoinColumn(name = "choice_value_id")
    )
    List<ChoiceValue> choiceValueList;
}
