import Image from "next/image";
import { Button } from "@/components/ui/button";

const BestSeller = () => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-5xl text-black text-center font-bold my-5">
        Best Seller Bikes
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 mt-10">
        {/* Card 1 */}
        <div className="card bg-base-100 w-full shadow-sm">
          <figure>
            <Image
              src="https://cdn.bikedekho.com/processedimages/yamaha/mt-15-2-0/source/mt-15-2-06613f885e681c.jpg"
              alt="Motorbike"
              height={300}
              width={300}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">BMW S 1000 RR</h2>
            <p>
              <strong>Engine</strong> 999 cc
            </p>
            <p>
              <strong>Price</strong> $20000
            </p>
            <p>
              <strong>Rating</strong> 4.5/5
            </p>
            <div className="card-actions justify-end">
              <Button variant="destructive">Buy Now</Button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card bg-base-100 w-full shadow-sm">
          <figure>
            <Image
              src="https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW90b3JiaWtlfGVufDB8fDB8fHww"
              alt="Motorbike"
              height={300}
              width={300}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Yamaha YSR-R1</h2>
            <p>
              <strong>Engine</strong> 998 cc
            </p>
            <p>
              <strong>Price</strong> $20000
            </p>
            <p>
              <strong>Rating</strong> 4.5/5
            </p>
            <div className="card-actions justify-end">
              <Button variant="destructive">Buy Now</Button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card bg-base-100 w-full shadow-sm">
          <figure>
            <Image
              src="https://cdn.bikedekho.com/processedimages/kawasaki/kawasaki-ninja-zx-10r/source/kawasaki-ninja-zx-10r674008194e755.jpg"
              alt="Motorbike"
              height={300}
              width={300}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Ducati streetfighter v4</h2>
            <p>
              <strong>Engine</strong> 999 cc
            </p>
            <p>
              <strong>Price</strong> $20000
            </p>
            <p>
              <strong>Rating</strong> 4.5/5
            </p>
            <div className="card-actions justify-end">
              <Button variant="destructive">Buy Now</Button>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="card bg-base-100 w-full shadow-sm ">
          <figure>
            <Image
              src="https://images.unsplash.com/photo-1598209279122-8541213a0387?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFjZSUyMGJpa2V8ZW58MHx8MHx8fDA%3D"
              alt="Motorbike"
              height={300}
              width={300}
            />
          </figure>
          <div className="card-body mt-7">
            <h2 className="card-title">Suzuki DR-Z125L</h2>
            <p>
              <strong>Engine</strong> 999 cc
            </p>
            <p>
              <strong>Price</strong> $20000
            </p>
            <p>
              <strong>Rating</strong> 4.5/5
            </p>
            <div className="card-actions justify-end">
              <Button variant="destructive">Buy Now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
