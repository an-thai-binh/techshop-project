package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.category.CategoryUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.request.category.CategoryCreationRequest;
import com.example.techshop_api.dto.response.category.CategoryResponse;
import com.example.techshop_api.entity.category.Category;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.CategoryMapper;
import com.example.techshop_api.repository.CategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    public ApiResponse<Page<CategoryResponse>> index(Pageable pageable) {
        Page<Category> categories = categoryRepository.findAll(pageable);
        Page<CategoryResponse> categoryResponses = categories.map(categoryMapper::toCategoryResponse);
        return ApiResponse.<Page<CategoryResponse>>builder()
                .success(true)
                .data(categoryResponses)
                .build();
    }

    public ApiResponse<CategoryResponse> show(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        CategoryResponse categoryResponse = categoryMapper.toCategoryResponse(category);
        return ApiResponse.<CategoryResponse>builder()
                .success(true)
                .data(categoryResponse)
                .build();
    }

    public ApiResponse<CategoryResponse> store(CategoryCreationRequest categoryCreationRequest) {
        Category category = categoryMapper.toCategory(categoryCreationRequest);
        try {
            category =  categoryRepository.save(category);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INSERT_FAILED);
        }
        CategoryResponse categoryResponse = categoryMapper.toCategoryResponse(category);
        return ApiResponse.<CategoryResponse>builder()
                .success(true)
                .data(categoryResponse)
                .build();
    }

    public ApiResponse<CategoryResponse> update(Long id, CategoryUpdateRequest categoryUpdateRequest) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        categoryMapper.updateCategory(category, categoryUpdateRequest);
        try {
            category = categoryRepository.save(category);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.UPDATE_FAILED);
        }
        CategoryResponse categoryResponse = categoryMapper.toCategoryResponse(category);
        return ApiResponse.<CategoryResponse>builder()
                .success(true)
                .data(categoryResponse)
                .build();
    }

    public ApiResponse<Object> destroy(Long id) {
        try {
            categoryRepository.deleteById(id);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.DELETE_FAILED);
        }
        return ApiResponse.builder()
                .success(true)
                .message("Delete Successful")
                .build();
    }
}
