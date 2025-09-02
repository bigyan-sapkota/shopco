import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../libs/api-client";

export const loginKey = ["login"];

export default function useLogin() {
  return useMutation({
    mutationKey: loginKey,
    mutationFn: (data) => loginUser(data),
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
