"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
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
import Link from "next/link";
import axios from "axios";
import { RegisterFormData } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Lottie from "lottie-react";
import register from "../../../public/register.json";

const RegisterPage = () => {
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await axios.post(
        "http://localhost:5000/api/user/sign-up",
        data
      );
      router.push(`/verifyOtp?email=${data.email}`);
      toast.success("Account created! Please verify your email.");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl">
        {/* Left Animation */}
        <div className="w-full md:w-1/2 h-[300px] md:h-[500px] flex items-center justify-center bg-slate-300 rounded-lg">
          <Lottie
            animationData={register}
            loop={true}
            className="w-full h-full"
          />
        </div>

        {/* Right Form */}
        <Card className="w-full md:w-1/2 h-[300px] md:h-[500px] rounded-lg">
          <CardHeader className="text-center mt-4">
            <CardAction>
              <Link href="/login">
                <Button variant="link">Already have an account? Login</Button>
              </Link>
            </CardAction>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                      <FormLabel>Password</FormLabel>
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

                <CardFooter className="flex-col gap-2 pt-4 px-0">
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                  <div className="w-full text-center text-sm text-gray-500">
                    or
                  </div>
                  <Button variant="outline" className="w-full">
                    Continue with Google
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

export default RegisterPage;
