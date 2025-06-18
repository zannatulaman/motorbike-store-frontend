import React from 'react'
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const MidBanner = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Section Heading */}
      <div className="text-center mt-16">
        <h2 className="text-4xl font-bold text-gray-800">Why Choose Us</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Discover the reasons our customers love us. From premium products to
          unmatched support, we strive to provide the best experience possible.
        </p>
      </div>

      {/* Two Cards Centered */}
      <div className="flex justify-center mt-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Card 1 */}
          <Card className="w-full max-w-sm bg-amber-50 shadow-md rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Quality Products
            </h3>
            <p className="text-gray-600 mb-4">
              We offer top-quality motorcycle gear and accessories to ensure
              your ride is safe, smooth, and stylish.
            </p>
            <Button variant="destructive" className="w-full">
              Shop Now  
            </Button>
          </Card>

          {/* Card 2 */}
          <Card className="w-full max-w-sm bg-amber-50 shadow-md rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Trusted Support
            </h3>
            <p className="text-gray-600 mb-4">
              Our support team is here to help with fast responses and expert
              advice — every step of your journey.
            </p>
            <Button variant="destructive" className="w-full">
              Contact Us
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MidBanner