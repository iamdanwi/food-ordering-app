import { NextAuthOptions } from "next-auth";
import { connectToDb } from "@/lib/mongodb";
import { User } from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        // ... your providers ...
    ],
    callbacks: {
        async session({ session }) {
            if (session.user) {
                await connectToDb();
                const dbUser = await User.findOne({ email: session.user.email });
                if (dbUser) {
                    session.user.role = dbUser.role;
                    session.user.id = dbUser._id.toString();
                    session.user.active = dbUser.active;
                }
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
                token.active = user.active;
            }
            return token;
        }
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    }
}; 