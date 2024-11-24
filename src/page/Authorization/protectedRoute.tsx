import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAuthenticated, redirect }:any) {
  
  if (!isAuthenticated) {
     return <Navigate to={redirect} />;
  }
  return children;
}

export default ProtectedRoute;