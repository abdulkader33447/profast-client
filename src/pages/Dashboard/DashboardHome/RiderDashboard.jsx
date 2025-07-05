import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../Home/Home/shared/LoadingSpinner/LoadingSpinner";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaTruck,
  FaBox,
  FaCheckCircle,
  FaShippingFast,
  FaExclamationCircle,
} from "react-icons/fa";

const statusIcons = {
  delivered: <FaCheckCircle className="text-green-500 text-3xl" />,
  "in-transit": <FaShippingFast className="text-blue-500 text-3xl" />,
  rider_assigned: <FaTruck className="text-orange-500 text-3xl" />,
  pending: <FaBox className="text-yellow-500 text-3xl" />,
  "not collected!": <FaExclamationCircle className="text-red-500 text-3xl" />,
  default: <FaExclamationCircle className="text-gray-500 text-3xl" />,
};

const statusLabelMap = {
  delivered: "Delivered",
  "in-transit": "In Transit",
  rider_assigned: "Assigned to Rider",
  pending: "Pending",
  "not collected!": "Not Collected",
};

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#f87171"];

const RiderDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: riderStatusCounts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["riderStatusCount", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcel/rider-status-count?riderEmail=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <div className="text-red-500 text-center p-4">
        Failed to load rider delivery status data.
      </div>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        🚴 Rider Parcel Status Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {riderStatusCounts.map(({ status, count }) => (
          <div
            key={status}
            className="bg-base-200 rounded-2xl shadow p-4 text-center space-y-2"
          >
            <div>{statusIcons[status] || statusIcons.default}</div>
            <div className="text-lg font-semibold capitalize">
              {statusLabelMap[status] || status}
            </div>
            <div className="text-green-600 text-3xl font-extrabold">
              {count}
            </div>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={riderStatusCounts}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {riderStatusCounts.map((entry, index) => (
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

export default RiderDashboard;
