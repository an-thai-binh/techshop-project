package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.category.CategoryCreationRequest;
import com.example.techshop_api.dto.response.category.CategoryCreationResponse;
import com.example.techshop_api.entity.category.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCategory(CategoryCreationRequest categoryCreationRequest);
    CategoryCreationResponse toCategoryCreationResponse(Category category);
}
