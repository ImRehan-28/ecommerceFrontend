import { createContext, useContext, useState, useEffect } from "react";
import { getToken, removeToken } from "../utils/token";
import { jwtDecode } from "jwt-decode";
import { loginApi } from "./authService";

const AuthContext = createContext();

const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) return null; // expired
    return decoded;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const initToken = getToken();
  const initDecoded = initToken ? decodeToken(initToken) : null;

  // clear expired token on startup
  if (initToken && !initDecoded) removeToken();

  const [token, setAuthToken] = useState(initDecoded ? initToken : null);
  const [role, setRole] = useState(initDecoded?.role ?? null);
  const [user, setUser] = useState(initDecoded?.sub ?? null);

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setRole(decoded.role);
        setUser(decoded.sub);
      } else {
        // token expired mid-session
        removeToken();
        setAuthToken(null);
        setRole(null);
        setUser(null);
      }
    }
  }, [token]);

  const login = async (data) => {
    const res = await loginApi(data);
    localStorage.setItem("token", res.data.token);
    setAuthToken(res.data.token);
    return res.data;
  };

  const logout = () => {
    removeToken();
    setAuthToken(null);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, token, role, user, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
