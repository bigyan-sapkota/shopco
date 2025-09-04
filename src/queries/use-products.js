import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../libs/api-client";

export const getProductsKey = ["get-products"];

export const useProducts = (cursor, search, filters) => {
  return useQuery({
    queryKey: [...getProductsKey, cursor, search, filters],
    queryFn: () => fetchProducts(cursor, search, filters),
    keepPreviousData: true,
  });
};

const fetchProducts = async (cursor, search, filters) => {
  try {
    const params = {
      cursor: cursor || undefined,
      limit: 20,
      ...filters,
    };

    if (search) {
      params.q = search;
    }

    Object.keys(params).forEach((key) => {
      if (params[key] === undefined || params[key] === "") {
        delete params[key];
      }
    });

    const response = await apiClient.get("/products", { params });
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong! try again later.");
  }
};
