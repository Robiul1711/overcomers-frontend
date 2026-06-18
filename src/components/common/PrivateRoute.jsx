import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated, selectCurrentToken, clearAuth } from "@/redux/slices/authSlice";

// Helper function to decode JWT and check if it has expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      // If it doesn't look like a standard JWT, don't treat it as expired 
      // (helps with mock/test tokens in development if any)
      return false;
    }
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const { exp } = JSON.parse(jsonPayload);
    if (exp) {
      return Date.now() >= exp * 1000;
    }
  } catch (error) {
    // If decoding fails, treat as expired or invalid token
    return true;
  }
  return false;
};

const PrivateRoute = ({ children }) => {
  const token = useSelector(selectCurrentToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const expired = isTokenExpired(token);

  useEffect(() => {
    if (expired && isAuthenticated) {
      dispatch(clearAuth());
    }
  }, [expired, isAuthenticated, dispatch]);

  if (!isAuthenticated || expired) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
};

export default PrivateRoute;
