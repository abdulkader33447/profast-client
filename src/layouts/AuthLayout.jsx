import React from "react";
import authImg from "../assets/authImage.png";
import ProFastLogo from "../pages/Home/Home/shared/ProFastLogo/ProFastLogo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="sm:max-w-7xl w-11/12 mx-auto sm:p-12 p-2">
      <div>
        <ProFastLogo />
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <img src={authImg} className="max-w-sm " />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
