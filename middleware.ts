import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // Verify admin access
        if (
            req.nextUrl.pathname.startsWith("/admin") &&
            req.nextauth.token?.role !== "ADMIN"
        ) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/admin/:path*", "/profile", "/orders"],
}; 