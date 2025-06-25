/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Lottie from "lottie-react";
import loginAnimation from "../../../public/login.json"; // Adjust if needed
import { toast } from "sonner";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post(
        "https://bike-store-backend-silk.vercel.app/api/user/sign-in",
        data
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        router.push("/");
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("Network error");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl">
        {/* Animation (only on md and above) */}
        <div className="hidden md:block w-full md:w-1/2 h-[500px] bg-slate-300 rounded-lg">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>

        {/* Login Form */}
        <Card className="w-full md:w-1/2 max-w-md h-[400px] md:h-[500px] md:max-w-lg shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardAction>
              <Link href="/register">
                <Button variant="link">Register</Button>
              </Link>
            </CardAction>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between">
                        Password
                        <Link
                          href="#"
                          className="text-sm underline hover:no-underline"
                        >
                          Forgot?
                        </Link>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Buttons */}
                <CardFooter className="flex-col gap-2 px-0">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <div className="divider w-full">OR</div>
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
