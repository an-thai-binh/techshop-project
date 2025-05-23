package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.product.ProductCreationRequest;
import com.example.techshop_api.dto.request.product.ProductUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.product.ProductDisplayResponse;
import com.example.techshop_api.dto.response.product.ProductResponse;
import com.example.techshop_api.entity.category.Category;
import com.example.techshop_api.entity.image.Image;
import com.example.techshop_api.entity.image.ProductImage;
import com.example.techshop_api.entity.product.Product;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.ProductMapper;
import com.example.techshop_api.repository.CategoryRepository;
import com.example.techshop_api.repository.ImageRepository;
import com.example.techshop_api.repository.ProductImageRepository;
import com.example.techshop_api.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductService {
    CategoryRepository categoryRepository;
    ProductRepository productRepository;
    ImageRepository imageRepository;
    ProductImageRepository productImageRepository;
    ProductMapper productMapper;

    public ApiResponse<Page<ProductResponse>> index(Pageable pageable) {
        Page<Product> products = productRepository.findAll(pageable);
        Page<ProductResponse> productResponses = products.map(productMapper::toProductResponse);
        return ApiResponse.<Page<ProductResponse>>builder()
                .success(true)
                .data(productResponses)
                .build();
    }

    public ApiResponse<Page<ProductDisplayResponse>> indexDisplay(Pageable pageable) {
        Page<ProductDisplayResponse> productDisplayResponses = productRepository.findAllProductsDisplay(pageable);
        return ApiResponse.<Page<ProductDisplayResponse>>builder()
                .success(true)
                .data(productDisplayResponses)
                .build();
    }

    public ApiResponse<ProductResponse> show(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        ProductResponse productResponse = productMapper.toProductResponse(product);
        return ApiResponse.<ProductResponse>builder()
                .success(true)
                .data(productResponse)
                .build();
    }

    /**
     * tìm kiếm danh sách sản phẩm theo tên (sử dụng MATCH AGAINST với FULLTEXT index)
     * @param query từ khoá tìm kiếm
     * @return List<ProductResponse>
     */
    public ApiResponse<List<ProductResponse>> searchList(String query) {
        List<Product> products = productRepository.searchByProductName(query);
        List<ProductResponse> productResponses = products.stream().map(productMapper::toProductResponse).toList();
        return ApiResponse.<List<ProductResponse>>builder()
                .success(true)
                .data(productResponses)
                .build();
    }

    /**
     * tìm kiếm danh sách sản phẩm theo tên (sử dụng MATCH AGAINST với FULLTEXT index)
     * @param query từ khoá tìm kiếm
     * @param pageable Pageable instance
     * @return Page<ProductResponse>
     */
    public ApiResponse<Page<ProductResponse>> searchPage(String query, Pageable pageable) {
        Page<Product> products = productRepository.searchByProductName(query, pageable);
        Page<ProductResponse> productResponses = products.map(productMapper::toProductResponse);
        return ApiResponse.<Page<ProductResponse>>builder()
                .success(true)
                .data(productResponses)
                .build();
    }

    @Transactional
    public ApiResponse<ProductResponse> store(ProductCreationRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        Product product = productMapper.toProduct(category, request);
        try {
            product = productRepository.save(product);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INSERT_FAILED);
        }
        ProductResponse productResponse = productMapper.toProductResponse(product);
        return ApiResponse.<ProductResponse>builder()
                .success(true)
                .data(productResponse)
                .build();
    }

    @Transactional
    public ApiResponse<ProductResponse> storeWithImage(ProductCreationRequest request, Long imageId) {
        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        Image image = imageRepository.findById(imageId).orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_FOUND));
        Product product = productMapper.toProduct(category, request);
        ProductImage productImage = ProductImage.builder()
                .product(product)
                .image(image)
                .isFirst(true)
                .build();
        try {
            productImageRepository.save(productImage);
            product = productRepository.save(product);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INSERT_FAILED);
        }
        ProductResponse productResponse = productMapper.toProductResponse(product);
        return ApiResponse.<ProductResponse>builder()
                .success(true)
                .data(productResponse)
                .build();
    }

    @Transactional
    public ApiResponse<ProductResponse> update(Long id, ProductUpdateRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        Product product = productRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        productMapper.updateProduct(product, category, request);
        try {
            product = productRepository.save(product);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.UPDATE_FAILED);
        }
        ProductResponse productResponse = productMapper.toProductResponse(product);
        return ApiResponse.<ProductResponse>builder()
                .success(true)
                .data(productResponse)
                .build();
    }

    public ApiResponse<Void> destroy(Long id) {
        try {
            productRepository.deleteById(id);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.DELETE_FAILED);
        }
        return ApiResponse.<Void>builder()
                .success(true)
                .message("Delete Successful")
                .build();
    }
}
