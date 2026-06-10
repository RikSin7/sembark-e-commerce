import { useEffect, useState } from "react";
import { getProducts, getProductsByCategory } from "../api/productApi";
import type { Product } from "../types";
import sortProducts from "../../../shared/utils/sortProducts";

export default function useProducts({ categories, sort }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let data: Product[];
      if (categories) {
        const categoryIds = categories.split(",").map(Number);
        const reqs = categoryIds.map((id: number) => getProductsByCategory(id));
        const responses = await Promise.all(reqs);
        data = responses.flat();
      } else data = await getProducts();
      setProducts(sortProducts(data, sort));
    } catch (error) {
      console.error(error)
      setError(("Failed to fetch products"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchProducts();
  }, [categories, sort]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  }
}