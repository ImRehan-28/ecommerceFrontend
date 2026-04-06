import api from "../../api/axiosInstance";

export const getProducts = (search, page = 0, size = 12) => {
  const params = new URLSearchParams({ page, size });
  if (search) params.set("search", search);
  return api.get(`/products?${params.toString()}`);
};
export const getProductById = (id) => api.get(`/products/${id}`);