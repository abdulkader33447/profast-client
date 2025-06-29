import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Home/Home/shared/LoadingSpinner/LoadingSpinner";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    data: riders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  // Filter riders by name based on search input (case insensitive)
  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deactivateRider = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, deactivate",
    });

    if (confirm.isConfirmed) {
      try {
        setLoading(true);
        await axiosSecure.patch(`/riders/${id}/status`, {
          status: "inactive",
        });
        Swal.fire("Deactivated!", "Rider has been deactivated.", "success");
        refetch();
      } catch (error) {
        console.error("Error deactivating rider:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Active Riders</h2>

      <input
        type="text"
        placeholder="Search rider by name..."
        className="input input-bordered mb-4 w-full max-w-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-zebra w-full">
        <thead>
          <tr className="bg-gray-100 text-lg">
            <th>Name</th>
            <th>Email</th>
            <th>District</th>
            <th>Phone</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRiders.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No active riders found.
              </td>
            </tr>
          ) : (
            filteredRiders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td>{rider.phone}</td>
                <td>{rider.status}</td>
                <td className="text-center">
                  <button
                    disabled={loading}
                    onClick={() => deactivateRider(rider._id)}
                    className="btn btn-sm bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveRiders;
