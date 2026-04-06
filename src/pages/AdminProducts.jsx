import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useSnackbar } from "notistack";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";
import {
  Box, Typography, Button, TextField, Dialog, DialogTitle,
  DialogContent, DialogActions, Table, TableHead, TableRow,
  TableCell, TableBody, TableContainer, Paper, IconButton,
  InputAdornment, CircularProgress, Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const emptyForm = { name: "", description: "", price: "", category: "", image: "" };

const AdminProducts = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products?search=${search}`);
      setProducts(res.data.content ?? []);
    } catch {
      enqueueSnackbar("Failed to load products", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, [search]);

  const handleOpen = (product = null) => {
    setEditingId(product?.id ?? null);
    setForm(product ? { name: product.name, description: product.description, price: product.price, category: product.category, image: product.image } : emptyForm);
    setOpen(true);
  };

  const handleClose = () => { setOpen(false); setEditingId(null); setForm(emptyForm); };

  const handleSave = async () => {
    try {
      if (editingId) {
        await api.put(`/products/admin/${editingId}`, form);
        enqueueSnackbar("Product updated", { variant: "success" });
      } else {
        await api.post("/products/admin", form);
        enqueueSnackbar("Product added", { variant: "success" });
      }
      handleClose();
      loadProducts();
    } catch {
      enqueueSnackbar("Operation failed", { variant: "error" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/admin/${id}`);
      enqueueSnackbar("Product deleted", { variant: "success" });
      loadProducts();
    } catch {
      enqueueSnackbar("Delete failed", { variant: "error" });
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.100" }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AdminNavbar />
        <Box sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h5" fontWeight="bold">Products</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
              Add Product
            </Button>
          </Box>

          {/* Search */}
          <TextField
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ mb: 2, width: 320 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
              ),
            }}
          />

          {/* Table */}
          <TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.200" }}>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center"><CircularProgress size={28} /></TableCell>
                  </TableRow>
                ) : products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No products found</TableCell>
                  </TableRow>
                ) : (
                  products.map((p) => (
                    <TableRow key={p.id} hover>
                      <TableCell>
                        <Avatar src={p.image} variant="rounded" sx={{ width: 48, height: 48 }} />
                      </TableCell>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.category}</TableCell>
                      <TableCell>₹{p.price}</TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => handleOpen(p)}><EditIcon /></IconButton>
                        <IconButton color="error" onClick={() => handleDelete(p.id)}><DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Add / Edit Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          {["name", "category", "image"].map((f) => (
            <TextField
              key={f}
              label={f.charAt(0).toUpperCase() + f.slice(1)}
              value={form[f]}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              fullWidth
            />
          ))}
          <TextField
            label="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            fullWidth
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editingId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminProducts;
