import React from "react";
import location from "../../../assets/location-merchant.png";

const BeMerchant = () => {
  return (
    <div
      data-aos="zoom-in-up"
      className="bg-no-repeat  sm:max-w-5xl w-11/12 mx-auto bg-[url(assets/be-a-merchant-bg.png)] bg-[#03373D] my-20  sm:rounded-4xl rounded-2xl sm:p-20"
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={location} className="sm:max-w-sm " />
        <div>
          <h1 className="sm:text-5xl text-2xl text-white font-bold">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="sm:py-6 text-[#DADADA] mt-4">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex sm:flex-row flex-col space-y-5">
            <button className="btn bg-[#CAEB66] rounded-full mr-5">
              Become a Merchant
            </button>
            <button className="btn btn-outline rounded-full">
              Earn with Profast Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
