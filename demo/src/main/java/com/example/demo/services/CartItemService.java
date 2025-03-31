package com.example.demo.services;

import com.example.demo.dto.CreateCartItemDto;
import com.example.demo.dto.GetCartItemsDto;
import com.example.demo.models.Cart;
import com.example.demo.models.CartItem;
import com.example.demo.models.Product;
import com.example.demo.repositories.CartItemRepository;
import com.example.demo.repositories.CartRepository;
import com.example.demo.repositories.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartItemService {

    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public CartItemService(CartItemRepository cartItemRepository, CartRepository cartRepository, ProductRepository productRepository) {
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    public List<GetCartItemsDto> getCartItems(Long cartId) {
        Cart cart = cartRepository.findById(cartId).
                orElseThrow(() -> new EntityNotFoundException("Cart not found"));

        return cart.getItems().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private GetCartItemsDto convertToDto(CartItem cartItem) {
        Product product = cartItem.getProduct();
        return new GetCartItemsDto(
                cartItem.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                cartItem.getQuantity(),
                product.getCategory().getName()
        );
    }

    public void addCartItemToCart(CreateCartItemDto createCartItemDto) {
        Cart cart = cartRepository.findById(createCartItemDto.getCartId()).
                orElseThrow(() -> new EntityNotFoundException("Cart not found"));

        Product product = productRepository.findById(createCartItemDto.getProductId()).
                orElseThrow(() -> new EntityNotFoundException("product not found"));

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(createCartItemDto.getQuantity());

        cartItemRepository.save(cartItem);
    }

    public void removeCartItemFromCart(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
}
