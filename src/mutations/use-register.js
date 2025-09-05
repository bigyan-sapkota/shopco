import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "../libs/api-client";
import { uploadImageToImageBb } from "../libs/utils";
import { getQueryClient } from "../libs/query-client";
import { profileKey } from "../queries/use-profile";
import { useNavigate } from "react-router-dom";

export const registerUserKey = ["register-user"];

export const useRegisterUser = () => {
  const queryClient = getQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: registerUserKey,
    mutationFn: (data) => registerUser(data),

    onMutate() {
      toast.dismiss();
      toast.loading("Registering user...");
    },

    onSuccess(data) {
      toast.dismiss();
      toast.success("User registered successfully!");
      queryClient.setQueryData(profileKey, data);
      navigate("/");
    },

    onError(error) {
      toast.dismiss();
      toast.error(`Could not register user! ${error.message}`);
    },
  });
};

export const registerUser = async (data) => {
  try {
    let imageUrl = null;

    if (data.image) {
      imageUrl = await uploadImageToImageBb(data.image);
    }

    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      image: imageUrl,
    };

    const response = await apiClient.post("/auth/register", payload, {
      withCredentials: true,
    });
    return response.data.user;
  } catch (error) {
    throw new Error(error.message || "Something went wrong, try again later.");
  }
};
