"use client";
import { createContext, useContext, useState, useEffect } from "react";
import type { MenuItem, CartItem } from "@/src/types/menu";

type CartContextType = {
    items: CartItem[];
    total: number;
    addItem: (item: MenuItem) => void;
    removeItem: (itemId: number) => void;
    updateQuantity: (itemId: number, quantity: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
    }, []);

    // Update localStorage and total when items change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
        const newTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotal(newTotal);
    }, [items]);

    const addItem = (item: MenuItem) => {
        setItems(currentItems => {
            const existingItem = currentItems.find(i => i.id === item.id);
            if (existingItem) {
                return currentItems.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...currentItems, { ...item, quantity: 1 }];
        });
    };

    const removeItem = (itemId: number) => {
        setItems(currentItems => currentItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId: number, quantity: number) => {
        if (quantity < 1) {
            removeItem(itemId);
            return;
        }
        setItems(currentItems =>
            currentItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider value={{
            items,
            total,
            addItem,
            removeItem,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
} 