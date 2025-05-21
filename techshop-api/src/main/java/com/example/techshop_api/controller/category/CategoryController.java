package com.example.techshop_api.controller.category;

import com.example.techshop_api.dto.request.category.CategoryUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.request.category.CategoryCreationRequest;
import com.example.techshop_api.dto.response.category.CategoryResponse;
import com.example.techshop_api.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
    CategoryService categoryService;

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('product:view')")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> index() {
        ApiResponse<List<CategoryResponse>> apiResponse = categoryService.index();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('product:view')")
    public ResponseEntity<ApiResponse<Page<CategoryResponse>>> index(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        ApiResponse<Page<CategoryResponse>> apiResponse = categoryService.index(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('product:view')")
    public ResponseEntity<ApiResponse<CategoryResponse>> show(@PathVariable(name = "id") Long id) {
        ApiResponse<CategoryResponse> apiResponse = categoryService.show(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('product:create')")
    public ResponseEntity<ApiResponse<CategoryResponse>> insert(@RequestBody CategoryCreationRequest request) {
        ApiResponse<CategoryResponse> apiResponse = categoryService.store(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('product:update')")
    public ResponseEntity<ApiResponse<CategoryResponse>> update(@PathVariable(name = "id") Long id, @RequestBody CategoryUpdateRequest request) {
        ApiResponse<CategoryResponse> apiResponse = categoryService.update(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('product:delete')")
    public ResponseEntity<ApiResponse<Void>> destroy(@PathVariable(name = "id") Long id) {
        ApiResponse<Void> apiResponse = categoryService.destroy(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
