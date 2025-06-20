package com.example.techshop_api.entity.product;

import com.example.techshop_api.entity.choice.ChoiceValue;
import com.example.techshop_api.entity.image.Image;
import com.example.techshop_api.entity.order.OrderItem;
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

    @OneToMany(mappedBy = "productVariation", cascade = CascadeType.ALL, orphanRemoval = true)
    List<OrderItem> orderItemList;

    public Long[] getChoiceValueIds() {
        return choiceValueList.stream().map(ChoiceValue::getId).toArray(Long[]::new);
    }
}
