package com.example.techshop_api.entity.product;

import com.example.techshop_api.entity.category.Category;
import com.example.techshop_api.entity.choice.Choice;
import com.example.techshop_api.entity.image.ProductImage;
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
@Table(name="product")
public class Product {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   int id;

   @ManyToOne
   @JoinColumn(name="category_id", nullable=false)
   Category category;

   @Column(nullable=false)
   String productName;

   @Lob
   @Column(columnDefinition = "TEXT")
   String productDescription;

   @Column(nullable=false)
   double productBasePrice;

   @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
   List<Choice> choiceList;

   @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
   List<ProductVariation> productVariationList;

   @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
   List<ProductImage> productImageList;
}
