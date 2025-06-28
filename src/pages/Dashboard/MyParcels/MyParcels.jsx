import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      console.log("user.email:", user.email);
      return res.data;
    },
  });
  console.log(parcels);

  // Handle view
  const handleView = (parcel) => {
    Swal.fire({
      title: "📦 Parcel Details",
      html: `
        <div style="text-align: left">
          <p><strong>Tracking ID:</strong> ${parcel.trackingId}</p>
          <p><strong>Type:</strong> ${parcel.type}</p>
          <p><strong>Title:</strong> ${parcel.title}</p>
          <p><strong>Weight:</strong> ${parcel.weight}kg</p>
          <p><strong>Sender:</strong> ${parcel.senderName} (${
        parcel.senderContact
      })</p>
          <p><strong>Receiver:</strong> ${parcel.receiverName} (${
        parcel.receiverContact
      })</p>
          <p><strong>From:</strong> ${parcel.senderRegion} → ${
        parcel.receiverRegion
      }</p>
          <p><strong>Cost:</strong> ৳${parcel.cost || "N/A"}</p>
          <p><strong>Status:</strong> ${parcel.delivery_status}</p>
          <p><strong>Payment:</strong> ${parcel.payment_status}</p>
        </div>
      `,
      confirmButtonText: "Close",
      confirmButtonColor: "#4b5563",
    });
  };

  // Handle Pay
  const handlePay = (parcelId) => {
    navigate(`/dashboard/payment/${parcelId}`);

    // Swal.fire({
    //   title: "Confirm Payment",
    //   text: `Do you want to mark this parcel as paid? (৳${parcel.cost})`,
    //   icon: "question",
    //   showCancelButton: true,
    //   confirmButtonColor: "#16a34a",
    //   cancelButtonColor: "#dc2626",
    //   confirmButtonText: "Yes, Pay",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     //onPay(parcel._id); // calling external function
    //     Swal.fire("Success", "Marked as paid", "success");
    //   }
    // });
  };

  // Handle Delete
  const handleDelete = (parcelId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/parcels/${parcelId}`);
          if (res.data.success) {
            Swal.fire("Deleted!", "Parcel has been deleted.", "success");
            refetch(); //ui update
          }
        } catch (error) {
          Swal.fire("Error", "Failed to delete parcel.", "error");
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      {parcels.length === 0 ? (
        <div className="text-center p-10">
          <p className="text-center py-5 ">
            Sorry{" "}
            <span className="text-lg font-semibold"> {user.displayName} </span>
            You have not added any parcels yet. <br />
            Add parcels now
          </p>{" "}
          <Link className="btn bg-[#CAEB66] rounded-lg" to="/sendParcel">
            Go to add parcel
          </Link>
        </div>
      ) : (
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Title</th>
              <th>Weight</th>
              <th>Cost (৳)</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td className="capitalize">{parcel.type}</td>
                <td>{format(new Date(parcel.creation_date), "PPPp")}</td>
                <td>{parcel.title}</td>
                <td>{parcel.weight}kg</td>
                <td>৳{parcel.cost || "—"}</td>

                <td>
                  <span
                    className={`badge ${
                      parcel.payment_status === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>

                <td className="space-x-1">
                  <button
                    onClick={() => handleView(parcel)}
                    className="btn btn-xs btn-outline btn-info"
                  >
                    View
                  </button>

                  {parcel.payment_status !== "paid" && (
                    <button
                      // to="/dashboard/payment"
                      onClick={() => handlePay(parcel._id)}
                      className="btn btn-xs btn-outline btn-success"
                    >
                      Pay
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-xs btn-outline btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
// {parcels.length === 0 && (
//
//           )}
export default MyParcels;
