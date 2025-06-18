import ProductActions from '@/components/ProductActions';
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
      const response = await fetch(`http://localhost:5000/api/product/get/${id}`, {
        cache: "no-store", // prevent caching
      });
  
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



const ProductDetails = async ({ params }: { params: { id: string } }) => {
    const product = await getProduct(params.id);
    if (!product) {
        return <div>Product not found</div>;
    }
  return <div>
        <ProductActions product={product} />
  </div>;
};

export default ProductDetails