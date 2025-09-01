import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { apiClient } from "../libs/api-client";

const imagebbKey = "36d09bc08fc2eedb94e214323ddbfc20";

export const registerUser = async (data) => {
  try {
    let imageUrl = null;

    // upload image to imgbb if provided
    if (data.image) {
      const formData = new FormData();
      formData.append("image", data.image);

      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imagebbKey}`,
        formData,
      );

      imageUrl = uploadRes.data.data.url;
      console.log(uploadRes.data.url);
      console.log(imageUrl);
    }

    // send data to backend with image url instead of file
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      image: imageUrl,
    };

    console.log("Payload : ", payload);

    const response = await apiClient.post("/auth/register", payload);
    return response.data || response;
  } catch (error) {
    throw new Error(error.message || "Something went wrong, try again later.");
  }
};

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["register-user"],
    mutationFn: (data) => registerUser(data),

    onMutate() {
      toast.dismiss();
      toast.loading("Registering user...");
    },

    onSuccess() {
      toast.dismiss();
      toast.success("User registered successfully!");
    },

    onError(error) {
      toast.dismiss();
      toast.error(`Could not register user! ${error.message}`);
    },
  });
};
