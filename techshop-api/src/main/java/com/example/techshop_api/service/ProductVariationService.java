package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.product.ProductVariationCreationRequest;
import com.example.techshop_api.dto.request.product.ProductVariationUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.product.ProductResponse;
import com.example.techshop_api.dto.response.product.ProductVariationResponse;
import com.example.techshop_api.entity.product.Product;
import com.example.techshop_api.entity.product.ProductVariation;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.ProductMapper;
import com.example.techshop_api.mapper.ProductVariationMapper;
import com.example.techshop_api.repository.ProductRepository;
import com.example.techshop_api.repository.ProductVariationRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductVariationService {
    ProductVariationRepository productVariationRepository;
    ProductRepository productRepository;
    ProductMapper productMapper;
    ProductVariationMapper productVariationMapper;

    public ApiResponse<Page<ProductVariationResponse>> index(Pageable pageable) {
        Page<ProductVariation> productVariations = productVariationRepository.findAll(pageable);
        Page<ProductVariationResponse> productVariationResponses = productVariations.map((productVariation -> {
            ProductResponse productResponse = productMapper.toProductResponse(productVariation.getProduct());
            return productVariationMapper.toProductVariationResponse(productResponse, productVariation);
        }));
        return ApiResponse.<Page<ProductVariationResponse>>builder()
                .success(true)
                .data(productVariationResponses)
                .build();
    }

    public ApiResponse<ProductVariationResponse> show(Long id) {
        ProductVariation productVariation = productVariationRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIATION_NOT_FOUND));
        ProductResponse productResponse = productMapper.toProductResponse(productVariation.getProduct());
        ProductVariationResponse productVariationResponse = productVariationMapper.toProductVariationResponse(productResponse, productVariation);
        return ApiResponse.<ProductVariationResponse>builder()
                .success(true)
                .data(productVariationResponse)
                .build();
    }

    @Transactional
    public ApiResponse<ProductVariationResponse> store(ProductVariationCreationRequest request) {
        Product product = productRepository.findById(request.getProductId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        ProductVariation productVariation = productVariationMapper.toProductVariation(product, request);
        try {
            productVariation = productVariationRepository.save(productVariation);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INSERT_FAILED);
        }
        ProductResponse productResponse = productMapper.toProductResponse(productVariation.getProduct());
        ProductVariationResponse productVariationResponse = productVariationMapper.toProductVariationResponse(productResponse, productVariation);
        return ApiResponse.<ProductVariationResponse>builder()
                .success(true)
                .data(productVariationResponse)
                .build();
    }

    @Transactional
    public ApiResponse<ProductVariationResponse> update(Long id, ProductVariationUpdateRequest request) {
        ProductVariation productVariation = productVariationRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIATION_NOT_FOUND));
        Product product = productRepository.findById(request.getProductId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        productVariationMapper.updateProductVariation(productVariation, product, request);
        try {
            productVariation = productVariationRepository.save(productVariation);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.UPDATE_FAILED);
        }
        ProductResponse productResponse = productMapper.toProductResponse(productVariation.getProduct());
        ProductVariationResponse productVariationResponse = productVariationMapper.toProductVariationResponse(productResponse, productVariation);
        return ApiResponse.<ProductVariationResponse>builder()
                .success(true)
                .data(productVariationResponse)
                .build();
    }

    public ApiResponse<Void> destroy(Long id) {
        try {
            productVariationRepository.deleteById(id);
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
