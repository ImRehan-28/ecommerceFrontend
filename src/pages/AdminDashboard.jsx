import { useEffect, useState } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";
import DashboardCard from "../components/admin/Dashboardcard";
import api from "../api/axiosInstance";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: "-", users: "-", orders: "-" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/products?size=1"),
      api.get("/users"),
    ])
      .then(([productsRes, usersRes]) => {
        setStats({
          products: productsRes.data.totalElements ?? "-",
          users: usersRes.data.length ?? "-",
          orders: "-",
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.100" }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AdminNavbar />
        <Box sx={{ p: 3 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <DashboardCard title="Total Products" value={stats.products} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DashboardCard title="Total Users" value={stats.users} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DashboardCard title="Orders" value={stats.orders} />
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
