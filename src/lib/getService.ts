import { Service } from "@/types";

// Define ApiResponse type for the expected API response structure
type ApiResponse = {
  success: boolean;
  data: Service;
};

export async function getService(id: string): Promise<Service | null> {
  try {
    const res = await fetch(
      `https://bike-store-backend-silk.vercel.app/api/service/get/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch service");
    }
    const result: ApiResponse = await res.json();
    return result.success ? result.data : null;
  } catch (err) {
    console.error("Server fetch error:", err);
    return null;
  }
}
