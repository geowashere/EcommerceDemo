import {
  CreateProductType,
  ProductType,
  UpdateProductType,
} from "../utils/types";
import { axiosInstance } from "./axiosConfig";

export const createProductAsync = async (
  productData: CreateProductType
): Promise<CreateProductType> => {
  try {
    const response = await axiosInstance.post("products", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product", error);
    throw error;
  }
};

export const getAllProductsAsync = async (): Promise<ProductType[]> => {
  try {
    const response = await axiosInstance.get("products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

export const getProductByIdAsync = async (id: number): Promise<ProductType> => {
  try {
    const response = await axiosInstance.get(`products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID", error);
    throw error;
  }
};

export const updateProductAsync = async (
  productData: UpdateProductType
): Promise<UpdateProductType> => {
  try {
    const response = await axiosInstance.put(
      `products/${productData.id}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};

export const deleteProductAsync = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`products/${id}`);
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
};

export const updateProductOrderAsync = async (
  productOrder: Array<{ id: number; position: number }>
) => {
  try {
    const response = await axiosInstance.put("/products/reorder", productOrder);
    return response.data;
  } catch (error) {
    console.error("Error updating category order:", error);
    throw error;
  }
};
