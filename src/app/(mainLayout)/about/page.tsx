"use client";
import Image from "next/image";

const AboutPage = () => {
  return (
    <section className="bg-gradient-to-b  from-gray-300 via-gray-900 to-grey-500 py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* Left: Image */}
        <div className="relative w-full md:w-1/2">
          <Image
            src="https://www.slashgear.com/img/gallery/the-most-expensive-motorcycles-from-every-major-brand-ranked-worst-to-best/suzuki-gsx1300r-hayabusa-1694201585.jpg"
            alt="About Us Motorcycle"
            width={600}
            height={400}
            className="rounded-3xl object-cover shadow-xl"
          />
          <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
            EST. 2015
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-red-500">About RideX</h2>
          <p className="text-gray-300">
            RideX Motors has been the heartbeat of New York’s two-wheeler
            culture since 2015. We specialize in top-brand motorcycles,
            accessories, and premium after-sales service.
          </p>
          <p className="text-gray-400">
            Whether you’re a daily commuter, a weekend explorer, or a
            performance junkie — RideX brings you the perfect machine. We
            believe in **quality, reliability,** and an **unforgettable riding
            experience**.
          </p>

          <div className="grid grid-cols-2 gap-4 text-center text-sm">
            <div className="bg-red-600 p-4 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold">2000+</h4>
              <p>Satisfied Riders</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold">150+</h4>
              <p>Top Models In Stock</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
