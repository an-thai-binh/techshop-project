package com.example.techshop_api.entity.option;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "choice")
public class Choice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String choiceName;

    @OneToMany(mappedBy = "choice", cascade = CascadeType.ALL, orphanRemoval = true)
    List<ChoiceValue> choiceValueList;
}
