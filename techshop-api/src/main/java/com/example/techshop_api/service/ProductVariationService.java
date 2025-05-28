package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.product.ProductVariationCreationRequest;
import com.example.techshop_api.dto.request.product.ProductVariationUpdateRequest;
import com.example.techshop_api.dto.request.product.ProductVariationWithValuesRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.product.ProductResponse;
import com.example.techshop_api.dto.response.product.ProductVariationResponse;
import com.example.techshop_api.entity.choice.ChoiceValue;
import com.example.techshop_api.entity.image.Image;
import com.example.techshop_api.entity.image.ProductImage;
import com.example.techshop_api.entity.inventory.Inventory;
import com.example.techshop_api.entity.product.Product;
import com.example.techshop_api.entity.product.ProductVariation;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.InventoryMapper;
import com.example.techshop_api.mapper.ProductMapper;
import com.example.techshop_api.mapper.ProductVariationMapper;
import com.example.techshop_api.repository.*;
import com.example.techshop_api.utils.SKUGenerator;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductVariationService {
    ProductVariationRepository productVariationRepository;
    ProductRepository productRepository;
    ChoiceValueRepository choiceValueRepository;
    ProductImageRepository productImageRepository;
    ImageRepository imageRepository;
    InventoryRepository inventoryRepository;
    ProductMapper productMapper;
    ProductVariationMapper productVariationMapper;
    InventoryMapper inventoryMapper;
    SKUGenerator skuGenerator;

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
    public ApiResponse<ProductVariationResponse> storeWithValues(ProductVariationWithValuesRequest request) {
        Product product = productRepository.findById(request.getProductId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        List<Long> choiceValueIdList = Arrays.asList(request.getChoiceValueIds()).stream().map(Long::parseLong).toList();
        List<ChoiceValue> choiceValueList = choiceValueRepository.findAllById(choiceValueIdList);
        String sku = skuGenerator.generateSKU(product.getId(), choiceValueList);
        Image image = checkImageUpload(product, request.getImageId());
        ProductVariation productVariation = productVariationMapper.toProductVariation(product, image, choiceValueList, sku, request);
        Inventory inventory = inventoryMapper.toInventory(productVariation, request.getQuantity());
        try {
            productVariation = productVariationRepository.save(productVariation);
            inventoryRepository.save(inventory);
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

    /**
     * lấy image từ CSDL, kiểm tra xem đã có trong bảng product_image chưa, nếu chưa thì thêm mới
     * @param product product
     * @param imageId imageId
     * @return Image
     */
    private Image checkImageUpload(Product product, Long imageId) {
        Image image = imageRepository.findById(imageId).orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_FOUND));
        if(!productImageRepository.existsByProductAndImage(product, image)) {
            ProductImage productImage = ProductImage.builder()
                    .product(product)
                    .image(image)
                    .isFirst(false)
                    .build();
            try {
                productImageRepository.save(productImage);
            } catch (Exception e) {
                log.error(e.getMessage());
                throw new AppException(ErrorCode.INSERT_FAILED);
            }
        }
        return image;
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
