import axios from "axios";
import { imageBbKey } from "./constants";

export const uploadImageToImageBb = async (image) => {
  const imageBbUrl = "https://api.imgbb.com/1/upload";
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.post(
      `${imageBbUrl}?key=${imageBbKey}`,
      formData,
    );
    return response.data.data.url;
  } catch (error) {
    throw new Error(
      error.message || "Something went wrong, please try again later!",
    );
  }
};
