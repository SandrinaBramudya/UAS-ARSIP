import { Navigate } from "react-router-dom";

export default function DashboardGate() {
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");

  console.log("DASHBOARD GATE", { token, userRaw });

  if (!token || !userRaw) {
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = JSON.parse(userRaw);
  } catch {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  if (!user?.role) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // ⬇️ PENTING: redirect, bukan render
  return user.role === "admin"
    ? <Navigate to="/dashboard/admin" replace />
    : <Navigate to="/dashboard/user" replace />;
}
