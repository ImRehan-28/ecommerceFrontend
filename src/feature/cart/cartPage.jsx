import { useEffect, useState } from "react";
import { getCart, removeItem, placeOrder } from "./cartService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const loadCart = async () => {
    console.log("LOAD CART CALLED"); // 👈 add this
    const res = await getCart();
    setCart(res.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadCart();
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow"
          >
            <div>
              <h2 className="font-semibold text-lg">{item.product.name}</h2>
              <p className="text-gray-500">₹{item.product.price}</p>
            </div>

            <button
              onClick={async () => {
                await removeItem(item.id);
                toast.success("Removed from cart");
                loadCart();
              }}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center">
        <p className="text-lg font-semibold">
          Total: ₹{cart.reduce((sum, item) => sum + item.product.price, 0)}
        </p>

        <button
          onClick={async () => {
            if (cart.length === 0) {
              toast.info("Select Product.");
              navigate("/"); // 👉 go to homepage
              return;
            }

            await placeOrder();
            toast.success("Order placed");
            loadCart();
          }}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Place Order
        </button>
      </div>

      {/* Empty State */}
      {cart.length === 0 && (
        <p className="text-center text-gray-500 mt-6">Your cart is empty 🛒</p>
      )}
    </div>
  );
};

export default CartPage;
