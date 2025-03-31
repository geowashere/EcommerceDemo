import { LoginResponse } from "../utils/types";
import { axiosInstance } from "./axiosConfig";
export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post<LoginResponse>("/login", {
    email,
    password,
  });
  console.log("login response: ", response);
  return response.data;
};

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const response = await axiosInstance.post("/register", {
    firstName,
    lastName,
    email,
    password,
  });
  console.log("register response: ", response);
  return response.data;
};
