import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  // ✅ Load products
  const loadProducts = async () => {
    try {
      const res = await api.get(`/products?search=${search}`);
      setProducts(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);
  useEffect(() => {
      loadProducts();
    }, [search]);


  // ✅ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add product (ADMIN API)
 const handleAdd = async (e) => {
  e.preventDefault();

  try {
    if (editingId) {
      await api.put(`/products/admin/${editingId}`, form);
      toast.success("Product updated");
    } else {
      await api.post("/products/admin", form);
      toast.success("Product added");
    }

    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });

    setEditingId(null);
    loadProducts();

  } catch (err) {
    console.log(err);
    toast.error("Operation failed");
  }
};

  // ✅ Delete product
  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/admin/${id}`);
      toast.success("Deleted");
      loadProducts();
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };
  

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <h1 className="text-2xl font-bold mb-4">Admin Products</h1>

      {/* ➕ Add Product Form */}
      <form
        onSubmit={handleAdd}
        className="bg-red-500 hover:bg-red-600 transition p-6 max-w-6xl mx-auto">
      
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 rounded"
        />
        <input
        type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 rounded"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded col-span-2"
        />

        <button className="bg-green-600 text-white py-2 rounded col-span-2">
          Add Product
        </button>
      </form>

      {/* 📦 Product List */}
      <div className="grid md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow">
            <img
              src={p.image}
              alt=""
              className="h-40 w-full object-cover rounded"
            />
            <h2 className="font-bold mt-2">{p.name}</h2>
            <p>₹{p.price}</p>

            <button
              onClick={() => {
                setForm(p);
                setEditingId(p.id);
              }}
              className="bg-blue-500 text-white px-3 py-1 mt-2 rounded ml-2"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
