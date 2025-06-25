/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  ShoppingCart,
  Package,
  MapPin,
  Calendar,
  Star,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import useUser from "@/hooks/useUser";
import { toast } from "sonner";
import Link from "next/link";

// TypeScript interfaces
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
  __v: number;
}

interface CartProduct {
  productId: Product;
  quantity: number;
  _id: string;
}

export interface Order {
  _id: string;
  name: string;
  email: string;
  products: CartProduct[];
  totalAmount: number;
  status: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiResponse {
  success: boolean;
  data: Order[];
}

const CartPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const userEmail = user?.user?.email;

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          "https://bike-store-backend-silk.vercel.app/api/order/get"
        );

        if (response.data.success) {
          // Filter orders by current user's email
          const userOrders = response.data.data.filter(
            (order) => order.email === userEmail
          );
          setOrders(userOrders);
        } else {
          setError("Failed to fetch orders");
        }
      } catch (err) {
        setError("Error fetching orders");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchOrders();
    }
  }, [userEmail]);

  // Calculate total items and total amount
  const totalItems = orders.reduce(
    (sum, order) =>
      sum +
      order.products.reduce(
        (productSum, product) => productSum + product.quantity,
        0
      ),
    0
  );

  const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  // Delete order (DELETE without token)
  const handleDeleteOrder = async (orderId: string) => {
    try {
      await axios.delete(
        `https://bike-store-backend-silk.vercel.app/api/order/delete/${orderId}`
      );

      toast.success("Order deleted successfully");
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (error: any) {
      toast.error("Failed to delete order");
      console.error("Delete order error:", error);
    }
  };

  // Handle place order
  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    try {
      // Simulate API call for placing order
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically make an API call to place the order
      // await axios.post('https://bike-store-backend-silk.vercel.app/api/order/place', { orders })

      setIsModalOpen(false);
      // You might want to redirect to a success page or show a success message
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2 text-lg">Loading your cart...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Empty cart state
  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingCart className="h-24 w-24 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Add some products to get started!
          </p>
          <Link href={"/product"}>
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        <ShoppingCart className="h-8 w-8" />
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Shopping Cart
        </h1>
        <Badge variant="secondary" className="ml-2">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-6">
          {orders.map((order) => (
            <Card key={order._id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-base md:text-lg">
                    Order #{order._id.slice(-8)}
                  </CardTitle>
                  <Badge
                    variant={
                      order.status === "pending"
                        ? "secondary"
                        : order.status === "shipped"
                        ? "outline"
                        : "default"
                    }
                    className="capitalize"
                  >
                    {order.status}
                  </Badge>

                  {order.status === "pending" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteOrder(order._id)}
                      className="mt-2 w-full sm:w-auto"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Cancel Order
                    </Button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mt-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{order.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {order.products.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row gap-4 p-2 sm:p-4 border rounded-lg"
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                      <Image
                        src={item.productId.image || "/placeholder.svg"}
                        alt={item.productId.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base md:text-lg truncate">
                        {item.productId.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                        {item.productId.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <Badge variant="outline">
                          {item.productId.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs sm:text-sm">
                            {item.productId.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm sm:text-base font-bold">
                        ${item.productId.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">
                        Qty: {item.quantity}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold mt-1">
                        Total: $
                        {(
                          item.productId.price * item.quantity
                        ).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Items:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Orders:</span>
                  <span>{orders.length}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span>${totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto" size="lg">
                    Place Order
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Confirm Order</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to place this order?
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Items:</span>
                        <span className="font-medium">{totalItems}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Orders:</span>
                        <span className="font-medium">{orders.length}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Amount:</span>
                        <span>${totalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    <Alert>
                      <AlertDescription>
                        Your order will be processed and you will receive a
                        confirmation email.
                      </AlertDescription>
                    </Alert>
                  </div>

                  <DialogFooter className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                      disabled={placingOrder}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handlePlaceOrder} disabled={placingOrder}>
                      {placingOrder ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Placing Order...
                        </>
                      ) : (
                        "Confirm Order"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="text-xs text-gray-500 text-center">
                Secure checkout powered by your payment provider
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
