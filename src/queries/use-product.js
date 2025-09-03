import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../libs/api-client";

export default function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        const response = await apiClient.get(`/products/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(
          error.message || "Something went wrong try again later",
        );
      }
    },
    enabled: !!id,
  });
}
