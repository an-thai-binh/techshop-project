package com.example.techshop_api.service;

import com.example.techshop_api.dto.request.choice.ChoiceCreationRequest;
import com.example.techshop_api.dto.request.choice.ChoiceUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.choice.ChoiceResponse;
import com.example.techshop_api.entity.choice.Choice;
import com.example.techshop_api.enums.ErrorCode;
import com.example.techshop_api.exception.AppException;
import com.example.techshop_api.mapper.ChoiceMapper;
import com.example.techshop_api.repository.ChoiceRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChoiceService {
    ChoiceRepository choiceRepository;
    ChoiceMapper choiceMapper;

    public ApiResponse<Page<ChoiceResponse>> index (Pageable pageable){
        Page<Choice> choices = choiceRepository.findAll(pageable);
        Page<ChoiceResponse> choiceResponses = choices.map(choiceMapper::toChoiceResponse);
        return ApiResponse.<Page<ChoiceResponse>>builder().success(true).data(choiceResponses).build();
    }
    public ApiResponse<ChoiceResponse> show(Long id){
        Choice choice = choiceRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.CHOICE_NOT_FOUND));
        ChoiceResponse choiceResponse = choiceMapper.toChoiceResponse(choice);
        return ApiResponse.<ChoiceResponse>builder().success(true).data(choiceResponse).build();
    }
    public ApiResponse<ChoiceResponse> store(ChoiceCreationRequest choiceCreationRequest){
        Choice choice = choiceMapper.toChoice(choiceCreationRequest);
        try {
            choice = choiceRepository.save(choice);
        }catch (Exception e){
            log.error(e.getMessage());
            throw  new AppException(ErrorCode.INSERT_FAILED);
        }
        ChoiceResponse choiceResponse = choiceMapper.toChoiceResponse(choice);
        return ApiResponse.<ChoiceResponse>builder().success(true).data(choiceResponse).build();
    }
    public ApiResponse<ChoiceResponse> update(Long id, ChoiceUpdateRequest choiceUpdateRequest){
        Choice choice = choiceRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.UPDATE_FAILED));
        choiceMapper.updateChoice(choice, choiceUpdateRequest);
        try {
            choice = choiceRepository.save(choice);
        }catch (Exception e){
            log.error(e.getMessage());
            throw new AppException(ErrorCode.UPDATE_FAILED);
        }
        ChoiceResponse choiceResponse = choiceMapper.toChoiceResponse(choice);
        return ApiResponse.<ChoiceResponse>builder().success(true).data(choiceResponse).build();
    }
    public ApiResponse<Void> destroy(Long id){
        try {
            choiceRepository.deleteById(id);
        }catch (Exception e){
            log.error(e.getMessage());
            throw new AppException(ErrorCode.DELETE_FAILED);
        }
        return ApiResponse.<Void>builder().success(true).message("Delete Sucessful").build();
    }
}
