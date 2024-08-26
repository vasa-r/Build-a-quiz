import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { token, logoutContext } = useAuth();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      logoutContext();
    }
  }, [token]);

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
