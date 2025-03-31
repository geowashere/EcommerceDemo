package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;

public class ProductIsInUserCartException extends ApiException{
    public ProductIsInUserCartException() {
        super("Cannot delete! Someone has added this product to their cart", HttpStatus.CONFLICT);
    }
}
