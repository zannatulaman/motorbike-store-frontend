import ProductActions from "@/components/ProductActions";
import { getProduct } from "@/lib/getProduct";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params; // Await the params
  const product = await getProduct(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <ProductActions product={product} />
    </div>
  );
};

export default ProductDetails;
