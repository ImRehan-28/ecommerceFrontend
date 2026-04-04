import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { CartProvider } from "./feature/cart/cartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <AuthProvider>
    <CartProvider>
    <App />
    </CartProvider>
    <ToastContainer />
  </AuthProvider>
);