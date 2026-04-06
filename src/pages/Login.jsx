import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useCart } from "../feature/cart/cartContext";
import {
  Box, Paper, Typography, TextField, Button, CircularProgress,
} from "@mui/material";

const Login = () => {
  const { login } = useAuth();
  const { refreshCart } = useCart();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(data);
      enqueueSnackbar("Login successful", { variant: "success" });
      await refreshCart();
      navigate(res.role === "ROLE_ADMIN" ? "/admin/products" : "/");
    } catch {
      enqueueSnackbar("Invalid email or password", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "grey.100" }}>
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 420, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Welcome Back 👋
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            required
            fullWidth
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Button type="submit" variant="contained" size="large" disabled={loading}>
            {loading ? <CircularProgress size={22} color="inherit" /> : "Login"}
          </Button>
        </Box>
        <Typography variant="body2" textAlign="center" mt={2} color="text.secondary">
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#1976d2" }}>Register</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
