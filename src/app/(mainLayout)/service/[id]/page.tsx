import { Service } from "@/types";

// Define ApiResponse type for the expected API response structure
type ApiResponse = {
  success: boolean;
  data: Service;
};

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";


export async function getService(id: string): Promise<Service | null> {
  try {
    const res = await fetch(`http://localhost:5000/api/service/get/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch service");
    }

    const result: ApiResponse = await res.json();
    return result.success ? result.data : null;
  } catch (err) {
    console.error("Server fetch error:", err);
    return null;
  }
}


const SingleServicePage = async ({ params }: { params: { id: string } }) => {
  console.log("Params ID:", params.id); // Debug
  const service = await getService(params.id);

  if (!service) {
    console.log("Service not found or returned null"); // Debug
    return <div>Service not found</div>;
  }

  return (
    <>
      <div className="w-full px-4 md:px-12 lg:px-20 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          {service.name}
        </h1>

        <Card className="flex flex-col lg:flex-row overflow-hidden shadow-xl">
          {/* Left: Image */}
          <div className="w-full lg:w-1/2 h-[300px] lg:h-auto relative">
            <Image
              src={service.image}
              alt={service.name}
              fill
              priority
              className="object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none"
            />
          </div>

          {/* Right: Details */}
          <CardContent className="w-full lg:w-1/2 flex flex-col justify-between p-6 space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Duration:{" "}
                <span className="font-medium">{service.duration}</span>
              </p>
              <p className="text-2xl font-semibold text-green-600 mb-4">
                ${service.price}
              </p>
              <p className="text-base leading-relaxed text-gray-700">
                {service.description}
              </p>
              <p className="mt-4 text-sm">
                Availability:{" "}
                <span
                  className={`font-medium ${
                    service.isAvailable ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {service.isAvailable ? "Available" : "Unavailable"}
                </span>
              </p>
            </div>

            <Link href={`/service/${service._id}/book`}>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={!service.isAvailable}
              >
                {service.isAvailable ? "Book Service" : "Not Available"}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SingleServicePage;
