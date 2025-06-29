import React from "react";

const Promises = () => {
  const Promises = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    illustration: "https://i.ibb.co/gMkLRD3n/live-tracking.png",
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    illustration: "https://i.ibb.co/QW58S0c/safe-delivery.png",
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    illustration: "https://i.ibb.co/QW58S0c/safe-delivery.png",
  },
];

  return (
    <section className="py-20  sm:max-w-5xl w-11/12 mx-auto border-dashed border-b">
      <h2 className="text-2xl font-bold text-center mb-10">Why Choose Us</h2>
      <div className="space-y-6">
        {Promises.map((Promise) => (
          <div
            key={Promise.id}
            className="flex sm:flex-row flex-col items-center bg-base-200 sm:p-10 hover:shadow-[0_0_18px_#CAEB66] p-5 rounded-xl  gap-6"
          >
            {/* Illustration */}
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={Promise.illustration}
                alt={Promise.title}
                className="w-full h-full  object-contain"
              />
            </div>

            {/* Dotted vertical divider */}
            <div className="h-16 border-l-2 border-dotted border-primary sm:block hidden"></div>

            {/* Title & Description */}
            <div className="sm:text-start text-center">
              <h3 className="text-xl font-semibold mb-2">{Promise.title}</h3>
              <p className="text-gray-700 text-sm">{Promise.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Promises;

