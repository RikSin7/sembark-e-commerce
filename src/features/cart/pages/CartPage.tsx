import { Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { AnimatePresence, motion } from "motion/react";
import PageTransition from "../../../shared/components/PageTransition";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Explore our products and find something you love.
        </p>
        <Link
          data-testid="start-shopping-btn"
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 active:scale-95"
        >
          <ArrowLeft size={18} />
          <span>Start Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <Trash2 size={16} />
            <span>Clear Cart</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-8 gap-4">
          {/* Cart Items list */}
          <div className="flex-1 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <CartItem
                    item={item}
                    onRemove={() => removeFromCart(item.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="pt-6 lg:block hidden">
              <Link
                to="/"
                className="inline-flex group items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-all duration-200" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary sidebar */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm text-slate-600 pb-4 border-b border-slate-200">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItemsCount} items)</span>
                  <span>${Number(cartTotalPrice).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 text-lg font-bold text-slate-900">
                <span>Estimated Total</span>
                <span>${Number(cartTotalPrice).toFixed(2)}</span>
              </div>

              <button
                className="w-full py-4 px-4 mt-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 active:scale-95"
              >
                Proceed to Checkout
              </button>
            </div>
            <div className="pt-6 lg:hidden block">
              <Link
                to="/"
                className="inline-flex group items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-all duration-200" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>

  );
}

export default CartPage;