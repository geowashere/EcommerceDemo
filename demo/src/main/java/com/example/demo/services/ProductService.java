package com.example.demo.services;

import com.example.demo.dto.CreateProductDto;
import com.example.demo.dto.GetProductsDto;
import com.example.demo.dto.ProductPositionDto;
import com.example.demo.dto.UpdateProductDto;
import com.example.demo.exceptions.ProductIsInUserCartException;
import com.example.demo.models.Category;
import com.example.demo.models.Product;
import com.example.demo.repositories.CartItemRepository;
import com.example.demo.repositories.CategoryRepository;
import com.example.demo.repositories.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CartItemRepository cartItemRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, CartItemRepository cartItemRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public List<GetProductsDto> getAllProducts() {
        List<Product> products = productRepository.findAllByOrderByPositionAsc();
        return products.stream()
                .map(product -> new GetProductsDto(
                        product.getId(),
                        product.getName(),
                        product.getPrice(),
                        product.getDescription(),
                        product.getPosition(),
                        product.getCategory().getId(),
                        product.getCategory().getName()))
                .collect(Collectors.toList());
    }

    public Product getProductById(Long productId) {
        return productRepository.findById(productId).
                orElseThrow(() -> new EntityNotFoundException("Product not found"));
    }

    public void deleteProductById(Long id) {

        boolean isAddedToCart = cartItemRepository.existsByProductId(id);

        if(isAddedToCart) {
            throw new ProductIsInUserCartException();
        }

        productRepository.deleteById(id);
    }
    @Transactional
    public void updateProductById(UpdateProductDto updateProductDto) {
        Product product = productRepository.findById(updateProductDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + updateProductDto.getId()));

            Category category = categoryRepository.findById(updateProductDto.getCategoryId()).
                    orElseThrow(() -> new EntityNotFoundException("Category not found"));
            product.setCategory(category);
            product.setName(updateProductDto.getName());
            product.setDescription(updateProductDto.getDescription());
            product.setPrice(updateProductDto.getPrice());
        }

    @Transactional
    public Product createProduct(CreateProductDto createProductDto) {

    int newPosition = productRepository.findMaxPosition() + 1;

    Product product = new Product();
        product.setName(createProductDto.getName());
        product.setPrice(createProductDto.getPrice());
        product.setDescription(createProductDto.getDescription());
        product.setPosition(newPosition);
        Category cat = categoryRepository.findById(createProductDto.getCategoryId()).
                orElseThrow(() -> new EntityNotFoundException("Category not found"));
        product.setCategory(cat);

        return productRepository.save(product);
    }

    @Transactional
    public void reorderProducts(List<ProductPositionDto> newOrder) {
        Map<Long, Integer> currentPositions = productRepository.findAll()
                .stream()
                .collect(Collectors.toMap(Product::getId, Product::getPosition));

        productRepository.clearAllPositions();

        for (ProductPositionDto dto : newOrder) {
            productRepository.updatePosition(dto.getId(), dto.getPosition());
        }
    }
}