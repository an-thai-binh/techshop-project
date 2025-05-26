package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.product.ProductCreationRequest;
import com.example.techshop_api.dto.request.product.ProductUpdateRequest;
import com.example.techshop_api.dto.response.category.CategoryResponse;
import com.example.techshop_api.dto.response.image.ProductImageResponse;
import com.example.techshop_api.dto.response.product.ProductDetailResponse;
import com.example.techshop_api.dto.response.product.ProductResponse;
import com.example.techshop_api.dto.response.product.ProductVariationDetailResponse;
import com.example.techshop_api.entity.category.Category;
import com.example.techshop_api.entity.product.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "category", source = "category")
    Product toProduct(Category category, ProductCreationRequest productCreationRequest);

    @Mapping(target = "categoryId", source = "category.id")
    ProductResponse toProductResponse(Product product);

    @Mapping(target = "id", source = "product.id")
    @Mapping(target = "category", source = "categoryResponse")
    @Mapping(target = "productVariationList", source = "productVariationDetailResponseList")
    @Mapping(target = "productImageList", source = "productImageResponseList")
    ProductDetailResponse toProductDetailResponse(
            Product product,
            CategoryResponse categoryResponse,
            List<ProductVariationDetailResponse> productVariationDetailResponseList,
            List<ProductImageResponse> productImageResponseList);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "category", source = "category")
    void updateProduct(@MappingTarget Product product, Category category, ProductUpdateRequest productUpdateRequest);
}