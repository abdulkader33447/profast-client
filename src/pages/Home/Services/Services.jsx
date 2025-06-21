import {
  FaShippingFast,
  FaGlobe,
  FaBoxes,
  FaHandHoldingUsd,
  FaBuilding,
  FaUndo,
} from "react-icons/fa";

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaShippingFast className="text-3xl text-primary" />,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <FaGlobe className="text-3xl text-primary" />,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <FaBoxes className="text-3xl text-primary" />,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaHandHoldingUsd className="text-3xl text-primary" />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: <FaBuilding className="text-3xl text-primary" />,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <FaUndo className="text-3xl text-primary" />,
  },
];

const Services = () => {
  return (
    <section className="sm:p-25 p-3 max-w-7xl mx-auto w-11/12  bg-[#03373d] sm:rounded-4xl rounded-2xl my-25 ">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2 text-white">Our Services</h2>
        <p className=" max-w-2xl mx-auto text-white">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-base-100 border hover:bg-[#caeb66] transition-colors duration-500 rounded-2xl p-6 "
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-[#03373d] mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
