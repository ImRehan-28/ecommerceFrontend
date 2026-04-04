import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { registerApi } from "../auth/authService";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("clicked");

  try {
    console.log("before register");

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    const res1 = await registerApi(payload);

    console.log("after register", res1);

    const res2 = await login({
      email: data.email,
      password: data.password,
    });

    console.log("after login", res2);

    navigate("/");
  } catch (err) {
    console.log("ERROR:", err);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account 🚀
        </h2>

        {/* Name */}
        {/* First Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            placeholder="Enter first name"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Enter last name"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Button */}
        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          Register
        </button>

        {/* Login Redirect */}
        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
