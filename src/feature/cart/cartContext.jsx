import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCart } from "./cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const refreshCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCart([]);
      return;
    }
    try {
      const res = await getCart();
      setCart(res.data ?? []);
    } catch {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
