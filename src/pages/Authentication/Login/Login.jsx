import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";

const Login = () => {
  const { signIn, user } = useAuth();
  const [logInError, setLogInError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const axiosInstance = useAxios();

  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);
  const from = location.state?.from || "/";

  // const onSubmit = (data) => {
  //   signIn(data.email, data.password)
  //     .then((result) => {
  //       console.log(result.user);
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: "Signed Up successfully!",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       navigate(from);

  //       // set last log in time to db
  //       const userInfo = {
  //         email:user.email,
  //         role: "user",
  //         last_log_in: new Date().toISOString,
  //       }
  //       const res = await axiosInstance.post("/users",userInfo)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       setLogInError("Incorrect email or password")
  //     });
  // };
 
  const onSubmit = async (data) => {
    try {
      const result = await signIn(data.email, data.password);
      console.log(result.user);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Signed In successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      // save last login to db
      const userInfo = {
        email: result.user.email,
        role: "user",
        last_log_in: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Dhaka",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };

      //  backend এ last login update/send করো
      await axiosInstance.post("/users", userInfo);

      navigate(from);
    } catch (error) {
      console.log(error);
      setLogInError("Incorrect email or password");
    }
  };

  return (
    <div className="card  w-full max-w-sm shrink-0 ">
      <div className="card-body">
        <h1 className="sm:text-5xl text-2xl font-bold">Log In Now!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {" "}
          <fieldset className="fieldset ">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input w-full"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">password id required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                password must be 6 characters or longer
              </p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
          </fieldset>
          <button className="btn w-full bg-[#CAEB66] mt-4">Login</button>
        </form>
        {logInError && <p className="text-red-500 mt-2">{logInError}</p>}
        <p>
          <small>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 btn btn-link">
              Sign Up
            </Link>
          </small>
        </p>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
