import React from "react";

const Faq = () => {
  return (
    <div className="sm:w-6/12 w-11/12 mx-auto sm:my-25 my-10 text-center">
      <div className="space-y-4 mb-10">
        <h1 className="sm:text-3xl text-xl font-bold text-center">
          Frequently Asked Question (FAQ)
        </h1>
        <p className="text-center max-w-xl mx-auto mt-2">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      <div className="space-y-5">
        <div className="collapse collapse-arrow  bg-base-100  text-start ">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold ">
            How do I create an account?
          </div>
          <div className="collapse-content text-sm">
            <div className="border-t border-dashed border-base-400 mb-3"></div>
            Click the "Sign Up" button in the top right corner and follow the
            registration process.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border text-start border-base-300">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold ">
            How do I create an account?
          </div>
          <div className="collapse-content text-sm">
            <div className="border-b border-dashed border-base-400 mt-3"></div>
            Click the "Sign Up" button in the top right corner and follow the
            registration process.
          </div>
        </div>
        <button className="btn bg-[#CAEB66] rounded-lg">See More FAQ’s</button>
      </div>
    </div>
  );
};

export default Faq;
