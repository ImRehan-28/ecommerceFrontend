import { createContext, useContext, useState, useEffect } from "react";
import { getToken, removeToken } from "../utils/token";
import { jwtDecode } from "jwt-decode";
import { loginApi } from "./authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setAuthToken] = useState(getToken());
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  // ✅ Decode token
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
      setUser(decoded.sub);
    }
  }, [token]);

  // ✅ Login
  const login = async (data) => {
    const res = await loginApi(data);

    localStorage.setItem("token", res.data.token);
    setAuthToken(res.data.token);   // 🔥 important

    return res.data;
  };

  // ✅ Logout
  const logout = () => {
    removeToken();
    setAuthToken(null);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, token, role, user, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);