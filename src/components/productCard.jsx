import { useNavigate } from "react-router-dom";
import {
  Card, CardMedia, CardContent, CardActions,
  Typography, Button,
} from "@mui/material";

const ProductCard = ({ product, onAdd }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.3s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={product.image}
        alt={product.name}
        sx={{ cursor: "pointer", objectFit: "cover" }}
        onClick={() => navigate(`/product/${product.id}`)}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          noWrap
          sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {product.description}
        </Typography>
        <Typography variant="h6" color="success.main" fontWeight="bold" sx={{ mt: 1 }}>
          ₹{product.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onAdd(product.id)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
