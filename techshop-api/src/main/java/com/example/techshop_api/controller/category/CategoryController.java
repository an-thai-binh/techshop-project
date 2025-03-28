package com.example.techshop_api.controller.category;

import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.request.category.CategoryCreationRequest;
import com.example.techshop_api.dto.response.category.CategoryCreationResponse;
import com.example.techshop_api.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
    CategoryService categoryService;

    @PostMapping
    public ApiResponse<CategoryCreationResponse> insert(@RequestBody CategoryCreationRequest request) {
        return categoryService.insert(request);
    }
}
