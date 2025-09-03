import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiClient } from "../libs/api-client";
import { getProductsKey } from "../queries/use-products";

export const addProductKey = ["add-product"];

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: addProductKey,
    mutationFn: (data) => addProduct(data),

    onMutate() {
      toast.dismiss();
      toast.loading("Adding product...");
    },

    onSuccess(newProduct) {
      toast.dismiss();
      toast.success("Product added successfully");

      queryClient.setQueryData(getProductsKey, (old) => {
        if (!old) return [newProduct];
        return [...old, newProduct];
      });

      navigate("/dashboard/products");
    },

    onError(error) {
      toast.dismiss();
      toast.error(`Could not add product! ${error.message}`);
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: getProductsKey });
    },
  });
};

export const addProduct = async (data) => {
  try {
    const response = await apiClient.post("/products", data, {
      withCredentials: true,
    });
    return response.data || response;
  } catch (error) {
    throw new Error(
      error.message || "Something went wrong please try again later",
    );
  }
};
