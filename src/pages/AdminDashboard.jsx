import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";
import DashboardCard from "../components/admin/DashboardCard";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Navbar */}
        <AdminNavbar />

        {/* Dashboard Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <DashboardCard title="Total Products" value="120" />
          <DashboardCard title="Total Users" value="45" />
          <DashboardCard title="Orders" value="78" />

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;