import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  console.log(user);
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner loading-xl mx-auto"></span>;
  }

  if (!user) {
    return <Navigate state={{ from: location.pathname }} to="/login" />;
  }
  return children;
};

export default PrivateRoute;
