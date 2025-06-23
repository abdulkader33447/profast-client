import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((userCredential) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signed Up successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="card  w-full max-w-sm shrink-0 ">
      <div className="card-body">
        <h1 className="sm:text-5xl text-2xl font-bold">
          Create an account now!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">email is required</p>
            )}

            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">password is required</p>
            )}

            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                password must be 6 characters or longer
              </p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn bg-[#CAEB66] rounded-lg mt-4">
              register
            </button>
          </fieldset>
        </form>
        <p>
          <small>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 btn btn-link">
              Log In
            </Link>
          </small>
        </p>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
