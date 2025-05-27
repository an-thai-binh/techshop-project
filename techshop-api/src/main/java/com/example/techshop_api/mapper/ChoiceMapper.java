package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.choice.ChoiceCreationRequest;
import com.example.techshop_api.dto.request.choice.ChoiceUpdateRequest;
import com.example.techshop_api.dto.response.choice.ChoiceResponse;
import com.example.techshop_api.dto.response.choice.ChoiceValueResponse;
import com.example.techshop_api.dto.response.choice.ChoiceWithValuesResponse;
import com.example.techshop_api.entity.choice.Choice;
import com.example.techshop_api.entity.product.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChoiceMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "product", source = "product")
    Choice toChoice(Product product, ChoiceCreationRequest request);

    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "choiceName", source = "choiceName")
    ChoiceResponse toChoiceResponse(Choice choice);

    @Mapping(target = "productId", source = "choice.product.id")
    @Mapping(target = "choiceValueList", source = "choiceValueResponseList")
    ChoiceWithValuesResponse toChoiceWithValuesResponse(Choice choice, List<ChoiceValueResponse> choiceValueResponseList);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "product", source = "product")
    void updateChoice(@MappingTarget Choice choice, Product product, ChoiceUpdateRequest request);
}