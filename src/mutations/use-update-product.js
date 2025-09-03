import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiClient } from "../libs/api-client";
import { getQueryClient } from "../libs/query-client";
import { getProductsKey } from "../queries/use-products";

export const updateProductKey = (id) => ["update-product", id];

export const useUpdateProduct = (id) => {
  const queryClient = getQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: updateProductKey(id),
    mutationFn: (data) => updateProduct(data, id),

    onMutate() {
      toast.dismiss();
      toast.loading("Updating product...");
    },

    onSuccess(updatedProduct) {
      toast.success("Product updated successfully");

      queryClient.setQueryData(getProductsKey, (old) => {
        if (!old) return old;
        return old.map((p) => (p.id === id ? updatedProduct : p));
      });
    },

    onError(error) {
      toast.error(`Could not update product! ${error.message}`);
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: getProductsKey });
      navigate("/dashboard/products");
      toast.dismiss();
    },
  });
};

export const updateProduct = async (data, id) => {
  try {
    const res = await apiClient.put(`/products/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong try again later");
  }
};
