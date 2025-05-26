package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.choice.ChoiceValueCreationRequest;
import com.example.techshop_api.dto.request.choice.ChoiceValueUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.choice.ChoiceValueResponse;
import com.example.techshop_api.entity.choice.Choice;
import com.example.techshop_api.entity.choice.ChoiceValue;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.ChoiceValueMapper;
import com.example.techshop_api.repository.ChoiceRepository;
import com.example.techshop_api.repository.ChoiceValueRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChoiceValueService {
    ChoiceValueRepository choiceValueRepository;
    ChoiceRepository choiceRepository;
    ChoiceValueMapper choiceValueMapper;

    public ApiResponse<ChoiceValueResponse> show(Long id) {
        ChoiceValue choiceValue = choiceValueRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CHOICE_VALUE_NOT_FOUND));
        ChoiceValueResponse choiceValueResponse = choiceValueMapper.toChoiceValueResponse(choiceValue);
        return ApiResponse.<ChoiceValueResponse>builder()
                .success(true)
                .data(choiceValueResponse)
                .build();
    }

    @Transactional
    public ApiResponse<ChoiceValueResponse> store(ChoiceValueCreationRequest request) {
        Choice choice = choiceRepository.findById(request.getChoiceId()).orElseThrow(() -> new AppException(ErrorCode.CHOICE_NOT_FOUND));
        ChoiceValue choiceValue = choiceValueMapper.toChoiceValue(choice, request);
        try {
            choiceValue = choiceValueRepository.save(choiceValue);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.INSERT_FAILED);
        }
        ChoiceValueResponse choiceValueResponse = choiceValueMapper.toChoiceValueResponse(choiceValue);
        return ApiResponse.<ChoiceValueResponse>builder()
                .success(true)
                .data(choiceValueResponse)
                .build();
    }

    @Transactional
    public ApiResponse<ChoiceValueResponse> update(Long id, ChoiceValueUpdateRequest request) {
        ChoiceValue choiceValue = choiceValueRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CHOICE_VALUE_NOT_FOUND));
        Choice choice = choiceRepository.findById(request.getChoiceId()).orElseThrow(() -> new AppException(ErrorCode.CHOICE_NOT_FOUND));
        choiceValueMapper.updateChoiceValue(choiceValue, choice, request);
        try {
            choiceValue = choiceValueRepository.save(choiceValue);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.UPDATE_FAILED);
        }
        ChoiceValueResponse choiceValueResponse = choiceValueMapper.toChoiceValueResponse(choiceValue);
        return ApiResponse.<ChoiceValueResponse>builder()
                .success(true)
                .data(choiceValueResponse)
                .build();
    }

    public ApiResponse<Void> destroy(Long id) {
        try {
            choiceValueRepository.deleteById(id);
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
