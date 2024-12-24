import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDb } from "@/lib/mongodb";
import { User } from "@/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth.config";

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

        const users = await User.find({}, { hashedPassword: 0 }).sort({ createdAt: -1 });

        return NextResponse.json({ users });
    } catch (error) {
        console.error("Users fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
} 