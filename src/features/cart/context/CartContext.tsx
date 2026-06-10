import { useState, createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { Product } from "../../products/types";

interface CartContextType {
    cartItems: Product[];
    cartItemsCount: number;
    cartTotalPrice: number;
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const cartItemsCount = cartItems.length;
    const cartTotalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    const addToCart = (product: Product) => {
        setCartItems((prev) => [...prev, product]);
    };

    const removeFromCart = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, cartItemsCount, cartTotalPrice, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
//eslint-disable-next-line
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

