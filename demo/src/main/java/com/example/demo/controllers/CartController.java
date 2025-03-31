package com.example.demo.controllers;

import com.example.demo.models.Cart;
import com.example.demo.services.CartService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/cart")
public class CartController {

    private final CartService cartService;
    private static final Logger logger = LoggerFactory.getLogger(CartController.class);

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    public Long createCart(@RequestParam Long userId) {
        logger.debug("Attempting to create cart for userId: {}", userId);
        Cart cart = cartService.createCart(userId);
        return cart.getId();
    }
}
