package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.inventory.InventoryCreationRequest;
import com.example.techshop_api.dto.request.inventory.InventoryUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.inventory.InventoryResponse;
import com.example.techshop_api.entity.inventory.Inventory;
import com.example.techshop_api.entity.product.ProductVariation;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.InventoryMapper;
import com.example.techshop_api.repository.InventoryRepository;
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
public class InventoryService {
    InventoryRepository inventoryRepository;
    ProductVariationRepository productVariationRepository;
    InventoryMapper inventoryMapper;

    public ApiResponse<Page<InventoryResponse>> index(Pageable pageable) {
        Page<Inventory> inventories  = inventoryRepository.findAll(pageable);
        Page<InventoryResponse> inventoryResponses = inventories.map(inventoryMapper::toInventoryResponse);
        return ApiResponse.<Page<InventoryResponse>>builder()
                .success(true)
                .data(inventoryResponses)
                .build();
    }

    public ApiResponse<InventoryResponse> show(Long id) {
        Inventory inventory = inventoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));
        InventoryResponse inventoryResponse = inventoryMapper.toInventoryResponse(inventory);
        return ApiResponse.<InventoryResponse>builder()
                .success(true)
                .data(inventoryResponse)
                .build();
    }

    @Transactional
    public ApiResponse<InventoryResponse> store(InventoryCreationRequest request) {
        ProductVariation productVariation = productVariationRepository.findById(request.getVariationId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIATION_NOT_FOUND));
        Inventory inventory = inventoryMapper.toInventory(productVariation, request);
        try {
            inventory = inventoryRepository.save(inventory);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INSERT_FAILED);
        }
        InventoryResponse inventoryResponse = inventoryMapper.toInventoryResponse(inventory);
        return ApiResponse.<InventoryResponse>builder()
                .success(true)
                .data(inventoryResponse)
                .build();
    }

    @Transactional
    public ApiResponse<InventoryResponse> update(Long id, InventoryUpdateRequest request) {
        ProductVariation productVariation = productVariationRepository.findById(request.getVariationId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIATION_NOT_FOUND));
        Inventory inventory = inventoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));
        inventoryMapper.updateInventory(inventory, productVariation, request);
        try {
            inventory = inventoryRepository.save(inventory);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.UPDATE_FAILED);
        }
        InventoryResponse inventoryResponse = inventoryMapper.toInventoryResponse(inventory);
        return ApiResponse.<InventoryResponse>builder()
                .success(true)
                .data(inventoryResponse)
                .build();

    }

    public ApiResponse<Void> destroy(Long id) {
        try {
            inventoryRepository.deleteById(id);
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