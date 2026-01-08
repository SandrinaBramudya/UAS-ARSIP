import { Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

export default function DashboardGate() {
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");

  // belum login sama sekali
  if (!token || !userRaw || userRaw === "null") {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = JSON.parse(userRaw);
  } catch (e) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // guard FINAL
  if (!user || !user.role) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return user.role === "admin"
    ? <AdminDashboard />
    : <UserDashboard />;
}
