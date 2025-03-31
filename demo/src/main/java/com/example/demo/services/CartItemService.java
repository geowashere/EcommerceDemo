package com.example.demo.services;

import com.example.demo.dto.CreateCartItemDto;
import com.example.demo.dto.GetCartItemsDto;
import com.example.demo.models.Cart;
import com.example.demo.models.CartItem;
import com.example.demo.models.Product;
import com.example.demo.repositories.CartItemRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartItemService {

    private final CartItemRepository cartItemRepository;
    private final CartService cartService;
    private final ProductService productService;

    public CartItemService(CartItemRepository cartItemRepository, CartService cartService, ProductService productService) {
        this.cartItemRepository = cartItemRepository;
        this.cartService = cartService;
        this.productService = productService;
    }

    public List<GetCartItemsDto> getCartItems(Long cartId) {
        Cart cart = cartService.getCartById(cartId).
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
        Cart cart = cartService.getCartById(createCartItemDto.getCartId()).
                orElseThrow(() -> new EntityNotFoundException("Cart not found"));

        Product product = productService.getProductById(createCartItemDto.getProductId());

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
