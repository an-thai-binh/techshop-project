package com.example.techshop_api.entity.choice;

import com.example.techshop_api.entity.product.ProductVariation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "choice_value")
public class ChoiceValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "choice_id", nullable = false)
    Choice choice;

    @Column(nullable = false)
    String choiceValue;

    String skuValue;

    @ManyToMany(mappedBy = "choiceValueList")
    List<ProductVariation> variationList;
}
