package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.product.ProductCreationRequest;
import com.example.techshop_api.dto.request.product.ProductUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.category.CategoryResponse;
import com.example.techshop_api.dto.response.image.ImageResponse;
import com.example.techshop_api.dto.response.image.ProductImageResponse;
import com.example.techshop_api.dto.response.product.ProductDetailResponse;
import com.example.techshop_api.dto.response.product.ProductDisplayResponse;
import com.example.techshop_api.dto.response.product.ProductResponse;
import com.example.techshop_api.dto.response.product.ProductVariationDetailResponse;
import com.example.techshop_api.entity.category.Category;
import com.example.techshop_api.entity.image.Image;
import com.example.techshop_api.entity.image.ProductImage;
import com.example.techshop_api.entity.inventory.Inventory;
import com.example.techshop_api.entity.product.Product;
import com.example.techshop_api.entity.product.ProductVariation;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.*;
import com.example.techshop_api.repository.*;
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
    ProductVariationRepository productVariationRepository;
    ImageRepository imageRepository;
    ProductImageRepository productImageRepository;
    InventoryRepository inventoryRepository;
    ProductMapper productMapper;
    CategoryMapper categoryMapper;
    ProductVariationMapper productVariationMapper;
    ProductImageMapper productImageMapper;
    ImageMapper imageMapper;
    InventoryMapper inventoryMapper;

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
    public ApiResponse<Page<ProductDisplayResponse>> indexCategory(Long categoryId, Pageable pageable){
        Page<ProductDisplayResponse> productDisplayResponses  = productRepository.findByCategoryId(categoryId, pageable);
        return ApiResponse.<Page<ProductDisplayResponse>>builder().success(true).data(productDisplayResponses).build();
    }

    public ApiResponse<ProductResponse> show(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        ProductResponse productResponse = productMapper.toProductResponse(product);
        return ApiResponse.<ProductResponse>builder()
                .success(true)
                .data(productResponse)
                .build();
    }

    @Transactional
    public ApiResponse<ProductDetailResponse> showDetail(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        CategoryResponse categoryResponse = categoryMapper.toCategoryResponse(product.getCategory());
        List<ProductVariationDetailResponse> productVariationDetailResponseList = product.getProductVariationList().stream()
                .map(productVariation -> {
                    int quantity = inventoryRepository.findByProductVariation(productVariation).orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND))
                            .getQuantity();
                    return productVariationMapper.toProductVariationDetailResponse(productVariation, quantity);
                })
                .toList();
        List<ProductImageResponse> productImageList = product.getProductImageList().stream().map(productImage -> {
            ImageResponse imageResponse = imageMapper.toImageResponse(productImage.getImage());
            return productImageMapper.toProductImageResponse(imageResponse, productImage);
        }).toList();
        ProductDetailResponse productDetailResponse = productMapper.toProductDetailResponse(product, categoryResponse, productVariationDetailResponseList, productImageList);
        return ApiResponse.<ProductDetailResponse>builder()
                .success(true)
                .data(productDetailResponse)
                .build();
    }



    /**
     * tìm kiếm danh sách sản phẩm theo tên (sử dụng MATCH AGAINST với FULLTEXT index)
     * @param query từ khoá tìm kiếm
     * @return List<ProductDisplayResponse>
     */
    public ApiResponse<List<ProductDisplayResponse>> searchList(String query) {
        List<ProductDisplayResponse> products = productRepository.searchByProductName(query);
        return ApiResponse.<List<ProductDisplayResponse>>builder()
                .success(true)
                .data(products)
                .build();
    }

    /**
     * tìm kiếm danh sách sản phẩm theo tên (sử dụng MATCH AGAINST với FULLTEXT index)
     * @param query từ khoá tìm kiếm
     * @param pageable Pageable instance
     * @return List<ProductDisplayResponse>
     */
    public ApiResponse<Page<ProductDisplayResponse>> searchPage(String query, Pageable pageable) {
        Page<ProductDisplayResponse> products = productRepository.searchByProductName(query, pageable);
        return ApiResponse.<Page<ProductDisplayResponse>>builder()
                .success(true)
                .data(products)
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
        product.getProductImageList().add(productImage);
        try {
            product = productRepository.save(product);
            ProductVariation productVariation = ProductVariation.builder()  // default
                    .product(product)
                    .sku(product.getId().toString())
                    .variationPriceChange(0)
                    .image(image)
                    .build();
            Inventory inventory = inventoryMapper.toInventory(productVariation, 0);
            productVariationRepository.save(productVariation);
            inventoryRepository.save(inventory);
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

    @Transactional
    public ApiResponse<ProductResponse> updateWithImage(Long id, ProductUpdateRequest request, Long imageId) {
        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        Image image = imageRepository.findById(imageId).orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_FOUND));
        Product product = productRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        productImageRepository.deleteByProductAndIsFirstIsTrue(product);
        ProductImage productImage = ProductImage.builder()
                .product(product)
                .image(image)
                .isFirst(true)
                .build();
        productMapper.updateProduct(product, category, request);
        try {
            product = productRepository.save(product);
            productImageRepository.save(productImage);
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

    @Transactional
    public ApiResponse<Void> destroy(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        try {
            inventoryRepository.deleteByProductVariationIn(product.getProductVariationList());
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
