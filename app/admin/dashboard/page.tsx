"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import type { ApiResponse } from "@/types/api";
import { withErrorHandling } from "@/utils/error";
import type { Url } from "next/dist/shared/lib/router/router";

interface Stats {
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    activeUsers: number;
}

interface DashboardCard {
    title: string;
    href: Url;
    stats: (data: Stats) => { main: string | number; sub: string };
}

const dashboardCards: DashboardCard[] = [
    {
        title: "Orders",
        href: "/admin/orders" as Url,
        stats: (data: Stats) => ({
            main: data.totalOrders,
            sub: `${data.pendingOrders} pending`,
        }),
    },
    {
        title: "Revenue",
        href: "/admin/analytics" as Url,
        stats: (data: Stats) => ({
            main: `₹${data.totalRevenue.toFixed(2)}`,
            sub: "View analytics",
        }),
    },
    {
        title: "Menu",
        href: "/admin/menu" as Url,
        stats: () => ({
            main: "Manage",
            sub: "Update items",
        }),
    },
    {
        title: "Users",
        href: "/admin/users" as Url,
        stats: (data: Stats) => ({
            main: data.activeUsers,
            sub: "Active users",
        }),
    },
];

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        activeUsers: 0,
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const data = await withErrorHandling(async () => {
                const res = await fetch('/api/admin/dashboard');
                const json = await res.json() as ApiResponse<Stats>;

                if (!res.ok) {
                    throw new Error(json.error || 'Failed to fetch dashboard stats');
                }

                return json.data;
            }, 'Failed to fetch dashboard stats');

            if (data) {
                setStats(data);
                setError(null);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An error occurred';
            setError(message);
            toast.error(message);
        }
    };

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">
                        {error}
                    </h2>
                    <button
                        onClick={() => fetchDashboardStats()}
                        className="btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardCards.map((card, index) => {
                    const { main, sub } = card.stats(stats);
                    return (
                        <Link key={card.title} href={card.href}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="card hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <h2 className="text-lg font-semibold mb-2">
                                    {card.title}
                                </h2>
                                <p className="text-3xl font-bold mb-1">{main}</p>
                                <p className="text-secondary-600 dark:text-secondary-400">
                                    {sub}
                                </p>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
} 