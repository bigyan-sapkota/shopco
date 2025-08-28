import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../libs/api-client";

export const getProductsKey = ["get-products"];

export const useProducts = () => {
  return useQuery({
    queryKey: getProductsKey,
    queryFn: fetchProducts,
  });
};

const fetchProducts = async () => {
  try {
    const response = await apiClient.get("/products");
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong! try again later.");
  }
};
