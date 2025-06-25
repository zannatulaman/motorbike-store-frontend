"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleVerify = async () => {
    const email = searchParams.get("email");

    console.log("email", email);

    try {
      const payLoad = {
        otp,
        email,
      };

      const response = await axios.post(
        "https://bike-store-backend-silk.vercel.app/api/user/verify-otp",
        payLoad
      );

      console.log("OTP verified:", response.data);
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "OTP verification failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 size-full">
      <Card className="w-[500px] h-[578px] rounded-none bg-slate-300 p-6">
        <div className="flex items-center justify-center mt-2">
          <h1 className="text-2xl font-bold">Verify OTP</h1>
        </div>

        <div className="flex items-center justify-center mt-4">
          <p className="text-gray-800 font-medium text-center">
            Enter the OTP sent to{" "}
            <span className="font-semibold">{searchParams.get("email")}</span>
          </p>
        </div>

        <div className="flex items-center justify-center mt-8">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {[0, 1, 2].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="w-12 h-14 text-2xl text-center border border-gray-400 rounded bg-white shadow-sm"
                />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {[3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="w-12 h-14 text-2xl text-center border border-gray-400 rounded bg-white shadow-sm"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <CardFooter className="flex-col gap-2 mt-4">
          <Button onClick={handleVerify} type="button">
            Verify OTP
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyOtpPage;
