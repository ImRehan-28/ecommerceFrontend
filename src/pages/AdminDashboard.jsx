import { Box, Grid } from "@mui/material";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";
import DashboardCard from "../components/admin/Dashboardcard";

const AdminDashboard = () => (
  <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.100" }}>
    <AdminSidebar />
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <AdminNavbar />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <DashboardCard title="Total Products" value="120" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DashboardCard title="Total Users" value="45" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DashboardCard title="Orders" value="78" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Box>
);

export default AdminDashboard;
