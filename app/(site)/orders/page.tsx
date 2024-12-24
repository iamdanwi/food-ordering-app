"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import type { Order } from "@/types/order";

export default function OrdersPage() {
    const { status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
            return;
        }

        fetchOrders();
    }, [status, router]);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/orders");
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            setOrders(data.orders);
        } catch (err) {
            console.error('Error fetching orders:', err);
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                            Loading...
                        </h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8">
                    Your Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="text-center">
                        <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                            You haven&apos;t placed any orders yet.
                        </p>
                        <Link href="/menu" className="btn-primary">
                            Browse Menu
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="card"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            Order #{order._id.slice(-6)}
                                        </h3>
                                        <p className="text-secondary-600 dark:text-secondary-400">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-secondary-600 dark:text-secondary-400">
                                            Status: {order.status}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold">
                                            ₹{order.total.toFixed(2)}
                                        </p>
                                        <Link
                                            href={`/orders/${order._id}`}
                                            className="text-primary-600 hover:text-primary-700"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 