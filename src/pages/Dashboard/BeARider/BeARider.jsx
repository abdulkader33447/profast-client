import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import serviceCenters from "../../../../public/warehouses.json"; // adjust path

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const selectedDistrict = watch("district");

  useEffect(() => {
    const found = serviceCenters.find(
      (item) => item.district === selectedDistrict
    );
    setAreas(found ? found.covered_area : []);
  }, [selectedDistrict]);

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      name: user.displayName,
      email: user.email,
      status: "pending",
      appliedAt: new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    // console.log("form submitted", riderData);
    axiosSecure
      .post("/riders", riderData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire(
            "Success",
            "Your rider application was submitted!",
            "success"
          );
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", "Submission failed", "error");
      });

    // try {
    //   // const res = await axiosSecure.post("/riders", riderData);
    //   // if (res.data.insertedId) {
    //   //   Swal.fire(
    //   //     "Success",
    //   //     "Your rider application was submitted!",
    //   //     "success"
    //   //   );
    //   //   reset();
    //   // }
    // }
    //  .catch (error)=> {
    //   console.error(error);
    //   Swal.fire("Error", "Submission failed", "error");
    // }

    reset();
  };

  return (
    <div className="max-w-3xl sm:max-w-7xl w-11/12 mx-auto bg-base-100 shadow-sm rounded-2xl p-6 my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">🏍️ Become a Rider</h2>

      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-5">
        {/* name */}
        <label>Name</label>
        <input
          type="text"
          value={user.displayName}
          readOnly
          className="input input-bordered w-full"
        />

        {/* email */}
        <label>Email</label>
        <input
          type="email"
          value={user.email}
          readOnly
          className="input input-bordered w-full"
        />

        {/* age */}
        <label>Age</label>
        <input
          type="number"
          placeholder="Age"
          {...register("age", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.age && <span className="text-red-500">Age is required</span>}

        {/* phone  */}
        <label>Phone number</label>
        <input
          type="tel"
          placeholder="Phone Number"
          {...register("phone", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.phone && (
          <span className="text-red-500">Phone number is required</span>
        )}

        {/* NID */}
        <label>NID Number</label>
        <input
          type="text"
          placeholder="NID Card Number"
          {...register("nid", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.nid && <span className="text-red-500">NID is required</span>}

        {/* District Select */}
        <label>Select District</label>
        <select
          {...register("district", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select District</option>
          {[...new Set(serviceCenters.map((item) => item.district))].map(
            (district) => (
              <option key={district} value={district}>
                {district}
              </option>
            )
          )}
        </select>
        {errors.district && (
          <span className="text-red-500">District is required</span>
        )}

        {/* City Select */}
        <label>City Select</label>
        <select
          {...register("city", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select City</option>
          {areas.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <span className="text-red-500">City is required</span>}

        {/* bike brand */}
        <label>Bike Brand</label>
        <input
          type="text"
          placeholder="Bike Brand (e.g., Yamaha, Honda)"
          {...register("bikeBrand", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.bikeBrand && (
          <span className="text-red-500">Bike brand is required</span>
        )}

        {/* Bike Registration Number */}
        <label>Bike Registration Number</label>
        <input
          type="text"
          placeholder="Bike Registration Number"
          {...register("bikeNumber", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.bikeNumber && (
          <span className="text-red-500">Registration number required</span>
        )}

        <button
          type="submit"
          className="btn w-full bg-[#CAEB66] rounded-lg mt-4"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
