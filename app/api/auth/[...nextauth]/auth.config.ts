import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

// Define types for token and session
declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            email?: string;
            role?: string;
            name?: string;
        }
    }

    interface JWT {
        id?: string;
        role?: string;
    }
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Invalid credentials");
                    }

                    await connectToDb();

                    // Debug log
                    console.log("Looking for user with email:", credentials.email);

                    const user = await User.findOne({ email: credentials.email }).select('+hashedPassword');

                    if (!user) {
                        console.log("User not found");
                        throw new Error("Invalid credentials");
                    }

                    if (!user.hashedPassword) {
                        console.log("User has no password");
                        throw new Error("Invalid credentials");
                    }

                    // Debug log
                    console.log("Found user:", user._id, "Comparing passwords...");

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.hashedPassword
                    );

                    // Debug log
                    console.log("Password valid:", isPasswordValid);

                    if (!isPasswordValid) {
                        throw new Error("Invalid credentials");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        role: user.role
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    throw error;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}; 