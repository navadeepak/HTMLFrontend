import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    if (localStorage.getItem("isLoggedIn") === "true") {

            return element;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/auth/dashboard" replace />;
  }

  return element;
};

export default ProtectedRoute;
