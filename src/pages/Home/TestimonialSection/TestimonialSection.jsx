import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./TestimonialSection.css";
import sectionImg from "../../../assets/customer-top.png"; // your top image
import { useEffect, useState } from "react";
// import { testimonials } from "./testimonialData"; // place the JSON in a separate file or here

const TestimonialSection = () => {
  const [slidePercent, setSlidePercent] = useState(20); // default for desktop

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSlidePercent(100); // mobile
      } else if (width < 1024) {
        setSlidePercent(50); // tablet
      } else if (width < 1280) {
        setSlidePercent(33.33); // laptop
      } else {
        setSlidePercent(20); // desktop
      }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Awlad Hossin",
      designation: "Senior Product Designer",
      feedback:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
      id: 2,
      name: "Rasel Ahamed",
      designation: "CTO",
      feedback:
        "I've been using this service for a few months, and the consistency in delivery and support is impressive. It’s smooth and reliable every time.",
    },
    {
      id: 3,
      name: "Nasir Uddin",
      designation: "CEO",
      feedback:
        "Reliable, efficient, and on time. Highly recommend their logistics service for any growing business.",
    },
    {
      id: 4,
      name: "Sara Jahan",
      designation: "Operations Manager",
      feedback:
        "Our company’s delivery process improved drastically with their timely pickup and tracking features. Love the experience!",
    },
    {
      id: 5,
      name: "Rahim Uddin",
      designation: "Logistics Head",
      feedback:
        "Their dashboard gives me real-time insights on delivery status, which makes decision-making faster and easier.",
    },
    {
      id: 6,
      name: "Tanvir Islam",
      designation: "Freelance Seller",
      feedback:
        "Cash on delivery works flawlessly. I get payment fast and never have to chase customer updates.",
    },
    {
      id: 7,
      name: "Sadia Rahman",
      designation: "Digital Marketer",
      feedback:
        "The support team is always helpful and polite, even at midnight! It’s a rare find in logistics.",
    },
    {
      id: 8,
      name: "Kawsar Ahmed",
      designation: "Vendor Partner",
      feedback:
        "Parcel return and exchange system is smooth, and that helps build customer trust for my brand.",
    },
    {
      id: 9,
      name: "Tania Akter",
      designation: "E-commerce Owner",
      feedback:
        "Delivery coverage is nationwide and fast. I rarely face issues even in remote areas.",
    },
    {
      id: 10,
      name: "Mehedi Hasan",
      designation: "Tech Entrepreneur",
      feedback:
        "Tracking and status updates keep our clients informed without extra manual work. Great system!",
    },
  ];

  return (
    <section className="px-4 md:px-10 py-12 w-full text-center relative">
      {/* Top Image + Title + Description */}
      <div className="pb-15 ">
        <img
          src={sectionImg}
          alt="Testimonial Illustration"
          className="mx-auto object-contain"
        />
        <h2 className="text-3xl font-bold mt-4">What Our Clients Say</h2>
        <p className="text-gray-600 max-w-xl mx-auto mt-2">
          Hear from our happy clients about how our service has made delivery
          smoother and more reliable.
        </p>
      </div>

      {/* Slider */}
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={4000}
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        centerMode={true}
        centerSlidePercentage={slidePercent}
        swipeable={false}
        emulateTouch={false}
        className="max-w-8xl mx-auto z-50"
      >
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-base-200 mx-2 p-6 rounded-xl shadow-[0_0_10px_#CAEB66] h-full flex flex-col justify-between"
          >
            <p className="text-sm text-gray-700 mb-4">
              <span className="text-5xl text-primary ">“</span>
              {item.feedback}
            </p>
            <hr className="border-dashed border-gray-300 my-4" />
            <div className="flex gap-5">
              <p className="w-8 h-8 bg-[#03464D] rounded-full"></p>
              <div className="text-start">
                <h4 className="text-base font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.designation}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default TestimonialSection;
