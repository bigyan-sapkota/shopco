import { useMutation } from "@tanstack/react-query";
import { apiClient } from "./src/libs/api-client";

export const registerUserKey = ["register-user"];

export default function useRegister() {
  return useMutation({
    mutationKey: registerUserKey,
    mutationFn: (data) => registerUser(data),
  });
}

const registerUser = async (data) => {
  try {
    const response = await apiClient.post("/auth/register", data);
    return response.data.user;
  } catch (error) {
    console.log(error);
  }
};
