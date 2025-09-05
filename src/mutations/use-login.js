import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../libs/api-client";
import { toast } from "sonner";
import { profileKey } from "../queries/use-profile";
import { getQueryClient } from "../libs/query-client";

export const loginKey = ["login"];

export default function useLogin() {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: loginKey,
    mutationFn: (data) => loginUser(data),

    onMutate() {
      toast.dismiss();
      toast.loading("Logging in...");
    },

    onSuccess(data) {
      toast.dismiss();
      toast.success("Logged in successfully!");
      queryClient.setQueryData(profileKey, data);
    },

    onError(error) {
      toast.dismiss();
      toast.error(`Could not login user! ${error.message}`);
    },
  });
}

export const loginUser = async (data) => {
  try {
    const response = await apiClient.post("/auth/login", data, {
      withCredentials: true,
    });
    return response.data.user;
  } catch (error) {
    throw new Error(
      error.message || "Something went wrong please try again later",
    );
  }
};
