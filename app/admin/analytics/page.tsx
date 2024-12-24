"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { motion } from "framer-motion";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Analytics {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByStatus: Record<string, number>;
    revenueByDay: Record<string, number>;
    popularItems: Array<{
        name: string;
        count: number;
        revenue: number;
    }>;
}

export default function AdminAnalytics() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [analytics, setAnalytics] = useState<Analytics>({
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        ordersByStatus: {},
        revenueByDay: {},
        popularItems: [],
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
            return;
        }

        if (status === "authenticated" && session?.user?.role !== "ADMIN") {
            router.push("/");
            return;
        }

        fetchAnalytics();
    }, [status, session, router]);

    const fetchAnalytics = async () => {
        try {
            const res = await fetch('/api/admin/analytics');
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            setAnalytics(data);
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        }
    };

    const revenueChartData = {
        labels: Object.keys(analytics.revenueByDay),
        datasets: [
            {
                label: 'Daily Revenue',
                data: Object.values(analytics.revenueByDay),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    };

    const orderChartData = {
        labels: Object.keys(analytics.ordersByStatus),
        datasets: [
            {
                label: 'Orders by Status',
                data: Object.values(analytics.ordersByStatus),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                ],
            },
        ],
    };

    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card"
                    >
                        <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
                        <p className="text-3xl font-bold">{analytics.totalOrders}</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="card"
                    >
                        <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
                        <p className="text-3xl font-bold">₹{analytics.totalRevenue.toFixed(2)}</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card"
                    >
                        <h3 className="text-lg font-semibold mb-2">Average Order Value</h3>
                        <p className="text-3xl font-bold">₹{analytics.averageOrderValue.toFixed(2)}</p>
                    </motion.div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="card"
                    >
                        <h3 className="text-xl font-bold mb-4">Revenue Trend</h3>
                        <Bar data={revenueChartData} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="card"
                    >
                        <h3 className="text-xl font-bold mb-4">Orders by Status</h3>
                        <Bar data={orderChartData} />
                    </motion.div>
                </div>

                {/* Popular Items */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card mt-8"
                >
                    <h3 className="text-xl font-bold mb-4">Popular Items</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Item Name</th>
                                    <th className="px-4 py-2">Orders</th>
                                    <th className="px-4 py-2">Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics.popularItems.map((item) => (
                                    <tr key={item.name}>
                                        <td className="px-4 py-2">{item.name}</td>
                                        <td className="px-4 py-2 text-center">{item.count}</td>
                                        <td className="px-4 py-2 text-right">₹{item.revenue.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
} 