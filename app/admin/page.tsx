"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Extend the Session user type
interface ExtendedUser {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
}

type Order = {
    _id: string;
    items: Array<{
        name: string;
        quantity: number;
    }>;
    total: number;
    status: string;
    createdAt: string;
    address: string;
    phone: string;
};

const statusOptions = [
    "PENDING",
    "CONFIRMED",
    "PREPARING",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
] as const;

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState<string>("all");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
            return;
        }

        if (status === "authenticated" && (session?.user as ExtendedUser)?.role !== "ADMIN") {
            router.push("/");
            toast.error("Unauthorized access");
            return;
        }

        if (status === "authenticated") {
            fetchOrders();
        }
    }, [status, session, router, selectedStatus]);

    const fetchOrders = async () => {
        try {
            const url = selectedStatus === "all"
                ? "/api/admin/orders"
                : `/api/admin/orders?status=${selectedStatus}`;

            const res = await fetch(url);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            setOrders(data.orders);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch orders";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/admin/orders/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            toast.success("Order status updated");
            fetchOrders();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Failed to update order status";
            toast.error(errorMessage);
        }
    };

    if (isLoading) {
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
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
                        Admin Dashboard
                    </h1>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="input w-48"
                    >
                        <option value="all">All Orders</option>
                        {statusOptions.map((status) => (
                            <option key={status} value={status}>
                                {status.replace(/_/g, " ")}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card"
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                                        Order #{order._id.slice(-6)}
                                    </h3>
                                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                    <div className="mt-2">
                                        <h4 className="font-medium text-secondary-900 dark:text-white">
                                            Items:
                                        </h4>
                                        {order.items.map((item, i) => (
                                            <span key={i} className="text-secondary-600 dark:text-secondary-400">
                                                {item.quantity}x {item.name}
                                                {i < order.items.length - 1 ? ", " : ""}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-2">
                                        <h4 className="font-medium text-secondary-900 dark:text-white">
                                            Delivery Address:
                                        </h4>
                                        <p className="text-secondary-600 dark:text-secondary-400">
                                            {order.address}
                                        </p>
                                    </div>
                                    <div className="mt-2">
                                        <h4 className="font-medium text-secondary-900 dark:text-white">
                                            Phone:
                                        </h4>
                                        <p className="text-secondary-600 dark:text-secondary-400">
                                            {order.phone}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between items-end">
                                    <div className="text-lg font-bold text-secondary-900 dark:text-white">
                                        ₹{order.total.toFixed(2)}
                                    </div>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                        className="input mt-4"
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status.replace(/_/g, " ")}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
} 