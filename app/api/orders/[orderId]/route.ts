import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDb } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(
    request: Request,
    { params }: { params: { orderId: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const { orderId } = params;
        const body = await request.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json(
                { error: "Status is required" },
                { status: 400 }
            );
        }

        await connectToDb();

        const order = await Order.findById(orderId);

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        if (order.userId !== session.user.id) {
            return NextResponse.json(
                { error: "Not authorized" },
                { status: 403 }
            );
        }

        order.status = status;
        order.updatedAt = new Date();
        await order.save();

        return NextResponse.json({ message: "Order updated successfully" });
    } catch (error) {
        console.error("Order update error:", error);
        return NextResponse.json(
            { error: "Failed to update order" },
            { status: 500 }
        );
    }
}

export async function GET(
    request: Request,
    { params }: { params: { orderId: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const { orderId } = params;

        await connectToDb();

        const order = await Order.findById(orderId);

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        if (order.userId !== session.user.id) {
            return NextResponse.json(
                { error: "Not authorized" },
                { status: 403 }
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