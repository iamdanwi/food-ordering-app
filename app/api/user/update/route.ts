import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { connectToDb } from "@/lib/mongodb";
import { User } from "@/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth.config";

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { name, currentPassword, newPassword } = body;

        await connectToDb();

        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // If trying to change password, verify current password
        if (newPassword) {
            if (!currentPassword) {
                return NextResponse.json(
                    { error: "Current password is required" },
                    { status: 400 }
                );
            }

            const isCorrectPassword = await bcrypt.compare(
                currentPassword,
                user.hashedPassword
            );

            if (!isCorrectPassword) {
                return NextResponse.json(
                    { error: "Current password is incorrect" },
                    { status: 400 }
                );
            }

            const hashedPassword = await bcrypt.hash(newPassword, 12);
            user.hashedPassword = hashedPassword;
        }

        if (name) {
            user.name = name;
        }

        await user.save();

        return NextResponse.json(
            { message: "Profile updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json(
            { error: "An error occurred while updating profile" },
            { status: 500 }
        );
    }
} 