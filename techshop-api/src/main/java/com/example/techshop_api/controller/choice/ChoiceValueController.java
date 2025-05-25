package com.example.techshop_api.controller.choice;

import com.example.techshop_api.dto.request.choice.ChoiceValueCreationRequest;
import com.example.techshop_api.dto.request.choice.ChoiceValueUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.choice.ChoiceValueResponse;
import com.example.techshop_api.service.ChoiceValueService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/choiceValue")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChoiceValueController {
    ChoiceValueService choiceValueService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ChoiceValueResponse>> show(@PathVariable Long id) {
        ApiResponse<ChoiceValueResponse> apiResponse = choiceValueService.show(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ChoiceValueResponse>> store(@RequestBody ChoiceValueCreationRequest request) {
        ApiResponse<ChoiceValueResponse> apiResponse = choiceValueService.store(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ChoiceValueResponse>> store(@PathVariable Long id, @RequestBody ChoiceValueUpdateRequest request) {
        ApiResponse<ChoiceValueResponse> apiResponse = choiceValueService.update(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        ApiResponse<Void> apiResponse = choiceValueService.destroy(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
