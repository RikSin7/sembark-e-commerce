import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import type { Product } from "../types";
import { getProductById } from "../api/productApi";
import BackButton from "../../../shared/components/BackButton";
import ErrorState from "../../../shared/components/ErrorState";
import Loader from "../../../shared/components/Loader";
import { useCart } from "../../cart/context/CartContext";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { addToCart, getItemQuantity } = useCart();

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id!);
      setProduct(data);
    } catch (error) {
      console.error(error);
      setError("Product not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <ErrorState message={error} onRetry={fetchProduct} />;

  const thumbnail = product.images?.[0] || 'https://via.placeholder.com/800x800?text=No+Image+Available';
  const quantityInCart = getItemQuantity(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white">
      <div className="mb-8">
        <BackButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative">
          <img
            src={thumbnail}
            alt={product.title}
            className="w-full h-full object-cover aspect-square md:aspect-auto md:min-h-[500px] hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mb-4">
            {product.title}
          </h1>

          <div className="border-b border-slate-200 pb-6 mb-6">
            <p className="text-4xl font-bold text-slate-900">
              ${Number(product.price).toFixed(2)}
            </p>
          </div>

          <div className="flex-1">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Description
            </h2>
            <p className="text-base text-slate-700 leading-relaxed whitespace-pre-wrap">
              {product.description}
            </p>
          </div>

          {/* Add to cart button */}
          <div className="mt-10 pt-6 border-t border-slate-200">
            <button
              onClick={() => addToCart(product)}
              type="button"
              className="flex items-center justify-center w-full md:w-auto px-8 py-4 bg-slate-900 text-white text-lg font-semibold rounded-xl hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all duration-200 ease-in-out active:scale-[0.98] group"
            >
              <ShoppingCart size={22} strokeWidth={2.2} className="mr-3 group-hover:scale-110 transition-transform" />
              <span>
                {quantityInCart > 0
                  ? `Add Another (${quantityInCart} in cart)`
                  : 'Add to Cart'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;