import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Home/Home/shared/LoadingSpinner/LoadingSpinner";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();

  // Now using server-side filtering for better performance
  const { data: parcels = [], isLoading } = useQuery({
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4">
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
                    <button className="btn btn-sm btn-primary">
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
