import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/auth.config";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        return NextResponse.json({
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            role: session.user.role
        });
    } catch (error) {
        console.error("Session fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch user data" },
            { status: 500 }
        );
    }
} 