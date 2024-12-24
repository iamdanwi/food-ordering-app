"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
    CheckCircleIcon,
    ClockIcon,
    TruckIcon,
    FireIcon,
} from "@heroicons/react/24/outline";

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
    isVeg: boolean;
}

interface Order {
    _id: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    address: string;
    phone: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
}

const statusSteps = [
    { status: "PENDING", icon: ClockIcon, label: "Order Placed" },
    { status: "CONFIRMED", icon: CheckCircleIcon, label: "Confirmed" },
    { status: "PREPARING", icon: FireIcon, label: "Preparing" },
    { status: "OUT_FOR_DELIVERY", icon: TruckIcon, label: "Out for Delivery" },
    { status: "DELIVERED", icon: CheckCircleIcon, label: "Delivered" },
] as const;

export default function OrderDetailsPage() {
    const { orderId } = useParams();
    const router = useRouter();
    const socket = useSocket(orderId as string);
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) {
            router.push("/auth/login");
            return;
        }

        fetchOrderDetails();

        if (socket) {
            socket.on('orderStatusUpdated', (data: { orderId: string; status: OrderStatus }) => {
                if (data.orderId === orderId) {
                    setOrder(prev => prev ? { ...prev, status: data.status } : null);
                    toast.success(`Order status updated to ${data.status}`);
                }
            });

            socket.on('orderCancelled', (data: { orderId: string }) => {
                if (data.orderId === orderId) {
                    setOrder(prev => prev ? { ...prev, status: 'CANCELLED' } : null);
                    toast.error('Order has been cancelled');
                }
            });
        }

        return () => {
            if (socket) {
                socket.off('orderStatusUpdated');
                socket.off('orderCancelled');
            }
        };
    }, [socket, orderId, session, router]);

    const fetchOrderDetails = async () => {
        try {
            const res = await fetch(`/api/orders/${orderId}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            setOrder(data.order);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch order details';
            toast.error(errorMessage);
            router.push('/orders');
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

    if (!order) return null;

    // ... rest of the UI component (the same as before)
}; 