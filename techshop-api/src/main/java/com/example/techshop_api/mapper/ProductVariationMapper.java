package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.product.ProductVariationCreationRequest;
import com.example.techshop_api.dto.request.product.ProductVariationUpdateRequest;
import com.example.techshop_api.dto.request.product.ProductVariationWithValuesRequest;
import com.example.techshop_api.dto.response.image.ImageResponse;
import com.example.techshop_api.dto.response.product.ProductResponse;
import com.example.techshop_api.dto.response.product.ProductVariationDetailResponse;
import com.example.techshop_api.dto.response.product.ProductVariationFullResponse;
import com.example.techshop_api.dto.response.product.ProductVariationResponse;
import com.example.techshop_api.entity.choice.ChoiceValue;
import com.example.techshop_api.entity.image.Image;
import com.example.techshop_api.entity.product.Product;
import com.example.techshop_api.entity.product.ProductVariation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductVariationMapper {
    @Mapping(target = "id", source = "productVariation.id")
    @Mapping(target= "product", source = "productResponse")
    @Mapping(target = "imageId", source = "productVariation.image.id")
    ProductVariationResponse toProductVariationResponse(ProductResponse productResponse, ProductVariation productVariation);

    @Mapping(target = "imageId", source = "productVariation.image.id")
    @Mapping(target = "choiceValueIds", expression = "java(productVariation.getChoiceValueIds())")
    ProductVariationDetailResponse toProductVariationDetailResponse(ProductVariation productVariation, int quantity);

    @Mapping(target = "id", source = "productVariation.id")
    @Mapping(target = "product", source = "productResponse")
    @Mapping(target = "image", source = "imageResponse")
    @Mapping(target = "quantity", source = "quantity")
    ProductVariationFullResponse toProductVariationFullResponse(ProductResponse productResponse, ImageResponse imageResponse, int quantity, ProductVariation productVariation);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "product", source = "product")
    ProductVariation toProductVariation(Product product, ProductVariationCreationRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "product", source = "product")
    @Mapping(target = "image", source = "image")
    @Mapping(target = "choiceValueList", source = "choiceValueList")
    @Mapping(target = "sku", source = "sku")
    ProductVariation toProductVariation(Product product, Image image, List<ChoiceValue> choiceValueList, String sku, ProductVariationWithValuesRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "product", source = "product")
    void updateProductVariation(@MappingTarget ProductVariation productVariation, Product product, ProductVariationUpdateRequest request);
}
