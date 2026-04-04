import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../feature/products/productService";
import { addToCart } from "../feature/cart/cartService";
import { toast } from "react-toastify";
import { useCart } from "../feature/cart/cartContext";
import { getProducts } from "../feature/products/productService";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    getProductById(id)
      .then((res) => setProduct(res.data))
      .catch(() => toast.error("Failed to load product"));
  }, [id]);

  useEffect(() => {
    getProducts().then((res) => {
      const allProducts = res.data.content || [];

      // remove current product
      const filtered = allProducts.filter((p) => p.id !== Number(id));

      // take 10 products
      setSuggestions(filtered.slice(0, 10));
    });
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* Image */}
      <div>
        <img src={product.image} />
      </div>

      {/* Details */}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="text-gray-600 mt-2">{product.description}</p>

        <p className="text-green-600 text-2xl font-bold mt-4">
          ₹{product.price}
        </p>

        <button
          onClick={async () => {
             addToCart(product);
            toast.success("Added to cart");
          }}
          className="bg-blue-600 text-white px-6 py-3 mt-6 rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
        <p>description: {product.description}</p>
        <p>category: {product.category}</p>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <h2 className="text-xl font-bold mb-4">You may also like</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {suggestions.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-3 hover:shadow-lg transition cursor-pointer"
              onClick={() => (window.location.href = `/product/${item.id}`)}
            >
              <img
                src={item.image}
                className="w-full h-32 object-cover rounded"
              />

              <p className="text-sm font-medium mt-2">{item.name}</p>

              <p className="text-green-600 font-bold text-sm">₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
