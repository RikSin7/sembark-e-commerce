import { Link } from "react-router-dom";

import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="block border rounded-lg overflow-hidden hover:shadow-lg transition"
    >
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold">{product.title}</h3>

        <p className="text-lg font-bold mt-2">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;