import { FaClipboardCheck, FaMoneyCheckAlt, FaStoreAlt, FaBriefcase } from "react-icons/fa";

const steps = [
  {
    icon: <FaClipboardCheck className="text-4xl text-primary" />,
    title: "Booking Pick & Drop",
    description: "Easily book your parcel pickup online. Our rider collects from your doorstep and ensures timely drop-off to the recipient.",
  },
  {
    icon: <FaMoneyCheckAlt className="text-4xl text-primary" />,
    title: "Cash On Delivery",
    description: "We offer secure cash collection from recipients and ensure fast, verified payment settlement to the merchant.",
  },
  {
    icon: <FaStoreAlt className="text-4xl text-primary" />,
    title: "Delivery Hub",
    description: "Our hubs across Bangladesh ensure smooth last-mile delivery with real-time tracking and customer notifications.",
  },
  {
    icon: <FaBriefcase className="text-4xl text-primary" />,
    title: "Booking SME & Corporate",
    description: "Dedicated booking and logistics support for businesses and corporate clients with dashboard and volume discounts.",
  },
];

const HowItWorks = () => {
  return (
    <section className="sm:px-25 py-12 mt-15  sm:max-w-7xl w-11/12 mx-auto">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-3xl text-[#03373d] font-bold mb-4">How It Works</h2>
        <p className="text-gray-600">
          We’ve simplified delivery. From booking to payment – discover how we keep your parcels moving swiftly and securely.
        </p>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-base-100  hover:bg-[#caeb66] transition-colors duration-600 rounded-2xl p-6 text-start shadow-md"
          >
            <div className="mb-4 flex justify-start">{step.icon}</div>
            <h3 className="text-xl text-[#03373d]  font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-700 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
