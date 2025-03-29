"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { loginUser, registerUser } from "../api/authService";

export interface AuthContextType {
  token: string | null;
  isInitialized: boolean;
  role: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedRole = localStorage.getItem("auth_role");

    setToken(storedToken);
    setRole(storedRole);
    setIsInitialized(true);
  }, []);

  const login = (email: string, password: string) => {
    loginUser(email, password)
      .then((response) => {
        console.log("logging in, response: ", response);
        setToken(response.token);
        console.log("response.role: ", response?.role);
        setRole(response.role);
        localStorage.setItem("auth_token", response.token);
        localStorage.setItem("auth_role", response.role);
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const logout = () => {
    console.log("logging out");
    // setUser(null);
    // setToken(null);
    // localStorage.removeItem("auth_token");
  };

  const register = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    registerUser(firstName, lastName, email, password)
      .then((response) => {
        console.log("Registration successful:", response.data);
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  return (
    <AuthContext.Provider
      value={{ token, role, isInitialized, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
