import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDb } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth.config";
import type { OrderItem } from "@/types/order";

interface ItemStat {
    name: string;
    count: number;
    revenue: number;
}

interface ItemStats {
    [key: number]: ItemStat;
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectToDb();

        // Get all orders
        const orders = await Order.find().sort({ createdAt: -1 });

        // Calculate total orders and revenue
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const averageOrderValue = totalRevenue / totalOrders || 0;

        // Calculate orders by status
        const ordersByStatus = orders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        // Calculate revenue by day
        const revenueByDay = orders.reduce((acc, order) => {
            const date = new Date(order.createdAt).toLocaleDateString();
            acc[date] = (acc[date] || 0) + order.total;
            return acc;
        }, {} as Record<string, number>);

        // Calculate popular items
        const itemStats = orders.reduce((acc, order) => {
            order.items.forEach((item: OrderItem) => {
                if (!acc[item.id]) {
                    acc[item.id] = {
                        name: item.name,
                        count: 0,
                        revenue: 0
                    };
                }
                acc[item.id].count += item.quantity;
                acc[item.id].revenue += item.price * item.quantity;
            });
            return acc;
        }, {} as ItemStats);

        const popularItems = Object.values(itemStats)
            .sort((a, b) => {
                const itemA = a as ItemStat;
                const itemB = b as ItemStat;
                return itemB.count - itemA.count;
            })
            .slice(0, 10);

        return NextResponse.json({
            totalOrders,
            totalRevenue,
            averageOrderValue,
            ordersByStatus,
            revenueByDay,
            popularItems
        });
    } catch (error) {
        console.error("Analytics error:", error);
        return NextResponse.json(
            { error: "Failed to fetch analytics" },
            { status: 500 }
        );
    }
} 