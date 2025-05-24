package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.response.image.ImageResponse;
import com.example.techshop_api.dto.response.image.ProductImageResponse;
import com.example.techshop_api.entity.image.ProductImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {
    @Mapping(target = "id", source = "productImage.id")
    @Mapping(target = "productId", source = "productImage.product.id")
    @Mapping(target = "isFirst", source = "productImage.first")
    ProductImageResponse toProductImageResponse(ImageResponse imageResponse, ProductImage productImage);
}
