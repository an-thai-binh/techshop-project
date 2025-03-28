package com.example.techshop_api.service;

import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.request.category.CategoryCreationRequest;
import com.example.techshop_api.dto.response.category.CategoryCreationResponse;
import com.example.techshop_api.entity.category.Category;
import com.example.techshop_api.mapper.CategoryMapper;
import com.example.techshop_api.repository.CategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    public ApiResponse<CategoryCreationResponse> insert(CategoryCreationRequest categoryCreationRequest) {
        Category category = categoryMapper.toCategory(categoryCreationRequest);
        CategoryCreationResponse categoryCreationResponse = categoryMapper.toCategoryCreationResponse(categoryRepository.save(category));
        return ApiResponse.<CategoryCreationResponse>builder()
                .success(true)
                .data(categoryCreationResponse)
                .build();
    }
}
