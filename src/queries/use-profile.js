import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../libs/api-client";

export const profileKey = ["profile"];

export const useProfile = () => {
  return useQuery({
    queryKey: profileKey,
    queryFn: fetchProfile,
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
    throwOnError(err, query) {
      query.setData(null);
      return false;
    },
  });
};

export const fetchProfile = async () => {
  const { data } = await apiClient.get("/users/profile", {
    withCredentials: true,
  });

  return data.user;
};
