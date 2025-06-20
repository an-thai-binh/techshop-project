package com.example.techshop_api.controller.choice;

import com.example.techshop_api.dto.request.choice.ChoiceCreationRequest;
import com.example.techshop_api.dto.request.choice.ChoiceUpdateRequest;
import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.choice.ChoiceResponse;
import com.example.techshop_api.dto.response.choice.ChoiceWithValuesResponse;
import com.example.techshop_api.service.ChoiceService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/choice")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChoiceController {
    ChoiceService choiceService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Page<ChoiceResponse>>> index(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        ApiResponse<Page<ChoiceResponse>> apiResponse = choiceService.index(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/getByProduct")
    public ResponseEntity<ApiResponse<List<ChoiceWithValuesResponse>>> indexWithValuesByProductId(@RequestParam Long productId) {
        ApiResponse<List<ChoiceWithValuesResponse>> apiResponse = choiceService.indexWithValuesByProductId(productId);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ChoiceResponse>> show(@PathVariable Long id) {
        ApiResponse<ChoiceResponse> apiResponse = choiceService.show(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/showValues/{id}")
    public ResponseEntity<ApiResponse<ChoiceWithValuesResponse>> showWithValues(@PathVariable Long id) {
        ApiResponse<ChoiceWithValuesResponse> apiResponse = choiceService.showWithValues(id);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('product:create')")
    public ResponseEntity<ApiResponse<ChoiceResponse>> store(@RequestBody ChoiceCreationRequest request) {
        ApiResponse<ChoiceResponse> apiResponse = choiceService.store(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('product:update')")
    public ResponseEntity<ApiResponse<ChoiceResponse>> update(@PathVariable Long id, @RequestBody ChoiceUpdateRequest request) {
        ApiResponse<ChoiceResponse> apiResponse = choiceService.update(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('product:delete')")
    public ResponseEntity<ApiResponse<Void>> delete(@RequestParam Long choiceId, @RequestParam Long productId) {
        ApiResponse<Void> apiResponse = choiceService.destroy(choiceId, productId);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
