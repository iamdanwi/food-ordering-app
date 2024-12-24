import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDb } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth.config";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        await connectToDb();

        const body = await request.json();
        const { items, total, address, phone, paymentMethod } = body;

        if (!items?.length || !total || !address || !phone) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        console.log('Creating order:', { userId: session.user.id, items, total, address, phone, paymentMethod }); // Debug log

        const order = await Order.create({
            userId: session.user.id,
            items,
            total,
            address,
            phone,
            paymentMethod,
            status: 'PENDING'
        });

        return NextResponse.json(
            {
                message: "Order created successfully",
                orderId: order._id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Order creation error:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        await connectToDb();

        const query = { userId: session.user.id };
        if (status) {
            Object.assign(query, { status });
        }

        const orders = await Order.find(query).sort({ createdAt: -1 });

        return NextResponse.json({ orders });
    } catch (error) {
        console.error("Order fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch orders" },
            { status: 500 }
        );
    }
} 