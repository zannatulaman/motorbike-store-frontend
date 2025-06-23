// components/PrivateRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  

  return <>{children}</>;
};

export default PrivateRoute;
