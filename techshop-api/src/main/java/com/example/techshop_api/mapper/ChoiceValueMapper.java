package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.response.choice.ChoiceValueResponse;
import com.example.techshop_api.entity.choice.ChoiceValue;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ChoiceValueMapper {
    @Mapping(target = "choiceId", source = "choice.id")
    ChoiceValueResponse toChoiceValueResponse(ChoiceValue choiceValue);
}
