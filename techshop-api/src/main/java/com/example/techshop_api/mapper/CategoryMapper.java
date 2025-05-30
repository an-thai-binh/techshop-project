package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.category.CategoryCreationRequest;
import com.example.techshop_api.dto.request.category.CategoryUpdateRequest;
import com.example.techshop_api.dto.response.category.CategoryResponse;
import com.example.techshop_api.entity.category.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface  CategoryMapper {
    Category toCategory(CategoryCreationRequest categoryCreationRequest);
    CategoryResponse toCategoryResponse(Category category);
    void updateCategory(@MappingTarget Category category, CategoryUpdateRequest categoryUpdateRequest);
}
