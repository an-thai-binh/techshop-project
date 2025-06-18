package com.example.techshop_api.dto.response.statistic;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CountEntitiesResponse {
    long categoryCount;
    long productCount;
    long imageCount;
    long pendingOrderCount;
    long deliveringOrderCount;
    long successOrderCount;
}
