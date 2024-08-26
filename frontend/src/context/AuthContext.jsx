import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const initialData = window.localStorage.getItem("token") || null;
  const [token, setToken] = useState(initialData);
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const loginContext = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    navigate("/main/dashboard");
  };

  const logoutContext = () => {
    setToken(null);
    localStorage.removeItem("token");
    setIsLogin(true);
  };

  const values = {
    token,
    setToken,
    isLogin,
    setIsLogin,
    loginContext,
    logoutContext,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
