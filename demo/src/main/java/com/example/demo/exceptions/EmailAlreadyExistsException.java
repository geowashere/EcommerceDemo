package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;

public class EmailAlreadyExistsException extends ApiException {
    public EmailAlreadyExistsException(String email) {
        super("Email " + email + " is already registered", HttpStatus.CONFLICT);
    }
}
