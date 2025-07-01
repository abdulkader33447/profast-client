import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Home/Home/shared/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const [loadingRiders, setLoadingRiders] = useState(false);

  // Now using server-side filtering for better performance
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels", {
        params: {
          delivery_status: "not collected!",
          payment_status: "paid",
        },
      });
      return res.data;
    },
  });

  useEffect(() => {
    const loadRiders = async () => {
      if (!selectedParcel) return;

      setLoadingRiders(true);
      try {
        const res = await axiosSecure.get("/riders/active", {
          params: {
            district: selectedParcel.receiverDistrict, // must match backend field
            city: selectedParcel.receiverCenter,
          },
        });
        setRiders(res.data);
      } catch (err) {
        console.error("Failed to load riders", err);
      } finally {
        setLoadingRiders(false);
      }
    };

    loadRiders();
  }, [selectedParcel, axiosSecure]);

  const handleAssignRiderToParcel = async (riderId) => {
    try {
      await axiosSecure.patch(`/parcels/${selectedParcel._id}/assign-rider`, {
        riderId,
      });

      Swal.fire({
        icon: "success",
        title: "Rider assigned successfully!",
      });
      refetch();
      setSelectedParcel(null);
    } catch (error) {
      console.error("Failed to assign rider", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Failed to assign rider. Please try again.",
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4">
      {selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative">
            <button
              className="absolute cursor-pointer top-2 right-3 text-xl font-bold"
              onClick={() => setSelectedParcel(null)}
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold mb-4">
              Assign Rider for Parcel:{" "}
              <span className="text-blue-600">
                {selectedParcel._id.slice(-6).toUpperCase()}
              </span>
            </h3>

            {loadingRiders ? (
              <LoadingSpinner />
            ) : riders.length === 0 ? (
              <p className="text-red-500">No rider found for this location.</p>
            ) : (
              <ul className="space-y-2 max-h-[300px] overflow-y-auto">
                {riders.map((rider) => (
                  <li
                    key={rider._id}
                    className="p-3 border rounded-md flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{rider.name}</p>
                      <p className="text-sm text-gray-500">{rider.email}</p>
                    </div>
                    <button
                      onClick={() => handleAssignRiderToParcel(rider._id)}
                      className="btn btn-sm btn-success"
                    >
                      Assign
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4 text-center">
        Assign Rider to Parcels
      </h2>
      {parcels.length === 0 ? (
        <p className="text-center text-gray-500">No parcels found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Parcel ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Sender center</th>
                <th>Receiver center</th>
                <th>Payment status</th>
                <th>Parcel status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel._id.slice(-6).toUpperCase()}</td>
                  <td>{parcel.senderName}</td>
                  <td>{parcel.receiverName}</td>
                  <td>{parcel.senderCenter}</td>
                  <td>{parcel.receiverCenter}</td>
                  <td>
                    <span className="badge badge-success">
                      {parcel.payment_status}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-warning text-xs">
                      {parcel.delivery_status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedParcel(parcel)}
                      className="btn bg-[#CAEB66] hover:border-none rounded-lg hover:shadow-[0_0_20px_#CAEB66]"
                    >
                      Assign Rider
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
