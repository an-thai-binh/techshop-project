package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.choice.ChoiceValueCreationRequest;
import com.example.techshop_api.dto.request.choice.ChoiceValueUpdateRequest;
import com.example.techshop_api.dto.response.choice.ChoiceValueResponse;
import com.example.techshop_api.entity.choice.ChoiceValue;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ChoiceValueMapper {
    ChoiceValue toChoiceValue (ChoiceValueCreationRequest choiceValueCreationRequest);
    ChoiceValueResponse toChoiceValueResponse (ChoiceValue choiceValue);
    void updateChoiceValue(@MappingTarget ChoiceValue choiceValue, ChoiceValueUpdateRequest choiceValueUpdateRequest);
}
