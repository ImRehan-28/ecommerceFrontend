import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { registerApi } from "../auth/authService";
import {
  Box, Paper, Typography, TextField, Button, CircularProgress,
} from "@mui/material";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerApi(data);
      await login({ email: data.email, password: data.password });
      enqueueSnackbar("Account created!", { variant: "success" });
      navigate("/");
    } catch (err) {
      enqueueSnackbar(err?.response?.data || "Registration failed", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const field = (label, name, type = "text") => (
    <TextField
      label={label}
      type={type}
      required
      fullWidth
      value={data[name]}
      onChange={(e) => setData({ ...data, [name]: e.target.value })}
    />
  );

  return (
    <Box sx={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "grey.100" }}>
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 420, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Create Account 🚀
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {field("First Name", "firstName")}
          {field("Last Name", "lastName")}
          {field("Email", "email", "email")}
          {field("Password", "password", "password")}
          <Button type="submit" variant="contained" color="success" size="large" disabled={loading}>
            {loading ? <CircularProgress size={22} color="inherit" /> : "Register"}
          </Button>
        </Box>
        <Typography variant="body2" textAlign="center" mt={2} color="text.secondary">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1976d2" }}>Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
