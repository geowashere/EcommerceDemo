package com.example.demo.dto;


import com.example.demo.models.Role;

public class AuthResponseDto {
    private Long userId;
    private String firstName;
    private String lastName;
    private String token;
    private Role role;
    private String message;

    public AuthResponseDto(Long userId, String firstName, String lastName, String token, Role role, String message) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = token;
        this.role = role;
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
