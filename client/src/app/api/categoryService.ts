import axiosInstance from "./axiosConfig";

export interface Category {
  id: number;
  name: string;
  description: string;
}

export const getCategoriesAsync = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories", error);
    throw error;
  }
};
