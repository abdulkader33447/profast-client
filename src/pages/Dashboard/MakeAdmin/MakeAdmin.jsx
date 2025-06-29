import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [searchText, setSearchText] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");

  // 🔍 Search user suggestions
  const { data: suggestions = [] } = useQuery({
    queryKey: ["userSuggestions", searchText],
    enabled: searchText.length >= 2,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/search?email=${searchText}`);
      return res.data;
    },
  });

  // 🔎 Selected user info
  const {
    data: selectedUser,
    // refetch: refetchSelectedUser,
    isFetching: userLoading,
  } = useQuery({
    queryKey: ["selectedUser", selectedEmail],
    enabled: !!selectedEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/search?email=${selectedEmail}`);
      return res.data[0]; // only one user will match
    },
  });
  // console.log(selectedUser);

  // 🔁 Role change mutation
  const { mutateAsync: updateRole, isPending: updating } = useMutation({
    mutationFn: async ({ email, role }) => {
      return axiosSecure.patch(`/users/${email}/role`, { role });
    },
    onSuccess: (_, { email, role }) => {
      Swal.fire("Success", `User is now ${role}`, "success");
      queryClient.invalidateQueries(["selectedUser", email]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to update role", "error");
    },
  });

  const handleSelect = (email) => {
    setSelectedEmail(email);
    setSearchText(email);
  };

  // const handleRoleChange = async (role) => {
  //   if (!selectedUser) return;
  //   await updateRole({ email: selectedUser.email, role });
  // };

  const handleRoleChange = async (role) => {
    if (!selectedUser) return;

    const result = await Swal.fire({
      title: role === "admin" ? "Make this user admin?" : "Remove admin role?",
      text: `Are you sure you want to ${
        role === "admin" ? "promote" : "demote"
      } ${selectedUser.email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
      confirmButtonText:
        role === "admin" ? "Yes, make admin" : "Yes, remove admin",
    });

    if (result.isConfirmed) {
      await updateRole({ email: selectedUser.email, role });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Make / Remove Admin</h2>

      <div className="relative">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Search by email"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setSelectedEmail(""); // reset selected user
            // refetchSuggestions();
          }}
        />
        {suggestions.length > 0 && !selectedEmail && (
          <ul className="absolute bg-white border w-full z-10 shadow-md mt-1 max-h-60 overflow-auto">
            {suggestions.map((user) => (
              <li
                key={user.email}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(user.email)}
              >
                {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Show user info and role controls */}
      {selectedUser && (
        <div className="card bg-base-100 shadow p-4 mt-4 space-y-2">
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {selectedUser.created_at
              ? new Date(selectedUser.created_at).toLocaleString("en-US", {
                  timeZone: "Asia/Dhaka",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "N/A"}
          </p>
          <p>
            <strong>Role:</strong> {selectedUser.role || "user"}
          </p>

          <div className="flex gap-2 mt-2">
            {selectedUser.role !== "admin" ? (
              <button
                className="btn bg-[#CAEB66] border-none rounded-lg hover:shadow-[0_0_20px_#CAEB66]"
                disabled={updating}
                onClick={() => handleRoleChange("admin")}
              >
                Make Admin
              </button>
            ) : (
              <button
                className="btn btn-warning btn-sm"
                disabled={updating}
                onClick={() => handleRoleChange("user")}
              >
                Remove Admin
              </button>
            )}
          </div>
        </div>
      )}

      {userLoading && (
        <p className="mt-4 text-gray-500">Loading user info...</p>
      )}
    </div>
  );
};

export default MakeAdmin;
