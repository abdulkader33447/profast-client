import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaTruck,
  FaBox,
  FaCheckCircle,
  FaShippingFast,
  FaExclamationCircle,
} from "react-icons/fa";
import LoadingSpinner from "../../Home/Home/shared/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define a color palette for each status
const COLORS = [
  "#00C49F", // delivered
  "#FFBB28", // rider_assigned
  "#FF8042", // in-transit
  "#8884d8", // not collected!
];

// icon mapper (you can customize this further)
const statusIcons = {
  delivered: <FaCheckCircle className="text-green-500 text-3xl" />,
  "in-transit": <FaShippingFast className="text-blue-500 text-3xl" />,
  rider_assigned: <FaTruck className="text-orange-500 text-3xl" />,
  pending: <FaBox className="text-yellow-500 text-3xl" />,
  service_center_delivered: <FaTruck className="text-indigo-500 text-3xl" />,
  default: <FaExclamationCircle className="text-gray-500 text-3xl" />,
};

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: statusCounts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["parcelStatusCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcel/delivery/status-count");
      return res.data; // expected format: [{ status: 'delivered', count: 10 }, ...]
    },
  });
  // console.log(statusCounts);

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="text-red-500 text-center p-4">
        Failed to load delivery status data.
      </div>
    );
  }

  return (
    <div className="sm:p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        📦 Parcel Delivery Status Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {statusCounts.map(({ status, count }) => (
          <div key={status} className="shadow rounded-2xl bg-base-200">
            <div className="p-5 space-y-2">
              <div className="">
                {statusIcons[status] || statusIcons.default}
              </div>
              <div className="text-xl font-semibold">
                {status.replace(/_/g, " ")}
              </div>
              <div>Total parcels marked as {status.replace(/_/g, " ")}</div>
              <div className="text-green-500 text-3xl font-extrabold text-center mt-2">
                {count}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* pie chart */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={statusCounts}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {statusCounts.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminDashboard;
