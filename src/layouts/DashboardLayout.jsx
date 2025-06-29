import React from "react";
import { NavLink, Outlet } from "react-router";
import ProFastLogo from "../pages/Home/Home/shared/ProFastLogo/ProFastLogo";
import {
  FaHome,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaUserEdit,
  FaUserCheck,
  FaUserClock,
} from "react-icons/fa";
import { MdTrackChanges } from "react-icons/md";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col  p-5">
        {/* Page content here */}
        <div className="navbar bg-base-300 w-full  lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4">
          {/* Sidebar content here */}
          <ProFastLogo />
          <li>
            <NavLink to="/dashboard/home " className=" hover:bg-[#CAEB66] hover:shadow-[0_0_20px_#CAEB66]">
              <FaHome className="inline-block mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myParcels" className="hover:shadow-[0_0_18px_#CAEB66] hover:bg-[#CAEB66]">
              <FaBoxOpen className="inline-block mr-2" /> My Parcel
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory" className="hover:shadow-[0_0_18px_#CAEB66] hover:bg-[#CAEB66]">
              <FaMoneyCheckAlt className="inline-block mr-2" /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/track" className="hover:shadow-[0_0_18px_#CAEB66] hover:bg-[#CAEB66]">
              <MdTrackChanges className="inline-block mr-2" /> Track a package
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile" className="hover:shadow-[0_0_18px_#CAEB66] hover:bg-[#CAEB66]">
              <FaUserEdit className="inline-block mr-2" /> Update Profile
            </NavLink>
          </li>

          {/* riders links */}
          <li>
            <NavLink to="/dashboard/activeRider" className="hover:shadow-[0_0_18px_#CAEB66] hover:bg-[#CAEB66]">
              <FaUserCheck className="inline-block mr-2" /> Active Rider
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/pendingRider" className="hover:shadow-[0_0_18px_#CAEB66] hover:bg-[#CAEB66]">
              <FaUserClock className="inline-block mr-2" /> Pending Rider
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
