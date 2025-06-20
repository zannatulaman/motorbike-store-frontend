
// hooks/useUser.ts
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


interface DecodedToken {
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
  exp: number;
  iat: number;
  // Add other fields you store in JWT
}

const useUser = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    // Run only on client-side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
 
          // Optional: Check expiration
          if (decoded.exp * 1000 > Date.now()) {
            setUser(decoded);
          } else {
            console.warn("Token expired");
            localStorage.removeItem("token");
            setUser(null);
          }
        } catch (error) {
          console.error("Invalid token", error);
          setUser(null);
        }
      }
    }
  }, []);

  return { user };
};

export default useUser;
