package com.example.demo.services;

import com.example.demo.dto.GetProductsDto;
import com.example.demo.models.Product;
import com.example.demo.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<GetProductsDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(product -> new GetProductsDto(
                        product.getId(),
                        product.getName(),
                        product.getPrice(),
                        product.getDescription(),
                        product.getCategory().getId(),
                        product.getCategory().getName()))
                .collect(Collectors.toList());
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }
}