package com.example.techshop_api.dto.request.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderCreationRequest {
    @NotNull
    Long userId;
    @NotBlank(message="Tên không được để trống")
    String orderName;
    @NotBlank(message="Địa chỉ không được để trống")
    String orderAddress;
    @Email(message = "Email không hợp lệ")
    String orderEmail;
    @Pattern(regexp = "^[0-9]{10,15}$", message = "Số điện thoại không hợp lệ")
    String orderPhoneNumber;
    @NotEmpty(message = "Chi tiết đơn hàng không hợp lệ")
    List<@Valid OrderItemCreationRequest> orderItems;
}
