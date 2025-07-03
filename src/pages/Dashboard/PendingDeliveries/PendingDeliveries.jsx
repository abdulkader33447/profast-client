import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Home/Home/shared/LoadingSpinner/LoadingSpinner";
import useTrackingLogger from "../../../hooks/useTrackingLogger";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { logTracking } = useTrackingLogger();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riderParcels"],
    enabled: !!user.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // const updateParcelStatus = async (parcelId, newStatus) => {
  //   const confirm = await Swal.fire({
  //     title: `Confirm status update`,
  //     text: `Mark this parcel as "${newStatus}"?`,
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, proceed",
  //   });

  //   if (!confirm.isConfirmed) return;

  //   try {
  //     await axiosSecure.patch(`/parcels/${parcelId}/status`, {
  //       delivery_status: newStatus,
  //     });
  //     Swal.fire({
  //       icon: "success",
  //       title: `Parcel marked as ${newStatus.replace("_", " ")}`,
  //     });
  //     refetch();
  //   } catch (err) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Failed to update status",
  //       text: err.response?.data?.message || "Please try again.",
  //     });
  //   }
  // };
  const updateParcelStatus = async (parcelId, newStatus) => {
    const confirm = await Swal.fire({
      title: `Confirm status update`,
      text: `Mark this parcel as "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
    });

    if (!confirm.isConfirmed) return;

    try {
      // Step 1: Get full parcel info
      const parcelRes = await axiosSecure.get(`/parcels/${parcelId}`);
      const parcel = parcelRes.data;

      // Step 2: Update parcel status
      await axiosSecure.patch(`/parcels/${parcelId}/status`, {
        delivery_status: newStatus,
      });

      // Step 3: Log tracking
      //tracking log
      await logTracking({
        tracking_id: parcel.trackingId,
        status: newStatus, // in-transit / delivered
        updated_by: user.email,
        details:
          newStatus === "in-transit"
            ? `Parcel picked by: ${user.displayName}`
            : `Parcel delivered by: ${user.displayName}`,
        // location: `${parcel.receiverDistrict} - ${parcel.receiverCenter}`,
      });

      // Step 4: Add earnings if delivered
      if (newStatus === "delivered") {
        await axiosSecure.post("/rider/earnings/add", {
          parcelId: parcel._id,
          email: user.email,
        });
      }

      Swal.fire({
        icon: "success",
        title: `Parcel marked as ${newStatus.replace("_", " ")}`,
      });
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to update status",
        text: err.response?.data?.message || "Please try again.",
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Pending Deliveries
      </h2>

      {parcels.length === 0 ? (
        <p className="text-center text-gray-500">No deliveries assigned.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Parcel ID</th>
                <th>Parcel title</th>
                <th>Parcel Type</th>
                <th>Receiver</th>
                <th>Receiver Center</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel._id.slice(-6).toUpperCase()}</td>
                  <td>{parcel.title}</td>
                  <td>{parcel.type}</td>
                  <td>{parcel.receiverName}</td>
                  <td>{parcel.receiverCenter}</td>
                  <td>
                    <span
                      className={`badge ${
                        parcel.delivery_status === "rider_assigned"
                          ? "badge-warning"
                          : parcel.delivery_status === "in-transit"
                          ? "badge-info"
                          : parcel.delivery_status === "delivered"
                          ? "badge-success"
                          : "badge-neutral"
                      }`}
                    >
                      {parcel.delivery_status}
                    </span>
                  </td>
                  <td>
                    {parcel.delivery_status === "rider_assigned" && (
                      <button
                        onClick={() =>
                          updateParcelStatus(parcel._id, "in-transit")
                        }
                        className="btn btn-sm bg-[#CAEB66] hover:border-none rounded-lg hover:shadow-[0_0_20px_#CAEB66]"
                      >
                        Mark as Picked
                      </button>
                    )}
                    {parcel.delivery_status === "in-transit" && (
                      <button
                        onClick={() =>
                          updateParcelStatus(parcel._id, "delivered")
                        }
                        className="btn btn-sm bg-[#CAEB66] hover:border-none rounded-lg hover:shadow-[0_0_20px_#CAEB66]"
                      >
                        Mark as Delivered
                      </button>
                    )}
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

export default PendingDeliveries;
