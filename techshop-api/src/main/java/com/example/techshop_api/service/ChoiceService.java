package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.choice.ChoiceCreationRequest;
import com.example.techshop_api.dto.request.choice.ChoiceUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.choice.ChoiceResponse;
import com.example.techshop_api.dto.response.choice.ChoiceValueResponse;
import com.example.techshop_api.dto.response.choice.ChoiceWithValuesResponse;
import com.example.techshop_api.entity.choice.Choice;
import com.example.techshop_api.entity.image.Image;
import com.example.techshop_api.entity.inventory.Inventory;
import com.example.techshop_api.entity.product.Product;
import com.example.techshop_api.entity.product.ProductVariation;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.ChoiceMapper;
import com.example.techshop_api.mapper.ChoiceValueMapper;
import com.example.techshop_api.mapper.InventoryMapper;
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
public class ChoiceService {
    ChoiceRepository choiceRepository;
    ProductRepository productRepository;
    ProductVariationRepository productVariationRepository;
    InventoryRepository inventoryRepository;
    ImageRepository imageRepository;
    ChoiceMapper choiceMapper;
    ChoiceValueMapper choiceValueMapper;
    InventoryMapper inventoryMapper;

    public ApiResponse<Page<ChoiceResponse>> index(Pageable pageable) {
        Page<Choice> choiceList = choiceRepository.findAll(pageable);
        Page<ChoiceResponse> choiceResponses = choiceList.map(choiceMapper::toChoiceResponse);
        return ApiResponse.<Page<ChoiceResponse>>builder()
                .success(true)
                .data(choiceResponses)
                .build();
    }

    public ApiResponse<List<ChoiceWithValuesResponse>> indexWithValuesByProductId(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        List<Choice> choiceList = choiceRepository.findByProduct(product);
        List<ChoiceWithValuesResponse> choiceWithValuesResponseList = choiceList.stream().map(choice -> {
            List<ChoiceValueResponse> choiceValueResponseList = choice.getChoiceValueList().stream().map(choiceValueMapper::toChoiceValueResponse).toList();
            return choiceMapper.toChoiceWithValuesResponse(choice, choiceValueResponseList);
        }).toList();
        return ApiResponse.<List<ChoiceWithValuesResponse>>builder()
                .success(true)
                .data(choiceWithValuesResponseList)
                .build();
    }

    public ApiResponse<ChoiceResponse> show(Long id) {
        Choice choice = choiceRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CHOICE_NOT_FOUND));
        ChoiceResponse choiceResponse = choiceMapper.toChoiceResponse(choice);
        return ApiResponse.<ChoiceResponse>builder()
                .success(true)
                .data(choiceResponse)
                .build();
    }

    public ApiResponse<ChoiceWithValuesResponse> showWithValues(Long id) {
        Choice choice = choiceRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CHOICE_NOT_FOUND));
        List<ChoiceValueResponse> choiceValueResponseList = choice.getChoiceValueList().stream().map(choiceValueMapper::toChoiceValueResponse).toList();
        ChoiceWithValuesResponse choiceWithValuesResponse = choiceMapper.toChoiceWithValuesResponse(choice, choiceValueResponseList);
        return ApiResponse.<ChoiceWithValuesResponse>builder()
                .success(true)
                .data(choiceWithValuesResponse)
                .build();
    }

    @Transactional
    public ApiResponse<ChoiceResponse> store(ChoiceCreationRequest request) {
        Product product = productRepository.findById(request.getProductId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        deleteOldProductVariations(product);
        Choice choice = choiceMapper.toChoice(product, request);
        try {
            choice = choiceRepository.save(choice);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INSERT_FAILED);
        }
        ChoiceResponse choiceResponse = choiceMapper.toChoiceResponse(choice);
        return ApiResponse.<ChoiceResponse>builder()
                .success(true)
                .data(choiceResponse)
                .build();
    }

    /**
     * xoá các biến thể cũ của sản phẩm và thêm biến thể mặc định
     * @param product product
     */
    private void deleteOldProductVariations(Product product) {
        List<ProductVariation> productVariationList = product.getProductVariationList();
        try {
            // xoá trong inventory
            inventoryRepository.deleteByProductVariationIn(productVariationList);
            // xoá danh sách variation
            product.getProductVariationList().removeAll(productVariationList);
            product = productRepository.save(product);
            // thêm variation mặc định
            Image image = imageRepository.findByProductId(product.getId()).orElse(null);
            ProductVariation productVariation = ProductVariation.builder()
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
            throw new AppException(ErrorCode.DELETE_FAILED);
        }
    }

    @Transactional
    public ApiResponse<ChoiceResponse> update(Long id, ChoiceUpdateRequest request) {
        Choice choice = choiceRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CHOICE_NOT_FOUND));
        Product product = productRepository.findById(request.getProductId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        choiceMapper.updateChoice(choice, product, request);
        try {
            choice = choiceRepository.save(choice);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.UPDATE_FAILED);
        }
        ChoiceResponse choiceResponse = choiceMapper.toChoiceResponse(choice);
        return ApiResponse.<ChoiceResponse>builder()
                .success(true)
                .data(choiceResponse)
                .build();
    }

    @Transactional
    public ApiResponse<Void> destroy(Long choiceId, Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        deleteOldProductVariations(product);
        try {
            choiceRepository.deleteById(choiceId);
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
