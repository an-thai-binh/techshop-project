package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.product.ProductVariationCreationRequest;
import com.example.techshop_api.dto.request.product.ProductVariationUpdateRequest;
import com.example.techshop_api.dto.request.product.ProductVariationWithValuesRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.image.ImageResponse;
import com.example.techshop_api.dto.response.product.ProductResponse;
import com.example.techshop_api.dto.response.product.ProductVariationFullResponse;
import com.example.techshop_api.dto.response.product.ProductVariationResponse;
import com.example.techshop_api.entity.choice.ChoiceValue;
import com.example.techshop_api.entity.image.Image;
import com.example.techshop_api.entity.image.ProductImage;
import com.example.techshop_api.entity.inventory.Inventory;
import com.example.techshop_api.entity.product.Product;
import com.example.techshop_api.entity.product.ProductVariation;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.ImageMapper;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    ImageMapper imageMapper;
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

    public ApiResponse<ProductVariationFullResponse> showFull(Long id) {
        ProductVariation productVariation = productVariationRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIATION_NOT_FOUND));
        ProductResponse productResponse = productMapper.toProductResponse(productVariation.getProduct());
        ImageResponse imageResponse = imageMapper.toImageResponse(productVariation.getImage());
        int quantity = inventoryRepository.getQuantityViewByProductVariation(productVariation).orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND)).getQuantity();
        ProductVariationFullResponse productVariationFullResponse = productVariationMapper.toProductVariationFullResponse(productResponse, imageResponse, quantity, productVariation);
        return ApiResponse.<ProductVariationFullResponse>builder()
                .success(true)
                .data(productVariationFullResponse)
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
        if(product.getProductBasePrice() + request.getVariationPriceChange() < 0) {
            throw new AppException(ErrorCode.PRODUCT_VARIATION_PRICE_CHANGE_INVALID);
        }
        deleteDefaultVariation(product.getId());
        List<Long> choiceValueIdList = Arrays.asList(request.getChoiceValueIds()).stream().map(Long::parseLong).toList();
        List<ChoiceValue> unorderChoiceValueList = choiceValueRepository.findAllById(choiceValueIdList);
        List<ChoiceValue> choiceValueList = getOrderedChoiceValueList(choiceValueIdList, unorderChoiceValueList);
        String sku = skuGenerator.generateSKU(product.getId(), choiceValueList);
        if(productVariationRepository.existsBySku(sku)) {
            throw new AppException(ErrorCode.PRODUCT_VARIATION_ALREADY_EXISTS);
        }
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
     * xoá variation mặc định của product nếu có
     * @param productId
     */
    private void deleteDefaultVariation(Long productId) {
        ProductVariation defaultVariation = productVariationRepository.findDefaultByProduct(productId);
        if(defaultVariation != null) {
            inventoryRepository.deleteByProductVariation(defaultVariation);
        }
    }

    /**
     * sắp xếp lại danh sách trả về từ truy vấn theo thứ tự id được gửi từ request
     * @param choiceValueIdList thứ tự id được gửi từ request
     * @param unorderChoiceValueList danh sách chưa được sắp xếp
     * @return danh sách đã được sắp xếp
     */
    private List<ChoiceValue> getOrderedChoiceValueList(List<Long> choiceValueIdList, List<ChoiceValue> unorderChoiceValueList) {
        List<ChoiceValue> result = new ArrayList<>();
        Map<Long, ChoiceValue> choiceValueMap = unorderChoiceValueList.stream()
                .collect(Collectors.toMap(ChoiceValue::getId, v -> v));
        for (Long choiceValueId : choiceValueIdList) {
            ChoiceValue value = choiceValueMap.get(choiceValueId);
            if (value == null) {
                throw new AppException(ErrorCode.CHOICE_VALUE_NOT_FOUND);
            }
            result.add(value);
        }
        return result;
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
        if(product.getProductBasePrice() + request.getVariationPriceChange() < 0) {
            throw new AppException(ErrorCode.PRODUCT_VARIATION_PRICE_CHANGE_INVALID);
        }
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

    @Transactional
    public ApiResponse<ProductVariationResponse> patch(Long id, int variationPriceChange, int quantity, Long imageId) {
        ProductVariation productVariation = productVariationRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIATION_NOT_FOUND));
        Image image = imageRepository.findById(imageId).orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_FOUND));
        Inventory inventory = inventoryRepository.findByProductVariationId(productVariation.getId()).orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));
        inventory.setQuantity(quantity);
        productVariation.setImage(image);
        productVariation.setVariationPriceChange(variationPriceChange);
        try {
            productVariation = productVariationRepository.save(productVariation);
            inventoryRepository.save(inventory);
        } catch (Exception e) {
            throw new AppException(ErrorCode.UPDATE_FAILED);
        }
        ProductResponse productResponse = productMapper.toProductResponse(productVariation.getProduct());
        ProductVariationResponse productVariationResponse = productVariationMapper.toProductVariationResponse(productResponse, productVariation);
        return ApiResponse.<ProductVariationResponse>builder()
                .success(true)
                .data(productVariationResponse)
                .build();
    }

    @Transactional
    public ApiResponse<Void> destroy(Long id) {
        ProductVariation productVariation = productVariationRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIATION_NOT_FOUND));
        Product product = productVariation.getProduct();
        Image image = imageRepository.findByProductId(product.getId()).orElse(null);
        try {
            inventoryRepository.deleteByProductVariation(productVariation);
            productVariationRepository.deleteById(id);
            // thêm lại variation mặc định
            ProductVariation defaultVariation = ProductVariation.builder()
                    .product(product)
                    .sku(product.getId().toString())
                    .variationPriceChange(0)
                    .image(image)
                    .build();
            Inventory inventory = inventoryMapper.toInventory(defaultVariation, 0);
            productVariationRepository.save(defaultVariation);
            inventoryRepository.save(inventory);
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
