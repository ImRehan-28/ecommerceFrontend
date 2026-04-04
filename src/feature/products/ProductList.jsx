import { useEffect, useState } from "react";
import { getProducts } from "./productService";
import ProductCard from "../../components/productCard";
import { addToCart } from "../cart/cartService";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("search");

  useEffect(() => {
    getProducts(search).then((res) => {
      console.log(res.data);
      setProducts(res.data.content); // ✅ correct
    });
  }, [search]);

  const handleAdd = async (id) => {
    await addToCart(id);
    toast.success("Added to cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={handleAdd} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
