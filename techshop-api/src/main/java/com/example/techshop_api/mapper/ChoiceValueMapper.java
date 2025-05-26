package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.choice.ChoiceValueCreationRequest;
import com.example.techshop_api.dto.request.choice.ChoiceValueUpdateRequest;
import com.example.techshop_api.dto.response.choice.ChoiceValueResponse;
import com.example.techshop_api.entity.choice.Choice;
import com.example.techshop_api.entity.choice.ChoiceValue;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ChoiceValueMapper {
    @Mapping(target = "choiceId", source = "choice.id")
    ChoiceValueResponse toChoiceValueResponse(ChoiceValue choiceValue);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "choice", source = "choice")
    ChoiceValue toChoiceValue(Choice choice, ChoiceValueCreationRequest choiceValueCreationRequest);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "choice", source = "choice")
    void updateChoiceValue(@MappingTarget ChoiceValue choiceValue, Choice choice, ChoiceValueUpdateRequest choiceValueUpdateRequest);
}
