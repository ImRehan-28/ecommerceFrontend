import { useEffect, useState } from "react";
import { getCart, removeItem, placeOrder } from "./cartService";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Paper, List, ListItem, ListItemText,
  ListItemAvatar, Avatar, IconButton, Divider, Button, CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
    } catch {
      enqueueSnackbar("Failed to load cart", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCart(); }, []);

  const handleRemove = async (id) => {
    await removeItem(id);
    enqueueSnackbar("Removed from cart", { variant: "info" });
    loadCart();
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      enqueueSnackbar("Cart is empty", { variant: "warning" });
      navigate("/");
      return;
    }
    try {
      await placeOrder();
      enqueueSnackbar("Order placed successfully!", { variant: "success" });
      loadCart();
    } catch {
      enqueueSnackbar("Failed to place order", { variant: "error" });
    }
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * (item.quantity ?? 1), 0);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
          <Typography color="text.secondary">Your cart is empty 🛒</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/")}>
            Shop Now
          </Button>
        </Paper>
      ) : (
        <>
          <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <List disablePadding>
              {cart.map((item, idx) => (
                <Box key={item.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" color="error" onClick={() => handleRemove(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar src={item.product.image} variant="rounded" sx={{ width: 52, height: 52, mr: 1 }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.product.name}
                      secondary={`₹${item.product.price} × ${item.quantity ?? 1}`}
                    />
                    <Typography fontWeight="bold" sx={{ mr: 4 }}>
                      ₹{item.product.price * (item.quantity ?? 1)}
                    </Typography>
                  </ListItem>
                  {idx < cart.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>

          {/* Summary */}
          <Paper elevation={2} sx={{ mt: 2, p: 2, borderRadius: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" fontWeight="bold">
              Total: ₹{total.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={<ShoppingCartCheckoutIcon />}
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default CartPage;
