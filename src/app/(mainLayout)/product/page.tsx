"use client";

import { Product } from "@/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = () => {
      axios
        .get("https://motorbike-store-backend.onrender.com/api/product/get")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch products:", error);
        });
    };

    fetchProducts();
  }, []);
  return (
    <section className="max-w-7xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold mb-10 text-center">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <Image
              src={product?.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-green-600 font-bold text-xl mb-2">
              ${product.price}
            </p>
            <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm w-max mb-4">
              {product.category}
            </span>
            <Link href={`/product/${product._id}`} className="mt-auto w-full">
              {" "}
              <button className="mt-auto w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
