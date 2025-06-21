import React from "react";
import Marquee from "react-fast-marquee";

import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/start-people 1.png";
import logo7 from "../../../assets/brands/start.png";

const ClientLogosMarquee = () => {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

  return (
    <section className="py-12 lg:w-5xl md:w-xl mx-auto w-11/12 mt-15 border-dashed border-b pb-25">
      <h2 className="text-2xl font-bold text-center mb-10">
        Trusted by Leading Companies
      </h2>

      <Marquee speed={60} gradient={false} pauseOnHover={true}>
        {logos.map((logo, index) => (
          <div key={index} className="lg:mx-20 md:mx-8 mx-4">
            <img
              src={logo}
              alt={`Client ${index}`}
              className="sm:h-6 md:h-4 h-3 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
      
    </section>
  );
};

export default ClientLogosMarquee;
