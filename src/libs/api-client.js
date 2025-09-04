import axios from "axios";
import { backendUrl } from "./constants";

export const apiClient = axios.create({
  baseURL: backendUrl,
});
