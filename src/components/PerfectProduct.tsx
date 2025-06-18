"use client";

import React from "react";
import Lottie from "lottie-react";
import motorbikeAnimation from "../../public/motorbike.json";

const PerfectProduct = () => {
  return (
    <section className="bg-amber-50 py-16 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Left: Heading & Description */}
        <div className="md:w-1/2 text-center md:text-left space-y-6 pl-0 md:pl-8 lg:pl-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
            Find Your Perfect Product
          </h2>
          <p className="text-lg text-gray-600">
            Whether you are upgrading your gear or maintaining your ride, we
            offer the highest quality products tailored to your needs.
          </p>
          <button className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg text-base hover:bg-red-800 transition duration-300">
            Explore Products
          </button>
        </div>

        {/* Right: Lottie Animation */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full max-w-md">
            <Lottie animationData={motorbikeAnimation} loop autoplay />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfectProduct;
