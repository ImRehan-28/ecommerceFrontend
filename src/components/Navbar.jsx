import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AppBar, Toolbar, Typography, IconButton, Badge, InputBase,
  Box, Avatar, Menu, MenuItem, Divider, Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../feature/cart/cartContext";

const Navbar = () => {
  const { logout, role, user, isAuthenticated } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const displayName = user?.split("@")[0] ?? "U";

  const handleSearch = () => {
    if (search.trim()) navigate(`/?search=${search}`);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 2 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ cursor: "pointer", mr: 2 }}
          onClick={() => navigate("/")}
        >
          ShopX
        </Typography>

        {/* Search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "rgba(255,255,255,0.15)",
            borderRadius: 1,
            px: 1,
            flexGrow: 1,
            maxWidth: 400,
          }}
        >
          <InputBase
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            sx={{ color: "inherit", flex: 1 }}
          />
          <IconButton size="small" color="inherit" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Admin link */}
        {role === "ROLE_ADMIN" && (
          <Button color="inherit" component={Link} to="/admin/products">
            Admin
          </Button>
        )}

        {/* Cart */}
        {isAuthenticated && (
          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        )}

        {/* Auth */}
        {isAuthenticated ? (
          <>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
              <Avatar sx={{ width: 34, height: 34, bgcolor: "secondary.main", fontSize: 14 }}>
                {displayName.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem disabled>
                <Typography variant="body2">{displayName}</Typography>
              </MenuItem>
              <Divider />
              <MenuItem component={Link} to="/cart" onClick={() => setAnchorEl(null)}>
                My Cart
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" variant="outlined" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
