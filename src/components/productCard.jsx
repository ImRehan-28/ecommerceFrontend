import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onAdd }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 overflow-hidden group">
      {/* Image */}
      <div
        className="overflow-hidden cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          className="w-full h-48 object-fit group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2
          onClick={() => navigate(`/product/${product.id}`)}
          className="font-semibold text-lg line-clamp-1 cursor-pointer hover:text-blue-600"
        >
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-2 mt-1">
          {product.description}
        </p>

        {/* Price + Rating */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-green-600 font-bold text-xl">₹{product.price}</p>
        </div>

        {/* Button */}
        <button
          onClick={() => onAdd(product.id)}
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-700 active:scale-95 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
