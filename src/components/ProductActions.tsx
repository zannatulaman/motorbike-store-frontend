/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import {
  Star,
  // ShoppingCart,
  // Heart,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  featured: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

type ProductActionsProps = {
  product: Product;
};

type StarRatingProps = {
  rating: number;
};

const StarRating = ({ rating }: StarRatingProps) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.round(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
        fill={i < Math.round(rating) ? "currentColor" : "none"}
      />
    ))}
    <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
  </div>
);

const ProductActions = ({ product }: ProductActionsProps) => {
  const router = useRouter();
  const { user } = useUser();





  const handleAddToCart = async () => {

    if (!user?.user?.email) {
      toast.error("Please log in to add items to your cart.");
      router.push("/login");
      return;
    }

    const cartItem = {
      name: product.name,
      email: user?.user?.email,
      products: [
        {
          productId: product._id,
          quantity: 1,
        },
      ],
      totalAmount: product.price,
      status: "pending",
      address: "87-50, 167th Street, Jamaica, NY 11432",
    };

    console.log("Cart item:", cartItem);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/order/create",
        cartItem
      );

      toast.success("Added to cart!");
      router.push("/cart")
      console.log("Order response:", response.data);
    } catch (error: any) {
      console.error("Add to cart error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while adding to cart."
      );
    }
  };

  // const handleBuyNow = () => {
  //   toast("Proceeding to buy...");
  // };

  // const handleAddToWishlist = () => {
  //   toast.success("Added to wishlist!");
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.featured && (
                  <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">
                  {product.category}
                </Badge>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <StarRating rating={product.rating} />
              </div>

              <div className="space-y-4">
                <div className="text-4xl font-bold text-gray-900">
                  ${product.price.toLocaleString()}
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="flex-1 h-12 text-lg"
                    onClick={handleAddToCart}
                  >
                    <span className="font-semibold">Add to Cart</span>
                  </Button>
                  {/* <Button
                    size="lg"
                    variant="outline"
                    className="h-12"
                    onClick={handleBuyNow}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Buy Now</span>
                  </Button> */}
                  {/* <Button
                    size="lg"
                    variant="outline"
                    className="h-12"
                    onClick={handleAddToWishlist}
                  >
                    <Heart className="w-5 h-5" />
                  </Button> */}
                </div>
              </div>

              <Separator />

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-sm">Free Shipping</div>
                    <div className="text-xs text-gray-600">
                      On orders over $500
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-sm">Warranty</div>
                    <div className="text-xs text-gray-600">2 year coverage</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <RotateCcw className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-sm">Returns</div>
                    <div className="text-xs text-gray-600">30 day policy</div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-gray-900">
                  Product Information
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600">Product ID:</div>
                  <div className="font-mono text-xs">{product._id}</div>
                  <div className="text-gray-600">Added:</div>
                  <div>{new Date(product.createdAt).toLocaleDateString()}</div>
                  <div className="text-gray-600">Last Updated:</div>
                  <div>{new Date(product.updatedAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductActions;
