import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage() {
  const {
    cartItems,
    cartItemsCount,
    cartTotalPrice,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-4">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Cart</h1>

        <button
          onClick={clearCart}
          className="px-4 py-2 border rounded"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <article
            key={item.id}
            className="border rounded-lg p-4 flex gap-4"
          >
            <img
              src={item.images?.[0]}
              alt={item.title}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-lg">
                {item.title}
              </h2>

              <p className="mt-2 text-gray-600">
                ${item.price}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="h-fit px-3 py-2 border rounded"
            >
              Remove
            </button>
          </article>
        ))}
      </div>

      <div className="mt-8 border-t pt-4">
        <p className="text-lg">
          Total Items: <strong>{cartItemsCount}</strong>
        </p>

        <p className="text-lg mt-2">
          Total Price: <strong>${cartTotalPrice}</strong>
        </p>
      </div>
      <div className="mt-6">
        <Link to="/" className="text-blue-600 hover:underline inline-flex items-center gap-1">
          ← Continue Shopping
        </Link>
      </div>
    </section>
  );
}

export default CartPage;