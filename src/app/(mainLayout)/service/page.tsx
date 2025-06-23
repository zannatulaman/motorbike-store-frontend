"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Truck, Settings, Shield } from "lucide-react"; // Use icons related to services

const servicesData = [
  {
    id: 1,
    icon: <Truck size={32} className="text-blue-600" />,
    title: "Fast Delivery",
    description: "Get your motorbike parts delivered quickly and safely.",
  },
  {
    id: 2,
    icon: <Settings size={32} className="text-green-600" />,
    title: "Maintenance & Repair",
    description:
      "Expert bike maintenance and repair services to keep you riding.",
  },
  {
    id: 3,
    icon: <Shield size={32} className="text-red-600" />,
    title: "Warranty & Support",
    description:
      "Reliable warranty and 24/7 customer support for peace of mind.",
  },
];

const ServicesPage = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Our Services
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Separator className="my-6" />
          <div className="grid gap-8 md:grid-cols-3">
            {servicesData.map(({ id, icon, title, description }) => (
              <div
                key={id}
                className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">{icon}</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesPage;
