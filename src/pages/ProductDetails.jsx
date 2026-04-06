import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, getProducts } from "../feature/products/productService";
import { addToCart } from "../feature/cart/cartService";
import { useCart } from "../feature/cart/cartContext";
import { useSnackbar } from "notistack";
import {
  Box, Grid, Typography, Button, Chip, Divider,
  Card, CardMedia, CardContent, CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { refreshCart } = useCart();
  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    getProductById(id)
      .then((res) => setProduct(res.data))
      .catch(() => enqueueSnackbar("Failed to load product", { variant: "error" }));

    getProducts("", 0, 10).then((res) => {
      const all = res.data.content || [];
      setSuggestions(all.filter((p) => p.id !== Number(id)).slice(0, 10));
    });
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id);
      enqueueSnackbar("Added to cart", { variant: "success" });
      refreshCart();
    } catch {
      enqueueSnackbar("Login to add to cart", { variant: "warning" });
    }
  };

  if (!product)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", p: 3 }}>
      <Grid container spacing={4}>
        {/* Image */}
        <Grid item xs={12} md={5}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{ width: "100%", borderRadius: 2, objectFit: "cover", maxHeight: 400 }}
          />
        </Grid>

        {/* Details */}
        <Grid item xs={12} md={7}>
          <Typography variant="h4" fontWeight="bold">{product.name}</Typography>
          {product.category && (
            <Chip label={product.category} size="small" sx={{ mt: 1 }} />
          )}
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="h4" color="success.main" fontWeight="bold" sx={{ mt: 3 }}>
            ₹{product.price}
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCartIcon />}
            sx={{ mt: 3 }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h6" fontWeight="bold" mb={2}>
            You may also like
          </Typography>
          <Grid container spacing={2}>
            {suggestions.map((item) => (
              <Grid item xs={6} sm={4} md={2.4} key={item.id}>
                <Card
                  sx={{ cursor: "pointer", "&:hover": { boxShadow: 4 } }}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <CardMedia component="img" height="120" image={item.image} alt={item.name} sx={{ objectFit: "cover" }} />
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography variant="body2" fontWeight="medium" noWrap>{item.name}</Typography>
                    <Typography variant="body2" color="success.main" fontWeight="bold">₹{item.price}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ProductDetails;
