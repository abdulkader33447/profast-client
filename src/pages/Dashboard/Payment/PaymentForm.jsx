import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Home/Home/shared/LoadingSpinner/LoadingSpinner";
import useTrackingLogger from "../../../hooks/useTrackingLogger";

const PaymentForm = () => {
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { logTracking } = useTrackingLogger();
  const navigate = useNavigate();

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  if (isPending) {
    return <LoadingSpinner />;
  }

  // console.log(parcelInfo);
  const amount = Number(parcelInfo?.cost || 0);
  const amountInCents = amount * 100;
  // console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    //step:1 validate the card

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.error("Payment error:", error.message);
      setProcessing(false);
    } else {
      console.log("[payment method]", paymentMethod);

      //step:2 create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        parcelId,
      });
      const clientSecret = res.data.clientSecret;

      //step:3 confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        console.error("Confirm Payment Error:", result.error.message); // log
        Swal.fire({
          icon: "error",
          title: "Payment Failed!",
          text: result.error.message,
          confirmButtonColor: "#d33",
        });
        setProcessing(false);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          const transactionId = result.paymentIntent.id;
          console.log("payment succeeded!");

          //step:4 mark parcel paid also create payment history
          const paymentData = {
            parcelId,
            email: user.email,
            amount,
            transactionId: transactionId,
            paymentMethod: result.paymentIntent.payment_method_types[0],
            paymentTime: new Date().toLocaleString(),
          };
          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
            // ✅ Show success alert
            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              html: `Transaction ID: <strong>${transactionId}</strong>`,
              confirmButtonColor: "#CAEB66",
            }).then(async () => {
              //tracking parcel
              await logTracking({
                tracking_id: parcelInfo?.trackingId,
                status: "payment_done",
                details: `paid by: ${user?.displayName}`,
                // location: `${data.senderRegion} - ${data.senderCenter}`,
                updated_by: user?.email,
              });
              // 🔁 Redirect to MyParcels
              navigate("/dashboard/myParcels");
            });
          }
        }
        setProcessing(false);
      }

      // console.log("res from intent", res);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded">
          {/* {message && <p>{}</p>} */}
        </CardElement>
        <button
          type="submit"
          className="btn bg-[#CAEB66] rounded-lg w-full"
          disabled={!stripe || processing}
        >
          {processing ? "Processing..." : `Pay $${amount}`}
        </button>
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
