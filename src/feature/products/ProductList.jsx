import { useEffect, useState } from "react";
import { getProducts } from "./productService";
import { addToCart } from "../cart/cartService";
import ProductCard from "../../components/productCard";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import { Grid, Box, Pagination, CircularProgress, Typography } from "@mui/material";
import { useCart } from "../cart/cartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search") ?? "";

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    getProducts(search, page - 1)
      .then((res) => {
        setProducts(res.data.content ?? []);
        setTotalPages(res.data.totalPages ?? 1);
      })
      .catch(() => enqueueSnackbar("Failed to load products", { variant: "error" }))
      .finally(() => setLoading(false));
  }, [search, page]);

  const { refreshCart } = useCart();

  const handleAdd = async (id) => {
    try {
      await addToCart(id);
      enqueueSnackbar("Added to cart", { variant: "success" });
      refreshCart();
    } catch {
      enqueueSnackbar("Login to add to cart", { variant: "warning" });
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 3 }}>
      {products.length === 0 ? (
        <Typography textAlign="center" color="text.secondary" mt={6}>
          No products found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((p) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
              <ProductCard product={p} onAdd={handleAdd} />
            </Grid>
          ))}
        </Grid>
      )}

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, val) => setPage(val)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
