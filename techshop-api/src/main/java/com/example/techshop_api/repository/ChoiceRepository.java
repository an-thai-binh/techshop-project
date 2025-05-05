package com.example.techshop_api.repository;

import com.example.techshop_api.entity.choice.Choice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChoiceRepository extends JpaRepository<Choice, Long> {
    List<Choice> id(Long id);
}
