"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Service } from "@/types";
import Link from "next/link";

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/service/get"
        );
        setServices(response.data.data);
        console.log("Services fetched successfully:", response.data.data.id);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  console.log("Fetched services:", services);

  if (loading) {
    return (
      <p className="text-center py-12 text-gray-700">Loading services...</p>
    );
  }

  return (
    <section className="py-12 bg-gray-100 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10">
          Motorcycle Repair & Maintenance Services
        </h1>

        {services.length === 0 ? (
          <p className="text-center text-gray-600">
            No services available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ _id, image, name, description, price }) => (
              <div className="p-4" key={_id}>
                <Card className="flex flex-col h-full">
                  <Image
                    width={300}
                    height={200}
                    src={image}
                    alt={name || "Service image"}
                    className="w-full h-48 object-cover rounded-t-lg"
                    priority={false}
                  />
                  <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">
                      {name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center flex flex-col flex-grow justify-between">
                    <p className="text-sm text-gray-600 mb-4">{description}</p>
                    <p className="text-green-600 font-bold text-lg mb-2">
                      ${price.toFixed(2)}
                    </p>
                    <Link href={`/service/${_id}`}>
                      <Button className="bg-red-500 hover:bg-red-600 text-white w-full">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesPage;
