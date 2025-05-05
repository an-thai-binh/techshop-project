package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.choice.ChoiceCreationRequest;
import com.example.techshop_api.dto.request.choice.ChoiceUpdateRequest;
import com.example.techshop_api.dto.response.choice.ChoiceResponse;
import com.example.techshop_api.entity.choice.Choice;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ChoiceMapper {
    Choice toChoice(ChoiceCreationRequest choiceCreationRequest);
    ChoiceResponse toChoiceResponse(Choice choice);
    void updateChoice(@MappingTarget Choice choice, ChoiceUpdateRequest choiceUpdateRequest);
}
