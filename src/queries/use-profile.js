import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../libs/api-client";

export const profileKey = ["profile"];

export const useProfile = () => {
  return useQuery({
    queryKey: profileKey,
    queryFn: fetchProfile,
    refetchOnWindowFocus: true,
    refetchInterval: 60 * 1000,
    throwOnError(err, query) {
      query.setData(null);
      return false;
    },
  });
};

export const fetchProfile = async () => {
  try {
    const response = await apiClient.get("/users/profile", {
      withCredentials: true,
    });
    return response.data.user;
  } catch (error) {
    throw new Error(error.message || "Something went wrong, try again later!");
  }
};
