"use client";
import { useEffect, useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import type { Order, OrderStatus } from "@/types/order";
import { OrderCard } from "@/components/admin/OrderCard";
import debounce from "lodash/debounce";

const sortOptions = [
    { value: '-createdAt', label: 'Newest First' },
    { value: 'createdAt', label: 'Oldest First' },
    { value: '-total', label: 'Highest Amount' },
    { value: 'total', label: 'Lowest Amount' },
];

const statusOptions: OrderStatus[] = [
    'PENDING',
    'CONFIRMED',
    'PREPARING',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'CANCELLED'
];

export default function AdminOrders() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: searchParams.get('status') || '',
        sort: searchParams.get('sort') || '-createdAt',
        search: searchParams.get('search') || '',
    });

    const fetchOrders = useCallback(async () => {
        try {
            const queryParams = new URLSearchParams();
            if (filters.status) queryParams.set('status', filters.status);
            if (filters.sort) queryParams.set('sort', filters.sort);
            if (filters.search) queryParams.set('search', filters.search);

            const res = await fetch(`/api/admin/orders?${queryParams}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            setOrders(data.orders);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
            return;
        }

        if (status === "authenticated" && session?.user?.role !== "ADMIN") {
            router.push("/");
            return;
        }

        fetchOrders();
    }, [status, session, router, fetchOrders]);

    const debouncedSearch = debounce((value: string) => {
        setFilters(prev => ({ ...prev, search: value }));
    }, 500);

    const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
        try {
            const res = await fetch(`/api/admin/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            toast.success("Order status updated");
            fetchOrders();
        } catch (err) {
            console.error('Failed to update order:', err);
            toast.error("Failed to update order");
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
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
                        Order Management
                    </h1>

                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="input"
                            onChange={(e) => debouncedSearch(e.target.value)}
                            defaultValue={filters.search}
                        />

                        <select
                            value={filters.status}
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                            className="select"
                        >
                            <option value="">All Status</option>
                            {statusOptions.map((status: OrderStatus) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>

                        <select
                            value={filters.sort}
                            onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                            className="select"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <OrderCard
                            key={order._id}
                            order={order}
                            onUpdateStatus={handleUpdateStatus}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
} 