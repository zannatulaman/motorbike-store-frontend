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
import loginAnimation from "../../../public/login.json"; // Adjust the path as necessary
import { toast } from "sonner";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router =useRouter();

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Submitted data:", data);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/sign-in",
        data
      );
      console.log("Login Success:", response.data.token);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        router.push("/");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        console.error("Login error:", error.response.data.message);
      } else {
        console.error("Login error:", error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full">
        <div className="flex items-center justify-center mb-6">
          {/* <Card className="w-[500px] bg-black h-[578px] rounded-none"></Card> */}
          <div className="w-[500px] h-[578px] bg-slate-300">
            <Lottie animationData={loginAnimation} loop={true} />;
          </div>
          <Card className="w-[500px] h-[578px] rounded-none">
            <CardHeader className="text-center mt-15 space-y-2">
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
                  className="space-y-4 mt-10"
                >
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

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Password
                          <Link
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
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

                  <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                    <div className="flex w-full flex-col">
                      <div className="divider">OR</div>
                    </div>
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
    </div>
  );
};

export default LoginPage;
