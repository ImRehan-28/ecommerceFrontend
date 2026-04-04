import axios from "axios";
import { getToken, removeToken } from "../utils/token";
const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API}/api`, // ✅ ADD /api here
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ ONLY if token exists
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
