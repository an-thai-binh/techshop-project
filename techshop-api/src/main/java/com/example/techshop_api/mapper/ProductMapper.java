package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.response.product.ProductResponse;
import com.example.techshop_api.entity.product.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(source = "category.id", target = "categoryId")
    ProductResponse toProductResponse(Product product);
}