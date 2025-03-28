import axiosInstance from "./axiosConfig";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  categoryId: number;
  categoryName: string;
}

export const createProductAsync = async (
  productData: Product
): Promise<Product> => {
  try {
    const response = await axiosInstance.post("products", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product", error);
    throw error;
  }
};

export const getAllProductsAsync = async (): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get("products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

export const getProductByIdAsync = async (id: number): Promise<Product> => {
  try {
    const response = await axiosInstance.get(`products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID", error);
    throw error;
  }
};

export const updateProductAsync = async (
  id: number,
  productData: Product
): Promise<Product> => {
  try {
    const response = await axiosInstance.put(`products/${id}`, productData);
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
