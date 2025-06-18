"use client";
import { useRef } from "react";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const images = [
  // "https://www.motomarket-shop.gr/assets/site/public/nodes/1/32594-Givi-banner-2.jpg",
  "https://powersports.honda.com/motorcycle/sport/-/media/products/family/cbr300r/hero-banner/desktop/2022/hompage-hero-banner-cbr300r.jpg",
  "https://sp-connect.com/cdn/shop/collections/Moto-Mount-1.jpg?v=1731596559",
  "https://www.blademotorcycles.co.uk/i/?item_id=497&is_banner=true&item_type=banner&item_size=banner&hash=26cc90d66bfa698cee0b8a2deeba2288",
  "https://images.squarespace-cdn.com/content/v1/6769d360c7d7f1366bcaa8d5/1737498430577-7DWDGNZVECK0YAVJODJZ/Best.jpg",
  "https://spadaclothing.com/cdn/shop/files/blade-black-hoodie-banner.jpg?v=1731343578&width=3840",
];

const Banner = () => {
  const autoplay = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
    })
  );

  return (
    <div className="w-full overflow-hidden">
      <Carousel plugins={[autoplay.current]}>
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index} className="w-full">
              <div className="w-full h-[75vh] relative">
                <CardContent className="p-0 m-0 h-[75vh]">
                  <Image
                    src={img}
                    alt={`Banner Image ${index + 1}`}
                    width={800}
                    height={800}
                    className="object-cover w-full h-full"
                  />
                  {/* Overlay content */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/30 text-white text-center">
                    <p className="text-3xl font-semibold italic mb-4">
                      Feel the speed, experience the power.
                    </p>
                    <Button variant="destructive">Explore Now</Button>
                  </div>
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Banner;
