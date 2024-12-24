"use client";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useSession } from "next-auth/react";
import { ShoppingCartIcon, TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function CartPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const { items, updateQuantity, removeItem, total } = useCart();

    const handleQuantityChange = (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) {
            removeItem(itemId);
            return;
        }
        updateQuantity(itemId, newQuantity);
    };

    const handleCheckout = () => {
        if (!session) {
            toast.error("Please login to proceed");
            router.push("/auth/login");
            return;
        }
        router.push("/checkout");
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <ShoppingCartIcon className="mx-auto h-12 w-12 text-secondary-400" />
                        <h2 className="mt-2 text-lg font-medium text-secondary-900 dark:text-white">
                            Your cart is empty
                        </h2>
                        <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">
                            Start adding some items to your cart!
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8">
                    Shopping Cart
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="card flex items-center gap-4"
                            >
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-secondary-600 dark:text-secondary-400">
                                        ₹{item.price}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        className="p-1 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800"
                                    >
                                        <MinusIcon className="h-4 w-4" />
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        className="p-1 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800"
                                    >
                                        <PlusIcon className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="card">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                    <span>Total</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="btn-primary w-full"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 