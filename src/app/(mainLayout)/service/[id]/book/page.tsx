"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BookServicePage = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    fullName: "",
    date: "",
    time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookingData = {
      ...formData,
      serviceId: id,
    };

    // Retrieve token from localStorage or your auth provider
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : "";

    const res = await fetch(
      "https://motorbike-store-backend.onrender.com/api/service/booking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token || "",
        },
        body: JSON.stringify(bookingData),
      }
    );

    if (res.ok) {
      alert("Booking successful!");
    } else {
      alert("Booking failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto  p-6 py-18 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Book Your Service</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="fullName"
          placeholder="Your Full Name"
          onChange={handleChange}
          required
        />
        <Input type="date" name="date" onChange={handleChange} required />
        <Input type="time" name="time" onChange={handleChange} required />
        <Button type="submit" className="w-full">
          Confirm Booking
        </Button>
      </form>
    </div>
  );
};

export default BookServicePage;
