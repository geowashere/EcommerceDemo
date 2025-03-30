package com.example.demo.controllers;

import com.example.demo.dto.*;
import com.example.demo.models.Category;
import com.example.demo.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> getCategories() {
        return categoryService.getCategories();
    }

    @PutMapping("/reorder")
    public ResponseEntity<Void> reorderCategories(
            @RequestBody List<CategoryPositionDto> newOrder) {
        categoryService.reorderCategories(newOrder);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<Void> createCategory(@RequestBody CreateCategoryDto createCategoryDto) {
        categoryService.createCategory(createCategoryDto);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateCategory(
            @RequestBody UpdateCategoryDto updateCategoryDto) {
        categoryService.updateCategoryById(updateCategoryDto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategoryById(id);
        return ResponseEntity.noContent().build();
    }
}
