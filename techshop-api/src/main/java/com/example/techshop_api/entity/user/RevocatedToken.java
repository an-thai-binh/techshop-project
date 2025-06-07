package com.example.techshop_api.entity.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "revocated_token")
public class RevocatedToken {
    @Id
    String id;
    Date expiryTime;    // để kiểm tra nếu hết hạn thì remove trong DB
}