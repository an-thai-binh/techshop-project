package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.product.ProductCreationRequest;
import com.example.techshop_api.dto.request.product.ProductUpdateRequest;
import com.example.techshop_api.dto.response.product.ProductResponse;
import com.example.techshop_api.entity.category.Category;
import com.example.techshop_api.entity.product.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(source = "category", target = "category")
    Product toProduct(Category category, ProductCreationRequest productCreationRequest);

    @Mapping(source = "category.id", target = "categoryId")
    ProductResponse toProductResponse(Product product);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "category", target = "category")
    void updateProduct(@MappingTarget Product product, Category category, ProductUpdateRequest productUpdateRequest);
}