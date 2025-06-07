package com.example.techshop_api.repository;

import com.example.techshop_api.entity.user.RevocatedToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RevocatedTokenRepository extends JpaRepository<RevocatedToken, String> {
}