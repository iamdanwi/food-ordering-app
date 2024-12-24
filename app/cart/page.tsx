"use client";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function CartPage() {
    const { items, removeItem, updateQuantity, total } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
                            Your Cart is Empty
                        </h2>
                        <p className="text-secondary-600 dark:text-secondary-400 mb-8">
                            Add some delicious items to your cart
                        </p>
                        <Link href="/menu" className="btn-primary">
                            Browse Menu
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card"
                >
                    <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8">
                        Your Cart
                    </h1>
                    <div className="space-y-6">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center space-x-4 py-4 border-b border-secondary-200 dark:border-secondary-700 last:border-0"
                            >
                                <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                                        {item.name}
                                    </h3>
                                    <p className="text-secondary-600 dark:text-secondary-400">
                                        ₹{item.price}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="btn-primary px-3 py-1"
                                        >
                                            -
                                        </button>
                                        <span className="text-secondary-900 dark:text-white w-8 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="btn-primary px-3 py-1"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 border-t border-secondary-200 dark:border-secondary-700 pt-8">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg font-semibold text-secondary-900 dark:text-white">
                                Total
                            </span>
                            <span className="text-2xl font-bold text-secondary-900 dark:text-white">
                                ₹{total}
                            </span>
                        </div>
                        <button className="btn-primary w-full py-3">
                            Proceed to Checkout
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
} 