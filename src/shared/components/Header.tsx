import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../features/cart/context/CartContext";
import { ROUTES } from "../constants/routes";

function Header() {
    const { cartItemsCount } = useCart();

    return (
        <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link
                    to={ROUTES.HOME}
                    className="flex items-center gap-3 group focus:outline-none rounded-md focus-visible:ring-2 focus-visible:ring-slate-900"
                    aria-label="Go to Homepage"
                >
                    <img
                        src="/logo.png"
                        alt="Shoppy Logo"
                        className="h-8 w-auto min-w-[32px] group-hover:opacity-80 transition-opacity"
                    />
                    <span className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block group-hover:opacity-80 transition-opacity">
                        Shoppy
                    </span>
                </Link>

                <Link
                    to={ROUTES.CART}
                    className="relative flex items-center justify-center p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900"
                    aria-label={`View Cart, ${cartItemsCount} items`}
                >
                    <ShoppingCart size={24} strokeWidth={2} />
                    {cartItemsCount > 0 && (
                        <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 flex items-center justify-center min-w-[20px] h-[20px] px-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-full border-2 border-white shadow-sm">
                            {cartItemsCount > 99 ? "99+" : cartItemsCount}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
}

export default Header;