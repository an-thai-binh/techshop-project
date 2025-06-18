package com.example.techshop_api.service;

import com.example.techshop_api.dto.response.ApiResponse;
import com.example.techshop_api.dto.response.statistic.CountEntitiesResponse;
import com.example.techshop_api.entity.category.Category;
import com.example.techshop_api.repository.CategoryRepository;
import com.example.techshop_api.repository.ImageRepository;
import com.example.techshop_api.repository.OrderRepository;
import com.example.techshop_api.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StatisticService {
    CategoryRepository categoryRepository;
    ProductRepository productRepository;
    ImageRepository imageRepository;
    OrderRepository orderRepository;

    public ApiResponse<CountEntitiesResponse> countEntities() {
        CountEntitiesResponse countEntitiesResponse = CountEntitiesResponse.builder()
                .categoryCount(categoryRepository.count())
                .productCount(productRepository.count())
                .imageCount(imageRepository.count())
                .pendingOrderCount(orderRepository.countByStatus(("PENDING")))
                .deliveringOrderCount(orderRepository.countByStatus(("DELIVERING")))
                .successOrderCount(orderRepository.countByStatus(("SUCCESS")))
                .build();
        return ApiResponse.<CountEntitiesResponse>builder()
                .success(true)
                .data(countEntitiesResponse)
                .build();
    }
}
