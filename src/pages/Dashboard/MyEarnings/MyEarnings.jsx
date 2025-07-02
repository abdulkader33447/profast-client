import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMoneyBillWave, FaCashRegister, FaClock } from "react-icons/fa";
import { getWeek, format } from "date-fns";
import LoadingSpinner from "../../Home/Home/shared/LoadingSpinner/LoadingSpinner";

const MyEarnings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // React Query to fetch earnings, only enabled when user.email is present
  const { data: earnings = {}, isLoading } = useQuery({
    queryKey: ["riderEarnings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/earnings", {
        params: { email: user.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  const today = format(new Date(), "PPPP");
  const weekNumber = getWeek(new Date());

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto my-10 p-4">
      <h2 className="text-2xl font-bold mb-1">💰 My Earnings</h2>
      <p className="text-gray-500 mb-6">
        {today} — Week {weekNumber}
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-100 p-5 rounded-xl shadow">
          <FaMoneyBillWave className="text-green-600 text-3xl mb-2" />
          <p className="text-xl font-semibold">৳ {earnings.total || 0}</p>
          <p className="text-gray-600">Total Earned</p>
        </div>
        <div className="bg-blue-100 p-5 rounded-xl shadow">
          <FaCashRegister className="text-blue-600 text-3xl mb-2" />
          <p className="text-xl font-semibold">৳ {earnings.cashedOut || 0}</p>
          <p className="text-gray-600">Cashed Out</p>
        </div>
        <div className="bg-yellow-100 p-5 rounded-xl shadow">
          <FaClock className="text-yellow-600 text-3xl mb-2" />
          <p className="text-xl font-semibold">৳ {earnings.pending || 0}</p>
          <p className="text-gray-600">Pending</p>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border p-4 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-bold">৳ {earnings.today || 0}</p>
        </div>
        <div className="bg-white border p-4 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500">This Week</p>
          <p className="text-lg font-bold">৳ {earnings.week || 0}</p>
        </div>
        <div className="bg-white border p-4 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-lg font-bold">৳ {earnings.month || 0}</p>
        </div>
        <div className="bg-white border p-4 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500">This Year</p>
          <p className="text-lg font-bold">৳ {earnings.year || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default MyEarnings;
