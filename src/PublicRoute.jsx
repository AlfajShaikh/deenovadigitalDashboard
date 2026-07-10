import { Navigate } from "react-router-dom";

export function PublicRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return isLoggedIn ? <Navigate to="/home" replace /> : children;
}