import { Link } from "react-router-dom";
import { useCart } from "../../features/cart/context/CartContext";
import { ROUTES } from "../constants/routes";

function Header() {
    const { cartItemsCount } = useCart();
    return (
        <header className="border-b">
            <div className="py-4 flex items-center justify-between">
                <Link to={ROUTES.HOME} className="text-2xl font-bold">
                    Logo
                </Link>

                <Link
                    to={ROUTES.CART}
                    className="px-4 py-2 border rounded-md font-medium relative"
                >
                    Cart
                    {cartItemsCount > 0 && (
                        <span className="absolute -top-2 -right-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                            {cartItemsCount}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
}

export default Header;