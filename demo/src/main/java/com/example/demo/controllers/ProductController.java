package com.example.demo.controllers;

import com.example.demo.dto.*;
import com.example.demo.models.Product;
import com.example.demo.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<GetProductsDto> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PostMapping
    public ResponseEntity<Void> createProduct(@RequestBody CreateProductDto createProductDto) {
        productService.createProduct(createProductDto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateProduct(
            @RequestBody UpdateProductDto updateProductDto) {
        productService.updateProductById(updateProductDto);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/reorder")
    public ResponseEntity<Void> reorderProducts(
            @RequestBody List<ProductPositionDto> newOrder) {
        productService.reorderProducts(newOrder);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.noContent().build();
    }
}
