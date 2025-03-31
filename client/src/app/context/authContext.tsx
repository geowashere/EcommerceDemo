"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { loginUser, registerUser } from "../api/authService";
import { createCartAsync } from "../api/cartService";

export interface AuthContextType {
  token: string | null;
  userId: number | null;
  cartId: number | null;
  isInitialized: boolean;
  role: string | null;
  firstName: string | null;
  lastName: string | null;
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
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [cartId, setCartId] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedRole = localStorage.getItem("auth_role");
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
    const storedUserId = localStorage.getItem("userId");
    const storedCartId = localStorage.getItem("cartId");

    setToken(storedToken);
    setRole(storedRole);
    setUserId(Number(storedUserId));
    setFirstName(storedFirstName);
    setLastName(storedLastName);
    setIsInitialized(true);
    setCartId(Number(storedCartId));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);

      console.log("logging in, response: ", response);
      console.log("response.role: ", response?.role);

      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("auth_role", response.role);
      localStorage.setItem("firstName", response.firstName);
      localStorage.setItem("lastName", response.lastName);
      localStorage.setItem("userId", response.userId);

      //create cart for the user
      const cartResponse = await createCartAsync();
      console.log("cartResponse: ", cartResponse);
      localStorage.setItem("cartId", cartResponse.data);

      setToken(response.token);
      setRole(response.role);
      setUserId(Number(response.userId));
      setFirstName(response.firstName);
      setLastName(response.lastName);
      setIsInitialized(true);
      setCartId(Number(cartResponse.data));

      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const logout = () => {
    console.log("logging out");
    setToken(null);
    localStorage.removeItem("auth_token");
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
      value={{
        token,
        userId,
        cartId,
        role,
        firstName,
        lastName,
        isInitialized,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
