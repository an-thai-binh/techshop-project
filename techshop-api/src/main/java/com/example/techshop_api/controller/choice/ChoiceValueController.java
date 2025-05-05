package com.example.techshop_api.controller.choice;

import com.example.techshop_api.dto.request.choice.ChoiceUpdateRequest;
import com.example.techshop_api.dto.request.choice.ChoiceValueCreationRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.choice.ChoiceValueResponse;
import com.example.techshop_api.service.ChoiceValueService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/choice-value")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChoiceValueController {
    ChoiceValueService choiceValueService;
    @GetMapping
    public ResponseEntity<ApiResponse<Page<ChoiceValueResponse>>> index(@RequestParam int page, @RequestParam int size, @RequestParam(defaultValue = "id") String sort, @RequestParam(defaultValue = "desc") String direction){
        Sort.Direction sortDirection = direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        ApiResponse<Page<ChoiceValueResponse>> apiResponse = choiceValueService.index(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<ApiResponse<ChoiceValueResponse>> show(@PathVariable(name ="id") Long id){
        ApiResponse<ChoiceValueResponse> apiResponse = choiceValueService.show(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @PostMapping
    public ResponseEntity<ApiResponse<ChoiceValueResponse>> insert(@RequestBody ChoiceValueCreationRequest request){
        ApiResponse<ChoiceValueResponse> apiResponse = choiceValueService.store(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ChoiceValueResponse>> update(@PathVariable Long id, @RequestBody ChoiceUpdateRequest request){
        ApiResponse<ChoiceValueResponse> apiResponse = choiceValueService.update(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id){
        ApiResponse<Void> apiResponse = choiceValueService.destroy(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
