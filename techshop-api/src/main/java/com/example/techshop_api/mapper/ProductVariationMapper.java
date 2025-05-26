package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.product.ProductVariationCreationRequest;
import com.example.techshop_api.dto.request.product.ProductVariationUpdateRequest;
import com.example.techshop_api.dto.response.product.ProductResponse;
import com.example.techshop_api.dto.response.product.ProductVariationDetailResponse;
import com.example.techshop_api.dto.response.product.ProductVariationResponse;
import com.example.techshop_api.entity.product.Product;
import com.example.techshop_api.entity.product.ProductVariation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductVariationMapper {
    @Mapping(target = "id", source = "productVariation.id")
    @Mapping(target= "product", source = "productResponse")
    @Mapping(target = "imageId", source = "productVariation.image.id")
    ProductVariationResponse toProductVariationResponse(ProductResponse productResponse, ProductVariation productVariation);

    @Mapping(target = "imageId", source = "productVariation.image.id")
    @Mapping(target = "choiceValueIds", expression = "java(productVariation.getChoiceValueIds())")
    ProductVariationDetailResponse toProductVariationDetailResponse(ProductVariation productVariation, int quantity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "product", source = "product")
    ProductVariation toProductVariation(Product product, ProductVariationCreationRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "product", source = "product")
    void updateProductVariation(@MappingTarget ProductVariation productVariation, Product product, ProductVariationUpdateRequest request);
}
