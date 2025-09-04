import { backendUrl } from "./constants";

export const apiClient = axios.create({
  baseURL: backendUrl,
});
