import { useState, createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { Product } from "../../products/types";
import { STORAGE_KEYS } from "../../../shared/constants/storageKeys";

interface CartContextType {
    cartItems: Product[];
    cartItemsCount: number;
    cartTotalPrice: number;
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    getItemQuantity: (id: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    //get cart items from local storage
    useEffect(() => {
        const storedCartItems = localStorage.getItem(STORAGE_KEYS.CART_ITEMS);
        if (storedCartItems) {
            //eslint-disable-next-line
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    //update local storage on cart items change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.CART_ITEMS, JSON.stringify(cartItems));
    }, [cartItems]);

    const cartItemsCount = cartItems.length;
    const cartTotalPrice = cartItems.reduce((total, item) => total + (item.price * (item.quantity ?? 1)), 0);

    const getItemQuantity = (id: number) => cartItems.find(item => item.id === id)?.quantity || 0;

    const addToCart = (product: Product) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity ?? 1) + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        if (window.confirm("You have awesome items in your cart. you might not find these again. Still want to clear them? "))
            setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, getItemQuantity, cartItemsCount, cartTotalPrice, addToCart, removeFromCart, clearCart }}>
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

