import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDb } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(request: Request) {
    try {
        const { name, email, password, adminCode } = await request.json();

        if (!name || !email || !password || !adminCode) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Verify admin registration code
        if (adminCode !== process.env.ADMIN_REGISTRATION_CODE) {
            return NextResponse.json(
                { error: "Invalid admin registration code" },
                { status: 403 }
            );
        }

        await connectToDb();

        // Check if admin already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // Create admin user
        await User.create({
            name,
            email,
            hashedPassword,
            role: "ADMIN" // Set role as ADMIN
        });

        return NextResponse.json(
            { message: "Admin registered successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Admin registration error:", error);
        return NextResponse.json(
            { error: "Failed to register admin" },
            { status: 500 }
        );
    }
} 