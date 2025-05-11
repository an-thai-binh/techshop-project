package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.choice.ChoiceUpdateRequest;
import com.example.techshop_api.dto.request.choice.ChoiceValueCreationRequest;
import com.example.techshop_api.dto.request.choice.ChoiceValueUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.choice.ChoiceValueResponse;
import com.example.techshop_api.entity.choice.ChoiceValue;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.ChoiceValueMapper;
import com.example.techshop_api.repository.ChoiceValueRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChoiceValueService {
    ChoiceValueRepository choiceValueRepository;
    ChoiceValueMapper choiceValueMapper;

    public ApiResponse<Page<ChoiceValueResponse>> index(Pageable pageable){
        Page<ChoiceValue> choiceValues = choiceValueRepository.findAll(pageable);
        Page<ChoiceValueResponse> choiceValueResponses = choiceValues.map(choiceValueMapper::toChoiceValueResponse);
        return ApiResponse.<Page<ChoiceValueResponse>>builder().success(true).data(choiceValueResponses).build();
    }

    public ApiResponse<ChoiceValueResponse> show(Long id){
        ChoiceValue choiceValue = choiceValueRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CHOICE_VALUE_NOT_FOUND));
        ChoiceValueResponse choiceValueResponse = choiceValueMapper.toChoiceValueResponse(choiceValue);
        return ApiResponse.<ChoiceValueResponse>builder().success(true).data(choiceValueResponse).build();
    }

    public ApiResponse<ChoiceValueResponse> store(ChoiceValueCreationRequest choiceValueCreationRequest){
        ChoiceValue choiceValue = choiceValueMapper.toChoiceValue(choiceValueCreationRequest);
        try {
            choiceValue = choiceValueRepository.save(choiceValue);
        }catch (Exception e){
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INSERT_FAILED);
        }
        ChoiceValueResponse choiceValueResponse = choiceValueMapper.toChoiceValueResponse(choiceValue);
        return ApiResponse.<ChoiceValueResponse>builder().success(true).data(choiceValueResponse).build();
    }

    public ApiResponse<ChoiceValueResponse> update(Long id, ChoiceValueUpdateRequest choiceValueUpdateRequest){
        ChoiceValue choiceValue = choiceValueRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CHOICE_VALUE_NOT_FOUND));
        choiceValueMapper.updateChoiceValue(choiceValue, choiceValueUpdateRequest);
        try {
            choiceValue = choiceValueRepository.save(choiceValue);
        }catch (Exception e){
            log.error(e.getMessage());
            throw new AppException(ErrorCode.UPDATE_FAILED);
        }
        ChoiceValueResponse choiceValueResponse = choiceValueMapper.toChoiceValueResponse(choiceValue);
        return ApiResponse.<ChoiceValueResponse>builder().success(true).data(choiceValueResponse).build();
    }

    public ApiResponse<Void> destroy(Long id){
        try {
            choiceValueRepository.deleteById(id);
        }catch (Exception e){
            log.error(e.getMessage());
            throw new AppException(ErrorCode.DELETE_FAILED);
        }
        return ApiResponse.<Void>builder().success(true).message("Delete Successful").build();
    }

}
