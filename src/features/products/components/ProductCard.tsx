import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../../cart/context/CartContext";
import AddToCart from "../../../shared/components/AddToCart";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const thumbnail = product.images?.[0] || 'https://via.placeholder.com/200';

  return (
    <Link
      to={`/product/${product.id}`}
      className="block border rounded-lg overflow-hidden hover:shadow-lg transition"
    >
      <img
        src={thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-lg font-bold mt-2">${product.price}</p>

        <AddToCart onAdding={() => addToCart(product)} />
          
      </div>
    </Link>
  );
}

export default ProductCard;