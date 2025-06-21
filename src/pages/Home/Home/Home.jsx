import React from "react";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import HowItWorks from "../HowWork/HowWork";
import ClientLogosMarquee from "../ClientLogosMarquee/ClientLogosMarquee";
import Promises from "../Promises/Promises";
import BeMerchant from "../BeMerchant/BeMerchant";
import TestimonialSection from "../TestimonialSection/TestimonialSection";
import Faq from "../Faq/Faq";

const Home = () => {
  return (
    <div className="mt-8">
      <Banner />
      <HowItWorks />
      <Services />
      <ClientLogosMarquee />
      <Promises />
      <BeMerchant />
      <TestimonialSection />
      <Faq />
    </div>
  );
};

export default Home;
