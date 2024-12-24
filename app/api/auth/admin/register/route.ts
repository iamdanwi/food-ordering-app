import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDb } from "@/lib/mongodb";
import { User } from "@/models/User";
import { z } from "zod";

const adminSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    adminCode: z.string().min(6),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = adminSchema.parse(body);

        // Verify admin registration code
        if (validatedData.adminCode !== process.env.ADMIN_REGISTRATION_CODE) {
            return NextResponse.json(
                { error: "Invalid admin registration code" },
                { status: 403 }
            );
        }

        await connectToDb();

        // Check if email already exists
        const existingUser = await User.findOne({ email: validatedData.email });
        if (existingUser) {
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(validatedData.password, 12);

        // Create admin user
        await User.create({
            name: validatedData.name,
            email: validatedData.email,
            hashedPassword,
            role: "ADMIN",
            active: true,
        });

        return NextResponse.json(
            { message: "Admin created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Admin registration error:", error);
        return NextResponse.json(
            { error: "Failed to create admin account" },
            { status: 500 }
        );
    }
} 