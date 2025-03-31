package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;

public class CategoryIsNotEmptyException extends ApiException {
    public CategoryIsNotEmptyException() {
        super("Category is not empty", HttpStatus.CONFLICT);
    }
}
