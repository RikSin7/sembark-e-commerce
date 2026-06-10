import { useEffect, useState } from "react";

import { getProducts } from "../api/productApi";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";
import Loader from "../../../shared/components/Loader";
import ErrorState from "../../../shared/components/ErrorState";
import pageReload from "../../../shared/utils/PageReload";

function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error)
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={pageReload} />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;