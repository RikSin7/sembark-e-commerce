import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../types";
import { useCart } from "../../cart/context/CartContext";
import { ROUTES } from "../../../shared/constants/routes";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id); const thumbnail = product.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <article className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-300 ease-in-out">
      <Link
        data-testid="product-link"
        to={ROUTES.PRODUCT_DETAILS(String(product.id))}
        className="relative overflow-hidden aspect-4/3 block bg-slate-50"
      >
        <img
          src={thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <Link
          to={ROUTES.PRODUCT_DETAILS(String(product.id))}
          className="mb-1 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-sm"
        >
          <h3 className="text-base font-semibold text-slate-800 line-clamp-2 group-hover:text-slate-600 transition-colors duration-200 leading-snug">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900 tracking-tight">
            ${Number(product.price).toFixed(2)}
          </span>

          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            type="button"
            aria-label={`Add ${product.title} to cart`}
            className="flex relative items-center justify-center w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all duration-200 ease-in-out active:scale-95"
          >
            <ShoppingCart size={18} strokeWidth={2.2} />
            {quantity > 0 && (
              <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 flex items-center justify-center min-w-[20px] h-[20px] px-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-full border-2 border-white shadow-sm">
                {quantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;