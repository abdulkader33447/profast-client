import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (!user) {
    <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
