import { axiosInstanceWithAuth } from "./axiosConfig";

// for every new user
export const createCartAsync = async () => {
  try {
    const userId = localStorage.getItem("userId");
    console.log("userId: ", userId);

    const response = await axiosInstanceWithAuth.post("cart", null, {
      params: {
        userId: userId,
      },
    });
    return response;
  } catch (error) {
    console.log("error creating cart");
    throw error;
  }
};
