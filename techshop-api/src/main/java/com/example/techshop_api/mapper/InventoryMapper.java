package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.inventory.InventoryCreationRequest;
import com.example.techshop_api.dto.request.inventory.InventoryUpdateRequest;
import com.example.techshop_api.dto.response.inventory.InventoryResponse;
import com.example.techshop_api.entity.inventory.Inventory;
import com.example.techshop_api.entity.product.ProductVariation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface InventoryMapper {
    @Mapping(target = "variationId", source = "inventory.productVariation.id")
    InventoryResponse toInventoryResponse(Inventory inventory);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "productVariation", source = "productVariation")
    Inventory toInventory(ProductVariation productVariation, InventoryCreationRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "productVariation", source = "productVariation")
    Inventory toInventory(ProductVariation productVariation, int quantity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "productVariation", source = "productVariation")
    void updateInventory(@MappingTarget Inventory inventory, ProductVariation productVariation, InventoryUpdateRequest request);
}