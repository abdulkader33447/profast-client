import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
        <p>
          <small>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 btn btn-link">
              Log In
            </Link>
          </small>
        </p>
        <SocialLogin/>
      </div>
    </div>
  );
};

export default Login;
