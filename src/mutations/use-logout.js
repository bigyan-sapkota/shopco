import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../libs/api-client";
import { getQueryClient } from "../libs/query-client";
import { profileKey } from "../queries/use-profile";

export const logoutKey = ["logout"];

export const logoutUser = async () => {
  try {
    const response = await apiClient.post("/auth/logout", null, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Logout failed, please try again");
  }
};

export default function useLogout() {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: logoutKey,
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.setQueryData(profileKey, null);
      queryClient.clear();
    },
  });
}
