package com.example.demo.dto;


import com.example.demo.models.Role;

public class AuthResponseDto {
    private String firstName;
    private String lastName;
    private String token;
    private Role role;

    public AuthResponseDto(String firstName, String lastName, String token, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = token;
        this.role = role;
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
}
