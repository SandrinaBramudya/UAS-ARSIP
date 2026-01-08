import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import DashboardGate from "./pages/dashboard/DashboardGate";
import { getToken } from "./utils/auth";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={getToken() ? <DashboardGate /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
