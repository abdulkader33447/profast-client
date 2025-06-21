import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <Carousel className=" sm:max-w-7xl w-11/12 mx-auto"
      autoPlay={true}
      infiniteLoop={true}
      stopOnHover
      showThumbs={false}
      showStatus={false}
      interval={3000}
      
    >
      <div>
        <img className="rounded-2xl mt-11" src={bannerImg1} />
        {/* <p className="legend">Legend 1</p> */}
      </div>
      <div>
        <img className="rounded-2xl mt-11" src={bannerImg2} />
        {/* <p className="legend">Legend 2</p> */}
      </div>
      <div>
        <img className="rounded-2xl mt-11" src={bannerImg3} />
        {/* <p className="legend">Legend 3</p> */}
      </div>
    </Carousel>
  );
};

export default Banner;
