import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../pages/Home/Home/shared/LoadingSpinner/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  console.log(user);
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate state={{ from: location.pathname }} to="/login" />;
  }
  return children;
};

export default PrivateRoute;
