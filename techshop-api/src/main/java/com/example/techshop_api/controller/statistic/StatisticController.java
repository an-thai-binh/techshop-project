package com.example.techshop_api.controller.statistic;

import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.statistic.CountEntitiesResponse;
import com.example.techshop_api.service.StatisticService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/statistic")
@RequiredArgsConstructor()
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StatisticController {
    StatisticService statisticService;

    @GetMapping("/countEntities")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CountEntitiesResponse>> countEntities() {
        ApiResponse<CountEntitiesResponse> apiResponse = statisticService.countEntities();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
