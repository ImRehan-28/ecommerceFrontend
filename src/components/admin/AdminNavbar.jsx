const AdminNavbar = () => {


  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      <button className="bg-red-500 text-white px-4 py-1 rounded">
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;