package com.example.techshop_api.controller.choice;

import com.example.techshop_api.dto.request.choice.ChoiceCreationRequest;
import com.example.techshop_api.dto.request.choice.ChoiceUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.category.CategoryResponse;
import com.example.techshop_api.dto.response.choice.ChoiceResponse;
import com.example.techshop_api.service.ChoiceService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/choice")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChoiceController {
    ChoiceService choiceService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ChoiceResponse>>> index(@RequestParam int page, @RequestParam int size, @RequestParam(defaultValue = "id") String sort, @RequestParam(defaultValue = "desc") String direction){
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        ApiResponse<Page<ChoiceResponse>> apiResponse = choiceService.index(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ChoiceResponse>> show(@PathVariable Long id){
        ApiResponse<ChoiceResponse> apiResponse = choiceService.show(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ChoiceResponse>> insert(@RequestBody ChoiceCreationRequest request){
        ApiResponse<ChoiceResponse> apiResponse = choiceService.store(request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ChoiceResponse>> update(@PathVariable Long id, @RequestBody ChoiceUpdateRequest request){
        ApiResponse<ChoiceResponse> apiResponse = choiceService.update(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id){
        ApiResponse<Void> apiResponse = choiceService.destroy(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
