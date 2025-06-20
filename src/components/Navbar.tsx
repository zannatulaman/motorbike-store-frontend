"use client"
import { ApiResponse, Order } from '@/app/(mainLayout)/cart/page';
import useUser from '@/hooks/useUser';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Alert, AlertDescription } from './ui/alert';

const Navbar = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const userEmail = user?.user?.email;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // setLoading(true);
        const response = await axios.get<ApiResponse>(
          "http://localhost:5000/api/order/get"
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
        // setLoading(false);
      }
    };

    if (userEmail) {
      fetchOrders();
    }
  }, [userEmail]);

  // Loading state
  // if (loading) {
  //   return (
  //     <div className="container mx-auto px-4 py-8">
  //       <div className="flex items-center justify-center min-h-[400px]">
  //         <Loader2 className="h-8 w-8 animate-spin" />
  //         <span className="ml-2 text-lg">Loading your cart...</span>
  //       </div>
  //     </div>
  //   );
  // }

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

  return (
    <>
      <div className="navbar bg-black shadow-sm flex flex-wrap justify-between items-center px-4 gap-4">
        <div className="flex-1">
          <Image
            src="https://dynamic.design.com/preview/logodraft/b7fb4a7e-1175-4888-8c24-f31e54e4549a/image/large.png"
            width={80}
            height={80}
            alt="Bike Store Logo"
          />
        </div>

        <div className="w-full sm:w-auto flex-1 flex justify-center sm:justify-end">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full sm:w-80 max-w-md border-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-success btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
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
                  <Link href={"/cart"}>
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="navbar bg-black shadow-sm">
        {/* Start Section (Logo & Mobile Menu) */}
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
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <details>
                  <summary>Parent</summary>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>

          {/* Brand Logo */}
          <Link
            href="/"
            className="btn btn-ghost normal-case text-xl text-white"
          >
            Bike Store
          </Link>
        </div>

        {/* Center Nav Links (visible on lg+) */}
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

        {/* End Section (Login) */}
        <div className="navbar-end">
          <Link href="/login">
            <button className="btn btn-success">Login</button>
          </Link>
        </div>
      </div>

      
    </>
  );
}

export default Navbar