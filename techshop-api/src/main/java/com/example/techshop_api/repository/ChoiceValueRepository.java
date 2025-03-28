package com.example.techshop_api.repository;

import com.example.techshop_api.entity.choice.ChoiceValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChoiceValueRepository extends JpaRepository<ChoiceValue, Integer> {
}
