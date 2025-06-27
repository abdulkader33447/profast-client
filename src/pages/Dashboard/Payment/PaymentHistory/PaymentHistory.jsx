import React from "react";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { format } from "date-fns";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isPending } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user?.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return <span className="loading loading-spinner loading-lg mx-auto my-10 block"></span>;
  }

  return (
    <div className="overflow-x-auto mt-5">
      <h2 className="text-xl font-bold mb-4 text-center">🧾 My Payment History</h2>

      <table className="table table-zebra w-full shadow rounded-lg">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Transaction ID</th>
            <th>Parcel ID</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Payment Time</th>
          </tr>
        </thead>
        <tbody>
          {payments?.map((payment, index) => (
            <tr key={payment._id}>
              <td>{index + 1}</td>
              <td className="text-sm">{payment.transactionId}</td>
              <td className="text-sm">{payment._id}</td>
              <td className="text-sm">{user.email}</td>
              <td>৳{payment.amount}</td>
              <td className="capitalize">{payment.paymentMethod}</td>
              <td>{format(new Date(payment.paymentTime), "PPPp")}</td>
            </tr>
          ))}
          {payments.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-5">
                No payment history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
