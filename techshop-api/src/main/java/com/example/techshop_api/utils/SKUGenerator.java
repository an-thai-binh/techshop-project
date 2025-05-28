package com.example.techshop_api.utils;

import com.example.techshop_api.entity.choice.ChoiceValue;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.StringJoiner;

@Component
public class SKUGenerator {
    public String generateSKU(Long productId, List<ChoiceValue> choiceValueList) {
        StringJoiner stringJoiner = new StringJoiner("_");
        stringJoiner.add(productId.toString());
        for (ChoiceValue choiceValue : choiceValueList) {
            stringJoiner.add(choiceValue.getSkuValue());
        }
        return stringJoiner.toString();
    }
}