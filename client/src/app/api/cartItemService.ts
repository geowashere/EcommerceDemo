import { CreateCartItemType } from "../utils/types";
import { axiosInstanceWithAuth } from "./axiosConfig";

export const addCartItemToCart = async (cartItemData: CreateCartItemType) => {
  try {
    const response = await axiosInstanceWithAuth.post(
      "cart-item",
      cartItemData
    );
    return response;
  } catch (error) {
    console.error("error adding item to cart");
    throw error;
  }
};

export const removeCartItemFromCartAsync = async (cartItemId: number) => {
  try {
    const response = await axiosInstanceWithAuth.delete(
      `cart-item/${cartItemId}`
    );
    return response;
  } catch (error) {
    console.error("error removing item from cart");
    throw error;
  }
};

export const getCartItemsAsync = async (cartId: number) => {
  try {
    const response = await axiosInstanceWithAuth.get("cart-item/items", {
      params: {
        cartId,
      },
    });
    return response;
  } catch (error) {
    console.error("error getting cart items ");
    throw error;
  }
};
