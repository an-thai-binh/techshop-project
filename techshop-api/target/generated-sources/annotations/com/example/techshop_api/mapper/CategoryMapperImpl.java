package com.example.techshop_api.mapper;

import com.example.techshop_api.dto.request.category.CategoryCreationRequest;
import com.example.techshop_api.dto.response.category.CategoryCreationResponse;
import com.example.techshop_api.entity.category.Category;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-03-25T15:45:15+0700",
    comments = "version: 1.6.3, compiler: javac, environment: Java 21.0.1 (Oracle Corporation)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Override
    public Category toCategory(CategoryCreationRequest categoryCreationRequest) {
        if ( categoryCreationRequest == null ) {
            return null;
        }

        Category.CategoryBuilder category = Category.builder();

        category.categoryName( categoryCreationRequest.getCategoryName() );

        return category.build();
    }

    @Override
    public CategoryCreationResponse toCategoryCreationResponse(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryCreationResponse.CategoryCreationResponseBuilder categoryCreationResponse = CategoryCreationResponse.builder();

        categoryCreationResponse.categoryName( category.getCategoryName() );

        return categoryCreationResponse.build();
    }
}
