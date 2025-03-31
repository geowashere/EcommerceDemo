package com.example.demo.controllers;

import com.example.demo.dto.CreateCartItemDto;
import com.example.demo.dto.GetCartItemsDto;
import com.example.demo.models.CartItem;
import com.example.demo.services.CartItemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth/cart-item")
public class CartItemController {

    private final CartItemService cartItemService;
    private static final Logger logger = LoggerFactory.getLogger(CartItemController.class);
    public CartItemController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @PostMapping
    public void addCartItemToCart(@RequestBody CreateCartItemDto createCartItemDto) {
        logger.debug("Received cart item creation request: {}", createCartItemDto.getCartId());
        logger.debug("Received cart item creation request: {}", createCartItemDto.getQuantity());
        logger.debug("Received cart item creation request: {}", createCartItemDto.getProductId());
        cartItemService.addCartItemToCart(createCartItemDto);
    }

    @DeleteMapping("/{cartItemId}")
    public void removeCartItemFromCart(@PathVariable Long cartItemId) {
        logger.debug("Received cart item deletion request: {}", cartItemId);

        cartItemService.removeCartItemFromCart(cartItemId);
    }

    @GetMapping("/items")
    public List<GetCartItemsDto> getCartItems(@RequestParam Long cartId) {
        return cartItemService.getCartItems(cartId);
    }

}
