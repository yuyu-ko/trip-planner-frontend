import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  // 如果沒登入，強制導回首頁 (Login Page)
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // 如果有登入，顯示該顯示的頁面 (Outlet)
  return <Outlet />;
}
