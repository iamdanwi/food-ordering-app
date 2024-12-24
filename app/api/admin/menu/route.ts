import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDb } from "@/lib/mongodb";
import { MenuItem } from "@/models/MenuItem";
import { Category } from "@/models/Category";
import { authOptions } from "../../auth/[...nextauth]/route";

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

        const categories = await Category.find().populate('items');

        return NextResponse.json({ categories });
    } catch (error) {
        console.error("Menu fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch menu" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        await connectToDb();

        const newItem = await MenuItem.create(body);
        await Category.findByIdAndUpdate(
            body.category,
            { $push: { items: newItem._id } }
        );

        return NextResponse.json(
            { message: "Item created successfully", item: newItem },
            { status: 201 }
        );
    } catch (error) {
        console.error("Item creation error:", error);
        return NextResponse.json(
            { error: "Failed to create item" },
            { status: 500 }
        );
    }
} 