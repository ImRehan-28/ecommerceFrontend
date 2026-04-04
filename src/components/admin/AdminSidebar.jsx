import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-black text-white p-5 space-y-6">
      <h2 className="text-2xl font-bold">Admin</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/orders">Orders</Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;