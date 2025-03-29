import { axiosInstance } from "./axiosConfig";
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });

    console.log("login response: ", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post("/register", {
      firstName,
      lastName,
      email,
      password,
    });

    console.log("register response: ", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};
