import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDb } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth.config";
import type { OrderStatus } from "@/types/order";
import type { Server } from "socket.io";

interface GlobalWithIO extends Global {
    io: Server;
}

export const runtime = 'nodejs';

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ orderId: string }> }
): Promise<NextResponse> {
    try {
        const session = await getServerSession(authOptions);

        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const resolvedParams = await params;
        const { orderId } = resolvedParams;
        const { status } = await request.json() as { status: OrderStatus };

        await connectToDb();

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        // Emit socket event for real-time updates
        const io = (global as unknown as GlobalWithIO).io;
        if (io) {
            io.to(`order-${orderId}`).emit('orderStatusUpdated', {
                orderId,
                status
            });
        }

        return NextResponse.json({ order });
    } catch (error) {
        console.error("Order update error:", error);
        return NextResponse.json(
            { error: "Failed to update order" },
            { status: 500 }
        );
    }
} 