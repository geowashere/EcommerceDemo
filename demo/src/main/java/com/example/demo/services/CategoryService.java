package com.example.demo.services;

import com.example.demo.dto.CategoryPositionDto;
import com.example.demo.dto.CreateCategoryDto;
import com.example.demo.dto.UpdateCategoryDto;
import com.example.demo.dto.UpdateProductDto;
import com.example.demo.models.Category;
import com.example.demo.models.Product;
import com.example.demo.repositories.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getCategories() {
        return categoryRepository.findAllByOrderByPositionAsc();
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + id));
    }

    public void deleteCategoryById(Long id) {
        categoryRepository.deleteById(id);
    }

    @Transactional
    public Category createCategory(CreateCategoryDto createCategoryDto) {

        int newPosition = categoryRepository.findMaxPosition() + 1;

        Category category = new Category();
        category.setName(createCategoryDto.getName());
        category.setDescription(createCategoryDto.getDescription());
        category.setPosition(newPosition);

        return categoryRepository.save(category);
    }

    @Transactional
    public void updateCategoryById(UpdateCategoryDto updateCategoryDto) {
        Category category = categoryRepository.findById(updateCategoryDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + updateCategoryDto.getId()));

        category.setName(updateCategoryDto.getName());
        category.setDescription(updateCategoryDto.getDescription());
    }

    @Transactional
    public void reorderCategories(List<CategoryPositionDto> newOrder) {
        Map<Long, Integer> currentPositions = categoryRepository.findAll()
                .stream()
                .collect(Collectors.toMap(Category::getId, Category::getPosition));

        categoryRepository.clearAllPositions();

        for (CategoryPositionDto dto : newOrder) {
            categoryRepository.updatePosition(dto.getId(), dto.getPosition());
        }
    }

}
