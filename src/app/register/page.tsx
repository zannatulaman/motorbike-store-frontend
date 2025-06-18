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
import register from "../../../public/register.json"; // Adjust the path as necessary

const RegisterPage = () => {
  const router = useRouter();

 
  // Define the form data type
  const form = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Submitted data:", data);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/sign-up",
        data
      );
      console.log("Registration success:", response.data);

      router.push(`/verifyOtp?email=${data.email}`);
      toast.success("Event has been created.");

    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full flex items-center justify-center mb-6">
        {/* Left Black Card (for design) */}
        {/* <Card className="w-[500px] bg-black h-[578px] rounded-none" /> */}
        <div className="w-[500px] h-[578px] bg-slate-300 ">
          <Lottie animationData={register} loop={true} className="mt-6" />;
        </div>

        {/* Right Form Card */}
        <Card className="w-[500px] h-[578px] rounded-none">
          <CardHeader className="text-center mt-6 space-y-2">
            <CardAction>
              <Link href="/login">
                <Button variant="link">Login</Button>
              </Link>
            </CardAction>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 mt-10"
              >
                {/* Name Field */}
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

                {/* Email Field */}
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

                {/* Password Field */}
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

                {/* Confirm Password Field */}
                {/* <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
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
                /> */}

                {/* Submit and Google Buttons */}
                <CardFooter className="flex-col gap-2">
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                  <div className="flex w-full flex-col">
                    <div className="divider">OR</div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Google
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
