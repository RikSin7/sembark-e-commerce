import { Trash2 } from "lucide-react";
import type { Product } from "../../products/types";

interface CartItemProps {
  item: Product;
  onRemove: (id: number) => void;
}

function CartItem({ item, onRemove }: CartItemProps) {
  const thumbnail = item.images?.[0] || 'https://via.placeholder.com/200x200?text=No+Image';

  return (
    <article className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 hover:shadow-sm transition-all duration-200">

      {/* Image */}
      <div className="shrink-0 w-full sm:w-32 aspect-4/3 sm:aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
        <img
          src={thumbnail}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content  */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 line-clamp-2 sm:line-clamp-1">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500 line-clamp-2">
              {item.description}
            </p>
          </div>

          <span className="text-lg font-bold text-slate-900 shrink-0">
            ${Number(item.price).toFixed(2)}
          </span>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-500">Qty:</span>
            <span className="flex items-center justify-center min-w-[2rem] px-2 py-1 bg-slate-100 border border-slate-200 text-slate-900 text-sm font-bold rounded-lg">
              {item.quantity}
            </span>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.title} from cart`}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartItem;