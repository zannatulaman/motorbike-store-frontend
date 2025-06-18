"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const Categories = () => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-5xl text-black text-center font-bold my-10">
        🏆 Our Top Picks
      </h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mt-10 px-6">
        {/* Left: Trophy Image */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <Image
            src="/images/tropy.png"
            alt="Trophy cup"
            width={400}
            height={400}
            // className="rounded-xl shadow-lg"
          />
        </div>

        {/* Right: Grid of Cards */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {/* Top Rated Bike */}
          <Card className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-yellow-600">
                ⭐ Best Motorcycle
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Explore our most loved motorcycle — praised for speed, comfort,
                and iconic design. A favorite among riders this season!
              </p>
            </div>
          </Card>

          {/* Popular Accessories */}
          <Card className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-yellow-600">
                🥇 Top Accessories
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our best-selling accessories — helmets, gloves, and more that
                every rider trusts for both style and protection.
              </p>
            </div>
          </Card>

          {/* Featured Maintenance */}
          <Card className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-yellow-600">
                🛠️ Customer Favorite
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Riders rely on these maintenance products to keep bikes in
                excellent condition — rated highly for quality and reliability.
              </p>
            </div>
          </Card>

          {/* Top Style Picks */}
          <Card className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-yellow-600">
                👕 Top Clothing Pick
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Best-rated jackets and gear that combine safety with bold
                fashion — for riders who stand out.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Categories;
