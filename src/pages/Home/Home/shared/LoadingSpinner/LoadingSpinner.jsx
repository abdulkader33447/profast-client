import { FaTruckLoading } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl shadow-xl bg-base-100 border border-base-300">
        <FaTruckLoading className="text-5xl text-[#CAEB66] animate-bounce" />
        <p className="text-lg font-semibold text-base-content">
          Loading your parcel data...
        </p>
        <ImSpinner2 className="text-3xl text-[#CAEB66] animate-spin" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
