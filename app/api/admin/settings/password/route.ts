import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { connectToDb } from "@/lib/mongodb";
import { User } from "@/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth.config";

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { currentPassword, newPassword, confirmPassword } = await request.json();

        if (!currentPassword || !newPassword || !confirmPassword) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        if (newPassword !== confirmPassword) {
            return NextResponse.json(
                { error: "New passwords do not match" },
                { status: 400 }
            );
        }

        await connectToDb();

        const user = await User.findById(session.user.id).select('+hashedPassword');

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            user.hashedPassword
        );

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Current password is incorrect" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.hashedPassword = hashedPassword;
        await user.save();

        return NextResponse.json(
            { message: "Password updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Password update error:", error);
        return NextResponse.json(
            { error: "Failed to update password" },
            { status: 500 }
        );
    }
} 