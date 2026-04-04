import api from "../../api/axiosInstance";

export const getCart = () => api.get("/cart");
export const addToCart=(id)=>api.post("/cart", {
  productId: id,
  quantity: 1,
});
export const removeItem = (id) => api.delete(`/cart/${id}`);
export const placeOrder = () => api.post("/orders");