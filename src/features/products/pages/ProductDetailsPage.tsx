import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { Product } from "../types";
import { getProductById } from "../api/productApi";
import BackButton from "../../../shared/components/BackButton";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id!);
        setProduct(data);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="">
      <BackButton />
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full max-h-[500px] object-cover"
      />

      <h1 className="text-3xl font-bold mt-4">
        {product.title}
      </h1>

      <p className="mt-4">{product.description}</p>

      <h2 className="text-2xl font-bold mt-4">
        ${product.price}
      </h2>

      <button className="mt-6 px-4 py-2 border rounded">
        Add To Cart
      </button>
    </div>
  );
}

export default ProductDetailsPage;