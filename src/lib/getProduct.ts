export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  featured: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Product;
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(
      `https://bike-store-backend-silk.vercel.app/api/product/get/${id}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const result: ApiResponse = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
