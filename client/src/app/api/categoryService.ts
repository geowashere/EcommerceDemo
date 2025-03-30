import { CreateCategoryType, UpdateCategoryType } from "../utils/types";
import { axiosInstance } from "./axiosConfig";

export const getCategoriesAsync = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories", error);
    throw error;
  }
};

export const createCategoryAsync = async (
  categoryData: CreateCategoryType
): Promise<CreateCategoryType> => {
  try {
    const response = await axiosInstance.post("/categories", categoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating category", error);
    throw error;
  }
};

export const updateCategoryByIdAsync = async (
  categoryData: UpdateCategoryType
): Promise<UpdateCategoryType> => {
  try {
    const response = await axiosInstance.put(
      `/categories/${categoryData.id}`,
      categoryData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating category", error);
    throw error;
  }
};

export const deleteCategoryAsync = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/categories/${id}`);
  } catch (error) {
    console.error("Error creating category", error);
    throw error;
  }
};

export const updateCategoryOrderAsync = async (
  categoryOrder: Array<{ id: number; position: number }>
) => {
  try {
    const response = await axiosInstance.put(
      "/categories/reorder",
      categoryOrder
    );
    return response.data;
  } catch (error) {
    console.error("Error updating category order:", error);
    throw error;
  }
};
