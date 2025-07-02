import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Home/Home/shared/LoadingSpinner/LoadingSpinner";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch completed parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completedDeliveries", user.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/parcels/completed", {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  // Calculate earning based on delivery location
  const calculateEarning = (parcel) => {
    if (!parcel.cost) return 0;
    const sameDistrict =
      parcel.senderRegion?.toLowerCase() ===
      parcel.receiverRegion?.toLowerCase();
    return sameDistrict ? parcel.cost * 0.3 : parcel.cost * 0.4;
  };

  const totalEarning = parcels.reduce(
    (sum, parcel) => sum + calculateEarning(parcel),
    0
  );

  // Handle cashout click
  const handleCashout = async (parcelId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to cash out this delivery. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cash Out!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/parcels/${parcelId}/cashout`);
        Swal.fire("Success", "Parcel cashed out successfully!", "success");

        // Refetch completed deliveries after cashout
        queryClient.invalidateQueries(["completedDeliveries", user.email]);
      } catch (error) {
        console.error("Cashout error", error);
        Swal.fire("Error", "Cashout failed. Please try again.", "error");
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Completed Deliveries
      </h2>

      {parcels.length === 0 ? (
        <p className="text-center text-gray-500">No deliveries completed yet.</p>
      ) : (
        <div className="overflow-x-auto p-2 bg-[#caeb664c] rounded-lg">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Parcel</th>
                <th>Receiver</th>
                <th>From → To</th>
                <th>Picked</th>
                <th>Delivered</th>
                <th>Fee</th>
                <th>Earnings</th>
                <th>Cashout</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.title}</td>
                  <td>{parcel.receiverName}</td>
                  <td>
                    {parcel.senderRegion} → {parcel.receiverRegion}
                  </td>
                  <td>{parcel.riderAssignedAt || "N/A"}</td>
                  <td>{parcel.deliveredAt || "N/A"}</td>
                  <td>${parcel.cost}</td>
                  <td className="text-green-600 font-semibold">
                    ${calculateEarning(parcel).toFixed(2)}
                  </td>
                  <td>
                    {parcel.cashout_status === "cashed_out" ? (
                      <button className="btn btn-sm btn-disabled text-green-600 font-semibold">
                        Cashed Out
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline btn-primary"
                        onClick={() => handleCashout(parcel._id)}
                      >
                        Cash Out
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right mt-4 text-lg font-bold text-green-700">
            Total Earnings: ${totalEarning.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletedDeliveries;
