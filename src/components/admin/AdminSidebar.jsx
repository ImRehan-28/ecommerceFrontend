import { Link, useLocation } from "react-router-dom";
import {
  Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: <DashboardIcon /> },
  { label: "Products", to: "/admin/products", icon: <InventoryIcon /> },
  { label: "Orders", to: "/admin/orders", icon: <ShoppingBagIcon /> },
];

const AdminSidebar = () => {
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "grey.900",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "white" }}>
        Admin
      </Typography>
      <Divider sx={{ bgcolor: "grey.700", mb: 1 }} />
      <List disablePadding>
        {navItems.map(({ label, to, icon }) => (
          <ListItemButton
            key={to}
            component={Link}
            to={to}
            selected={pathname === to}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              color: "white",
              "&.Mui-selected": { bgcolor: "primary.main" },
              "&:hover": { bgcolor: "grey.700" },
            }}
          >
            <ListItemIcon sx={{ color: "white", minWidth: 36 }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default AdminSidebar;
