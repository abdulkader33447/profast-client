import React from "react";
import useUserRole from "../../../hooks/useUserRole";
import LoadingSpinner from "../../Home/Home/shared/LoadingSpinner/LoadingSpinner";
import UserDashboard from "./UserDashboard";
import RiderDashboard from "./RiderDashboard";
import Forbidden from "../../Forbidden/Forbidden";
import AdminDashboard from "./AdminDashboard";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <LoadingSpinner />;
  }

  if (role === "user") {
    return <UserDashboard />;
  } else if (role === "rider") {
    return <RiderDashboard />;
  } else if (role === "admin") {
    return <AdminDashboard />;
  } else {
    return <Forbidden />;
  }
};

export default DashboardHome;
