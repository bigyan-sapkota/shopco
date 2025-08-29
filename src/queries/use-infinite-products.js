import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "../libs/api-client";

export const getProductsKey = ["get-products"];

export const useInfiniteProducts = (filters = {}) => {
  return useInfiniteQuery({
    queryKey: [...getProductsKey, filters],
    queryFn: ({ pageParam }) =>
      fetchProducts({ ...filters, cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.cursor || null;
    },
  });
};

const fetchProducts = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        queryParams.append(key, value);
      }
    });

    const response = await apiClient.get(`/products?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong! try again later.");
  }
};
