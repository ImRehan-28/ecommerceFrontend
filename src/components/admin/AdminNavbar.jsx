import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
