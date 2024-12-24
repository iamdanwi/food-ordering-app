import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDb } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth.config";

export const runtime = 'nodejs';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ orderId: string }> }
): Promise<NextResponse> {
    try {
        const session = await getServerSession(authOptions);
        const params = await context.params;
        const { orderId } = params;

        await connectToDb();

        const order = await Order.findById(orderId);

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        // Only allow users to view their own orders unless they're an admin
        if (session?.user?.role !== "ADMIN" && order.userId !== session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        return NextResponse.json({ order });
    } catch (error) {
        console.error("Order fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch order" },
            { status: 500 }
        );
    }
} 