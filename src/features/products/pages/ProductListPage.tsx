import ProductCard from "../components/ProductCard";
import Loader from "../../../shared/components/Loader";
import ErrorState from "../../../shared/components/ErrorState";
import useProducts from "../hooks/useProducts";
import FilterPanel from "../components/FilterPanel";
import { useSearchParams } from "react-router-dom";
import SortDropdown from "../components/SortDropdown";

function ProductListPage() {
  const [searchParams] = useSearchParams();
  const categories = searchParams.get("categories") ?? "";
  const sort = searchParams.get("sort") ?? "";

  const { products, loading, error, refetch } = useProducts({ categories, sort });

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <FilterPanel />
      <SortDropdown />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;