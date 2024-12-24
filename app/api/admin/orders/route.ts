import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDb } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth.config";
import type { OrderStatus } from "@/types/order";

interface OrderQuery {
    status?: OrderStatus;
    $or?: Array<{
        [key: string]: {
            $regex: string;
            $options: string;
        };
    }>;
}

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status') as OrderStatus | null;
        const sort = searchParams.get('sort') || '-createdAt';
        const search = searchParams.get('search') || '';

        await connectToDb();

        const query: OrderQuery = {};

        // Add status filter if provided
        if (status) {
            query.status = status;
        }

        // Add search filter if provided
        if (search) {
            query.$or = [
                { '_id': { $regex: search, $options: 'i' } },
                { 'userId': { $regex: search, $options: 'i' } },
                { 'phone': { $regex: search, $options: 'i' } },
            ];
        }

        const orders = await Order.find(query).sort(sort);

        return NextResponse.json({ orders });
    } catch (error) {
        console.error("Orders fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch orders" },
            { status: 500 }
        );
    }
} 