package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.category.CategoryUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.request.category.CategoryCreationRequest;
import com.example.techshop_api.entity.category.Category;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.CategoryMapper;
import com.example.techshop_api.repository.CategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    public ApiResponse<Page<Category>> index(Pageable pageable) {
        Page<Category> categories = categoryRepository.findAll(pageable);
        return ApiResponse.<Page<Category>>builder()
                .data(categories)
                .build();
    }

    public ApiResponse<Category> show(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        return ApiResponse.<Category>builder()
                .data(category)
                .build();
    }

    public ApiResponse<Category> store(CategoryCreationRequest categoryCreationRequest) {
        Category category = categoryMapper.toCategory(categoryCreationRequest);
        try {
            category =  categoryRepository.save(category);
        } catch (Exception e) {
            throw new AppException(ErrorCode.INSERT_FAILED);
        }
        return ApiResponse.<Category>builder()
                .data(category)
                .build();
    }

    public ApiResponse<Category> update(Long id, CategoryUpdateRequest categoryUpdateRequest) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        categoryMapper.updateCategory(category, categoryUpdateRequest);
        try {
            category = categoryRepository.save(category);
        } catch (Exception e) {
            throw new AppException(ErrorCode.UPDATE_FAILED);
        }
        return ApiResponse.<Category>builder()
                .data(category)
                .build();
    }

    public ApiResponse<Object> destroy(Long id) {
        try {
            categoryRepository.deleteById(id);
        } catch (Exception e) {
            throw new AppException(ErrorCode.DELETE_FAILED);
        }
        return ApiResponse.builder()
                .message("Delete Successful")
                .build();
    }
}
