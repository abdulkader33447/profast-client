import React, { useState } from "react";
import { useForm } from "react-hook-form";
import regions from "..//../../public/warehouses.json";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const generateTrackingId = () => {
  
  const randomPart = Math.random().toString(36).substr(2, 5).toUpperCase();
  const datePart = Date.now().toString().slice(-5);
  return `TRK-${randomPart}${datePart}`;
};

const SendParcel = () => {
  // console.log(regions);
  const [selectedSenderRegion, setSelectedSenderRegion] = useState("");
  const [selectedReceiverRegion, setSelectedReceiverRegion] = useState("");
  const [pendingParcelData, setPendingParcelData] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  console.log(user, "in the add parcel");
  const axiosSecure = useAxiosSecure();

  const [deliveryCost, setDeliveryCost] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const parcelType = watch("type");

  const calculateCost = (data) => {
    const sameDistrict = data.senderRegion === data.receiverRegion;
    const type = data.type;
    const weight = parseFloat(data.weight) || 0;

    if (type === "document") {
      return sameDistrict ? 60 : 80;
    }

    if (weight <= 3) {
      return sameDistrict ? 110 : 150;
    } else {
      const extraKg = weight - 3;
      const extraCost = extraKg * 40;
      if (sameDistrict) {
        return 110 + extraCost;
      } else {
        return 150 + extraCost + 40;
      }
    }
  };

  const onSubmit = (data) => {
    const cost = calculateCost(data);
    setDeliveryCost(cost);
    // setShowConfirm(true);
    setPendingParcelData(data); //save form data for confirm
    // console.log("parcel added", data);

    Swal.fire({
      title: "📦 Estimated Delivery Cost",
      html: (() => {
        const sameDistrict = data.senderRegion === data.receiverRegion;
        const type = data.type;
        const weight = parseFloat(data.weight) || 0;

        let baseCost = 0;
        let extraWeightCharge = 0;
        let outsideDistrictCharge = 0;

        if (type === "document") {
          baseCost = sameDistrict ? 60 : 80;
        } else {
          baseCost = sameDistrict ? 110 : 150;
          if (weight > 3) {
            extraWeightCharge = (weight - 3) * 40;
            if (!sameDistrict) outsideDistrictCharge = 40;
          }
        }

        const extraCost = extraWeightCharge + outsideDistrictCharge;
        const total = baseCost + extraCost;

        return `
      <div class="text-left text-sm leading-relaxed space-y-1">
        <p><b>📦 Parcel Type:</b> ${
          type === "document" ? "Document" : "Non-Document"
        }</p>
        ${
          type === "non-document" ? `<p><b>⚖️ Weight:</b> ${weight} kg</p>` : ""
        }
        <p><b>📍 Delivery Zone:</b> ${
          sameDistrict ? "Same District" : "Different District"
        }</p>
        <hr class="my-2 border" />
        <p>🔸 <b>Base Cost:</b> ৳${baseCost}</p>
        <p>🔸 <b>Extra Cost:</b> ৳${extraCost}</p>
        ${
          extraCost > 0
            ? `
          <div class="ml-3 text-gray-600 text-sm space-y-1">
            ${
              extraWeightCharge
                ? `<p>▪ Extra Weight Charge: ৳${extraWeightCharge}</p>`
                : ""
            }
            ${
              outsideDistrictCharge
                ? `<p>▪ Additional Zone Charge: ৳${outsideDistrictCharge}</p>`
                : ""
            }
          </div>`
            : ""
        }
        <hr class="my-2 border-black" />
        <p class="text-lg font-bold text-green-600">💰 Total Cost: ৳${total}</p>
      </div>
    `;
      })(),
      icon: "info",
      showCancelButton: true,
      confirmButtonText: " Proceed to Payment",
      cancelButtonText: "✏️ Edit Parcel",
      customClass: {
        confirmButton: "bg-[#CAEB66] text-black px-4 py-2 rounded mr-4",
        cancelButton: "bg-gray-200 text-black px-4 py-2 rounded",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirm(data, cost);
      }
    });
  };

  const handleConfirm = (data, cost) => {
    const parcels = {
      ...data,
      trackingId: generateTrackingId(),
      creation_date: new Date().toISOString(),
      created_by: user?.email || "anonymous",
      delivery_status: "not collected!",
      payment_status: "unpaid",
      cost: cost,
    };

    // console.log("Saving parcel to DB:", parcels)
    //saving parcel to db
    axiosSecure.post("/parcels", parcels).then((res) => {
      if (res.data.insertedId) {
        //TODO: redirect to the payment page

        Swal.fire("Success!", "Parcel info saved successfully!", "success");
        reset();
        setDeliveryCost(null);
      }
      console.log(res.data);
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-base-100 rounded-xl shadow-lg my-10">
      <h2 className="text-2xl font-bold mb-1">Add New Parcel</h2>
      <p className="mb-6 text-sm text-gray-500">
        Fill out the form to create a delivery parcel request
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Info */}
        <fieldset className="border rounded p-4">
          <legend className="text-lg font-semibold">📦 Parcel Info</legend>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <div>
              <label className="label">Type</label>
              <select
                {...register("type", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select</option>
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div>
              <label className="label">Title</label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.title && <p className="text-red-500 text-sm">Required</p>}
            </div>

            {parcelType === "non-document" && (
              <div>
                <label className="label">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  {...register("weight")}
                  className="input input-bordered w-full"
                />
              </div>
            )}
          </div>
        </fieldset>

        <div className="flex sm:flex-row flex-col gap-8">
          {/* Sender Info */}
          <fieldset className="flex-1 border rounded p-4">
            <legend className="text-lg font-semibold">🧍 Sender Info</legend>

            <div className="grid grid-cols-1  gap-4 mt-3">
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("senderName", { required: true })}
                  className="input input-bordered w-full"
                  // defaultValue={user.displayName}
                  // readOnly
                  // readOnly
                />
              </div>

              <div>
                <label className="label">Contact</label>
                <input
                  type="text"
                  {...register("senderContact", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.senderContact && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div>
                <label className="label">Region</label>
                <select
                  {...register("senderRegion", { required: true })}
                  onChange={(e) => setSelectedSenderRegion(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {regions.map((region, index) => (
                    <option key={index}>{region.district}</option>
                  ))}
                </select>
                {errors.senderRegion && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div>
                <label className="label">Service Center</label>
                <select
                  {...register("senderCenter", { required: true })}
                  className="select select-bordered w-full"
                  disabled={!selectedSenderRegion}
                >
                  <option value="">Select Center</option>
                  {regions
                    .filter(
                      (region) => region.district === selectedSenderRegion
                    )
                    ?.map((item, idx) =>
                      item.covered_area.map((center, i) => (
                        <option key={`${idx}-${i}`} value={center}>
                          {center}
                        </option>
                      ))
                    )}
                </select>
                {errors.senderCenter && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div>
                <label className="label">Address</label>
                <input
                  type="text"
                  {...register("senderAddress", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.senderAddress && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div>
                <label className="label">Pick-up Instruction</label>
                <textarea
                  className="textarea w-full"
                  {...register("pickupInstruction", { required: true })}
                />
                {errors.pickupInstruction && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Receiver Info */}
          <fieldset className="flex-1 border rounded p-4 ">
            <legend className="text-lg font-semibold">📮 Receiver Info</legend>

            <div className="grid grid-cols-1  gap-4 mt-3">
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("receiverName", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.receiverName && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div>
                <label className="label">Contact</label>
                <input
                  type="text"
                  {...register("receiverContact", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.receiverContact && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div>
                <label className="label">Region</label>
                <select
                  {...register("receiverRegion", { required: true })}
                  onChange={(e) => setSelectedReceiverRegion(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {regions.map((region, index) => (
                    <option key={index}>{region.district}</option>
                  ))}
                </select>
                {errors.senderRegion && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div>
                <label className="label">Service Center</label>
                <select
                  {...register("receiverCenter", { required: true })}
                  className="select select-bordered w-full"
                  disabled={!selectedReceiverRegion}
                >
                  <option value="">Select Center</option>
                  {regions
                    .filter(
                      (region) => region.district === selectedReceiverRegion
                    )
                    ?.map((item, idx) =>
                      item.covered_area.map((center, i) => (
                        <option key={`${idx}-${i}`} value={center}>
                          {center}
                        </option>
                      ))
                    )}
                </select>
                {errors.senderCenter && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div>
                <label className="label">Address</label>
                <input
                  type="text"
                  {...register("receiverAddress", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.receiverAddress && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div>
                <label className="label">Delivery Instruction</label>
                {/* <input
                  type="text"
                  {...register("deliveryInstruction", { required: true })}
                  className="input input-bordered w-full"
                /> */}
                <textarea
                  className="textarea w-full"
                  {...register("deliveryInstruction", { required: true })}
                />
                {errors.deliveryInstruction && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>
            </div>
          </fieldset>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            onSubmit={handleConfirm}
            className="btn bg-[#CAEB66] rounded-lg"
          >
            Submit Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
