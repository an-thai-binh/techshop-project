package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.image.ImageCreationRequest;
import com.example.techshop_api.dto.response.image.ImageResponse;
import com.example.techshop_api.entity.image.Image;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    ImageResponse toImageResponse(Image image);
    Image toImage(ImageCreationRequest request);
}