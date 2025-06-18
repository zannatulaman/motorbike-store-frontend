"use client";

import Image from "next/image";

const logos = [
  "https://theroadking.netlify.app/images/brands/royal.png",
  "https://theroadking.netlify.app/images/brands/suzuki.png",
  "https://theroadking.netlify.app/images/brands/honda.png",
  "https://theroadking.netlify.app/images/brands/bmw.png",
  "https://theroadking.netlify.app/images/brands/duc.png",
];

const Marquee = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-amber-50 py-6 mt-10">
      <h2 className="text-5xl text-black text-center font-bold my-5">
        Our Featured Brands
      </h2>
      <div className="flex animate-marquee gap-8 mt-10">
        {logos.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Logo ${index + 1}`}
            width={150}
            height={100}
            className="object-contain"
          />
        ))}
        {/* Duplicate logos for seamless loop */}
        {logos.map((src, index) => (
          <Image
            key={`dup-${index}`}
            src={src}
            alt={`Logo ${index + 1}`}
            width={150}
            height={100}
            className="object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default Marquee;
