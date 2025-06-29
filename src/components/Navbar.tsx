"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiResponse, Order } from "@/app/(mainLayout)/cart/page";
import useUser from "@/hooks/useUser";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Home,
  Info,
  Wrench,
  ShoppingBag,
  Phone,
  User,
  ShoppingCart,
} from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const userEmail = user?.user?.email;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          "https://motorbike-store-backend.onrender.comapi/order/get"
        );

        if (response.data.success) {
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
      }
    };

    if (userEmail) {
      fetchOrders();
    }
  }, [userEmail]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Remove token
    toast.success("Logged out successfully"); // ✅ Show toast
    router.push("/login"); // ✅ Redirect to login
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="navbar bg-black shadow-sm flex flex-wrap justify-between items-center px-4 gap-4">
        {/* Logo */}
        <div className="flex-1">
          <Image
            src="https://dynamic.design.com/preview/logodraft/b7fb4a7e-1175-4888-8c24-f31e54e4549a/image/large.png"
            width={80}
            height={80}
            alt="Bike Store Logo"
          />
        </div>

        {/* Search */}
        <div className="w-full sm:w-auto flex-1 flex justify-center sm:justify-end">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full sm:w-80 max-w-md border-2"
          />
        </div>

        {/* Cart & Profile */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-success btn-circle"
            >
              <div className="indicator">
                <ShoppingCart className="h-5 w-5" />
                <span className="badge badge-sm indicator-item bg-success">
                  {orders.length}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">{orders.length} Items</span>
                <div className="card-actions">
                  <Link href="/cart">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Avatar */}
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/profile">
                  <Button className="btn btn-ghost">Profile</Button>
                </Link>
              </li>
              <Link href="/login">
                <Button onClick={handleLogout} className="btn btn-error w-full">
                  Logout
                </Button>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="navbar bg-black shadow-sm">
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            {/* Mobile Menu Items */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <Info className="w-4 h-4" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/service">
                  <Wrench className="w-4 h-4" />
                  Services
                </Link>
              </li>
              <li>
                <Link href="/product">
                  <ShoppingBag className="w-4 h-4" />
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <Phone className="w-4 h-4" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand Logo Text */}
          <Link
            href="/"
            className="btn btn-ghost normal-case text-xl text-white"
          >
            Bike Store
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white font-medium text-base">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/service">Services</Link>
            </li>
            <li>
              <Link href="/product">Products</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Desktop Login Button */}
        <div className="navbar-end">
          <Link href="/login">
            <button className="btn btn-success">Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
