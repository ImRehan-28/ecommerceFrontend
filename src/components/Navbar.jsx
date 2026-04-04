import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../feature/cart/cartContext";

const Navbar = () => {
  const { logout, role, user, isAuthenticated } = useAuth();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const displayName = user?.split("@")[0];
  const { cart } = useCart();
  console.log({ isAuthenticated, role, user });
  const handleSearch = () => {
    navigate(`/?search=${search}`);
  };

  const handleLogout = () => {
    logout(); // remove token
    navigate("/login"); // redirect
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold tracking-wide cursor-pointer">ShopX</h1>

      <div>
        <Link to="/" className="hover:text-gray-300 transition">
          Home
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-1/3 bg-white rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full px-3 py-2 text-black outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 px-4 py-2 hover:bg-blue-700 transition"
        >
          🔍
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 text-sm font-medium">
        {isAuthenticated && (
          <Link to="/cart" className="hover:text-gray-300 transition">
            🛒 Cart
          </Link>
        )}

        {role === "ROLE_ADMIN" && <Link to="/admin/products">Admin</Link>}
      </div>

      {/* Logout */}
      {isAuthenticated ? (
        <div className="relative">
          {/* Avatar + Name */}
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer"
          >
            {/* Avatar */}
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold uppercase">
              {displayName ? displayName.charAt(0) : "U"}
            </div>

            {/* Name */}
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
              <p className="px-4 py-2 border-b font-medium">{displayName}</p>

              {/* Cart inside dropdown */}
              <Link
                to="/cart"
                className="relative hover:text-gray-300 transition"
              >
                🛒 Cart
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-green-500 px-3 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
