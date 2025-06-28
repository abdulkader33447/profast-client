import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [profilePic, setProfilePic] = useState("");

  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  // const onSubmit =async (data) => {
  //   console.log(data);
  //   createUser(data.email, data.password)
  //     .then((userCredential) => {
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: "Signed Up successfully!",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       navigate("/");
  //       //save user info to db
  //       const userInfo = {
  //         email: data.email,
  //         role: "user", //default role
  //         created_at: new Date().toISOString(),
  //         last_log_in: new Date().toISOString(),
  //       };
  //       const userRes = await axiosInstance.post('/users',userInfo)

  //       //update user profile in the firebase
  //       const userProfile = {
  //         displayName: data.name,
  //         photoUrl: profilePic,
  //       };
  //       updateUserProfile(userProfile)
  //         .then(() => {
  //           console.log("profile name, pic updated");
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });

  //       console.log(userCredential.user);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUser(data.email, data.password);

      // Show success alert
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Signed Up successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Save user info to DB
      const userInfo = {
        email: data.email,
        role: "user",
        created_at: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Dhaka",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        // last_log_in: new Date().toISOString(),
      };
      const userRes = await axiosInstance.post("/users", userInfo);
      console.log(userRes.data);

      // Update Firebase profile
      const userProfile = {
        displayName: data.name,
        photoURL: profilePic,
      };
      await updateUserProfile(userProfile);

      console.log("profile name, pic updated");
      console.log(userCredential.user);
      navigate("/");
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  const handleUploadImage = async (e) => {
    const image = e.target.files[0];
    console.log(image);

    const formData = new FormData();
    formData.append("image", image);

    const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_img_upload_key
    }`;

    const res = await axios.post(imgUploadUrl, formData);
    setProfilePic(res.data.data.url);
  };
  return (
    <div className="card  w-full max-w-sm shrink-0 ">
      <div className="card-body">
        <h1 className="sm:text-5xl text-2xl font-bold">
          Create an account now!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* name */}
            <label className="label">Your Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input w-full"
              placeholder="Your Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">name is required</p>
            )}

            {/* image */}
            <label className="label">Your Profile Image</label>
            <input
              onChange={handleUploadImage}
              type="file"
              className="input w-full"
              placeholder="Your Profile Image"
            />

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
