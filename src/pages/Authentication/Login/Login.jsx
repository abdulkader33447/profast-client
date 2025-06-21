import React from "react";
import { useForm } from "react-hook-form";

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <fieldset className="fieldset ">
          <h1  className="sm:text-5xl text-2xl font-bold">Log In Now!</h1>
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email")}
            className="input"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input "
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">password id required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">password must be 6 characters or longer</p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

        </fieldset>
          <button className="btn btn-neutral mt-4">Login</button>
      </form>
    </div>
  );
};

export default Login;
