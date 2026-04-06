import axios from "axios";
import { removeToken } from "../utils/token";

const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Only force logout on 401 for protected endpoints (not auth endpoints)
    const url = error.config?.url ?? "";
    const is401 = error.response?.status === 401;
    const isAuthEndpoint = url.includes("/auth/");

    if (is401 && !isAuthEndpoint) {
      removeToken();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
