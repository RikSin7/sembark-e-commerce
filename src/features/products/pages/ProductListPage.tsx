import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Loader from "../../../shared/components/Loader";
import ErrorState from "../../../shared/components/ErrorState";
import useProducts from "../hooks/useProducts";
import FilterDropdown from "../components/FilterDropdown"; 
import SortDropdown from "../components/SortDropdown";    

function ProductListPage() {
  const [searchParams] = useSearchParams();
  const categories = searchParams.get("categories") ?? "";
  const sort = searchParams.get("sort") ?? "";

  const { products, loading, error, refetch } = useProducts({ categories, sort });

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white">
      {/*  Header*/}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Products
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Showing {products.length} {products.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* Filter and Sort */}
        <div className="mt-4 md:mt-0 flex flex-row items-center gap-3">
          <FilterDropdown />
          <SortDropdown />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;