package com.example.demo.services;

import com.example.demo.models.Cart;
import com.example.demo.models.User;
import com.example.demo.repositories.CartRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final AuthService authService;

    public CartService(CartRepository cartRepository, AuthService authService) {
        this.cartRepository = cartRepository;
        this.authService = authService;
    }

    public Optional<Cart> getCartById(Long id) {
        return cartRepository.findById(id);
    }
    public Cart createCart(Long userId) {
        Optional<Cart> existingCart = cartRepository.findByUserId(userId);

        if (existingCart.isPresent()) {
            return existingCart.get();
        }

        User user = authService.getUserById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Cart cart = new Cart();
        cart.setUser(user);

        return cartRepository.save(cart);
    }
}
