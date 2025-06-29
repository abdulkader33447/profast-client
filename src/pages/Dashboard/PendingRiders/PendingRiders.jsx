import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegEye } from "react-icons/fa";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Home/Home/shared/LoadingSpinner/LoadingSpinner";
// adjust path as needed

const PendingRiders = () => {
  // const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();

  // useEffect(() => {
  //   fetchPendingRiders();
  // }, []);

  // const fetchPendingRiders = async () => {
  //   try {
  //     const res = await axiosSecure.get("/riders/pending");
  //     setRiders(res.data);
  //   } catch (error) {
  //     console.error("Error fetching riders:", error);
  //   }
  // };

  const {
    isPending,
    data: riders = [],
    refetch,
  } = useQuery({
    queryKey: ["pending riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  // const approveRider = async (id) => {
  //   try {
  //     setLoading(true);
  //     await axiosSecure.patch(`/riders/${id}/approve`);
  //     // fetchPendingRiders();
  //     refetch();
  //   } catch (error) {
  //     console.error("Error approving rider:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const approveRider = async (id, email) => {
    // console.log("approving rider with emil",email);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this rider?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await axiosSecure.patch(`/riders/${id}/status`, {
          status: "approved",
          email,
          // approvedAt: new Date().toLocaleString("en-US", {
          //   timeZone: "Asia/Dhaka",
          //   year: "numeric",
          //   month: "short",
          //   day: "numeric",
          //   hour: "2-digit",
          //   minute: "2-digit",
          //   hour12: true,
          // }),
        });
        refetch();
        Swal.fire("Approved!", "The rider has been approved.", "success");
      } catch (error) {
        console.error("Error approving rider:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  // const cancelRider = async (id) => {
  //   try {
  //     setLoading(true);
  //     await axiosSecure.patch(`/riders/${id}/cancel`);
  //     fetchPendingRiders();
  //   } catch (error) {
  //     console.error("Error canceling rider:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const cancelRider = async (id) => {
  //   const result = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "Do you really want to cancel this rider application?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Yes, cancel it!",
  //   });

  //   if (result.isConfirmed) {
  //     try {
  //       setLoading(true);
  //       await axiosSecure.patch(`/riders/${id}/status`);
  //       // fetchPendingRiders();
  //       refetch()
  //       Swal.fire("Cancelled!", "The rider has been cancelled.", "success");
  //     } catch (error) {
  //       console.error("Error canceling rider:", error);
  //       Swal.fire("Error!", "Something went wrong.", "error");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  const cancelRider = async (id, email) => {
    // console.log("cancelling rider with email",email);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this rider application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);

        await axiosSecure.patch(`/riders/${id}/status`, {
          status: "cancelled",
          email,
        });
        refetch();
        Swal.fire("Cancelled!", "The rider has been cancelled.", "success");
      } catch (error) {
        console.error("Error canceling rider:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const openModal = (rider) => {
    setSelectedRider(rider);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRider(null);
    setModalOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Pending Riders</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr className="bg-gray-100 text-lg">
            <th>Name</th>
            <th>Email</th>
            <th>District</th>
            <th>Phone</th>
            <th>Applied On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {riders.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No pending riders.
              </td>
            </tr>
          ) : (
            riders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td>{rider.phone}</td>
                <td>{new Date(rider.appliedAt).toLocaleDateString()}</td>
                <td className="sm:space-x-3 space-y-2">
                  <button
                    onClick={() => openModal(rider)}
                    className="cursor-pointer bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    <FaRegEye />
                  </button>
                  <button
                    onClick={() => approveRider(rider._id, rider.email)}
                    disabled={loading}
                    className="cursor-pointer bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50"
                  >
                    <IoCheckmarkSharp />
                  </button>
                  <button
                    onClick={() => cancelRider(rider._id, rider.email)}
                    disabled={loading}
                    className="cursor-pointer bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50"
                  >
                    <MdOutlineCancel />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {modalOpen && selectedRider && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000077] bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Rider Details</h3>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {selectedRider.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRider.email}
              </p>
              <p>
                <strong>Region:</strong> {selectedRider.region}
              </p>
              <p>
                <strong>District:</strong> {selectedRider.district}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRider.phone}
              </p>
              <p>
                <strong>Address:</strong> {selectedRider.address || "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {selectedRider.status}
              </p>
              <p>
                <strong>Applied On:</strong>{" "}
                {new Date(selectedRider.appliedAt).toLocaleString()}
              </p>
              {/* Add more fields here if needed */}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() =>
                  approveRider(selectedRider._id, selectedRider.email)
                }
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Approve
              </button>
              <button
                onClick={() =>
                  cancelRider(selectedRider._id, selectedRider.email)
                }
                disabled={loading}
                className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-400 text-black px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
