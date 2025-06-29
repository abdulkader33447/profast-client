import React from "react";
import { Link, NavLink } from "react-router";
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import useAuth from "../../../../../hooks/useAuth";
import { auth } from "../../../../../firebase/firebase.init";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  // console.log(user?.photoURL);

  const activeNavLinkClass = ({ isActive }) =>
    isActive
      ? "bg-[#CAEB66] shadow-[0_0_20px_#CAEB66] rounded-md "
      : "hover:bg-[#CAEB66] hover:shadow-[0_0_20px_#CAEB66] rounded-md ";

  const navItems = (
    <>
      <li>
        <NavLink to="/" className={activeNavLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className={activeNavLinkClass}>
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel" className={activeNavLinkClass}>
          Send Parcel
        </NavLink>
      </li>
      <li>
        <NavLink to="/beARider" className={activeNavLinkClass}>
          Be a Rider
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/dashboard" className={activeNavLinkClass}>
              Dashboard
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/about" className={activeNavLinkClass}>
          About Us
        </NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut(auth)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "sign out user",
          showConfirmButton: false,
          timer: 2500,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="navbar sm:max-w-7xl w-11/12 mx-auto bg-base-100 shadow-sm rounded-2xl sm:py-5 sm:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn hover:bg-[#CAEB66] hover:border-none hover:shadow-[0_0_20px_#CAEB66] btn-ghost rounded-lg lg:hidden mr-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>

        <ProFastLogo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {!user ? (
          <Link
            className="btn bg-[#CAEB66] rounded-lg hover:shadow-[0_0_20px_#CAEB66]"
            to="/login"
          >
            Login
          </Link>
        ) : (
          <>
            <div className="dropdown dropdown-end">
              <div>
                <Link>
                  <img
                    src={user?.photoURL}
                    alt="profile"
                    className="rounded-full sm:size-12 size-10 hover:shadow-[0_0_20px_#CAEB66]"
                  />
                </Link>
                <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-30 p-2  shadow-[0_0_20px_#CAEB66]">
                  <li>
                    <NavLink
                      className="btn bg-[#CAEB66] rounded-lg hover:shadow-[0_0_20px_#CAEB66]"
                      onClick={handleLogOut}
                    >
                      Log Out
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
//
export default Navbar;
