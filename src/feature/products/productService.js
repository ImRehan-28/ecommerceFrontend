import api from "../../api/axiosInstance";

export const getProducts = (search) => {
  if (search) {
    return api.get(`/products?search=${search}`);
  }
  return api.get("/products");
};
export const getProductById = (id) => api.get(`/products/${id}`);