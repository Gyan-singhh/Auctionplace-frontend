import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OurNetwork = () => {
  const ourNetwork = [
    {
      id: 1,
      profile: "https://bidout-react.vercel.app/images/bg/sponsor1.png",
    },
    {
      id: 2,
      profile: "https://bidout-react.vercel.app/images/bg/sponsor3.png",
    },
    {
      id: 3,
      profile: "https://bidout-react.vercel.app/images/bg/sponsor2.png",
    },
    {
      id: 4,
      profile: "https://bidout-react.vercel.app/images/bg/sponsor4.png",
    },
    {
      id: 5,
      profile: "https://bidout-react.vercel.app/images/bg/sponsor5.png",
    },
    {
      id: 6,
      profile: "https://bidout-react.vercel.app/images/bg/sponsor6.png",
    },
    {
      id: 7,
      profile: "https://bidout-react.vercel.app/images/bg/sponsor7.png",
    },
    {
      id: 8,
      profile: "https://bidout-react.vercel.app/images/bg/sponsor8.png",
    },
    {
      id: 9,
      profile: "https://bidout-react.vercel.app/images/bg/sponsor9.png",
    },
    {
      id: 10,
      profile: "https://bidout-react.vercel.app/images/bg/sponsor1.png",
    },
    {
      id: 4,
      profile: "https://bidout-react.vercel.app/images/bg/sponsor3.png",
    },
    {
      id: 5,
      profile: "https://bidout-react.vercel.app/images/bg/sponsor8.png",
    },
    {
      id: 6,
      profile: "https://bidout-react.vercel.app/images/bg/sponsor1.png",
    },
    {
      id: 7,
      profile: "https://bidout-react.vercel.app/images/bg/sponsor9.png",
    },
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="pt-16 relative z-10 w-[90%] m-auto pb-10">
      <div className="text-center mb-12">
        <h4 className="text-3xl font-bold text-gray-800">
          Trusted by 500+ Businesses
        </h4>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">
          Join the world's best and largest bidding marketplace with our amazing
          products. Be a part of our journey towards success and growth.
        </p>
      </div>

      <Slider {...settings}>
        {ourNetwork.map((item, index) => (
          <div key={index} className="">
            <div className="flex items-center justify-center">
              <div className="border border-gray-200 shadow-md rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out">
                <img
                  src={item.profile}
                  alt={`Profile ${index + 1}`}
                  className="h-30 rounded-lg object-cover w-80 md:w-60"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default OurNetwork;
