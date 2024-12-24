import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MenuItem } from '@/types/menu';

interface CartItem extends Omit<MenuItem, 'id'> {
    id: number;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: MenuItem) => void;
    removeItem: (itemId: number) => void;
    updateQuantity: (itemId: number, quantity: number) => void;
    clearCart: () => void;
    total: number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item: MenuItem) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === item.id);
                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id
                                    ? { ...i, quantity: i.quantity + 1 }
                                    : i
                            ),
                        };
                    }
                    return { items: [...state.items, { ...item, quantity: 1 }] };
                });
            },
            removeItem: (itemId: number) => {
                set((state) => ({
                    items: state.items.filter((i) => i.id !== itemId),
                }));
            },
            updateQuantity: (itemId: number, quantity: number) => {
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === itemId ? { ...i, quantity } : i
                    ),
                }));
            },
            clearCart: () => set({ items: [] }),
            get total() {
                return get().items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                );
            },
        }),
        {
            name: 'cart-storage',
        }
    )
); 