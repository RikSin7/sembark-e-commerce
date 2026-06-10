import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { Product } from "../types";
import { getProductById } from "../api/productApi";
import BackButton from "../../../shared/components/BackButton";
import ErrorState from "../../../shared/components/ErrorState";
import Loader from "../../../shared/components/Loader";
import pageReload from "../../../shared/utils/PageReload";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const thumbnail = product.images?.[0] || 'https://via.placeholder.com/200';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id!);
        setProduct(data);
      } catch (error) {
        console.error(error)
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <ErrorState message={error} onRetry={pageReload} />;

  return (
    <div className="">
      <BackButton />
      <img
        src={thumbnail}
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