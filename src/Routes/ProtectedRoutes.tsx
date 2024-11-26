import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
type Props = {
  children: React.ReactNode;
  role: string;
};

export const ProtectedRoute = ({ children, role }: Props) => {
  const { authState } = useAuth();

  if (authState.loading) {
    return <div>Loading...</div>; // Display a loading indicator while checking auth status
  }

  if (!authState.isAuthorized || !role.includes(authState.role)) {
    return <Navigate to="/signin" replace />;
  } else {
    return <>{children}</>;
  }
};
