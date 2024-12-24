import "next-auth";

declare module "next-auth" {
    interface User {
        role?: string;
        id?: string;
        active?: boolean;
    }

    interface Session {
        user: User & {
            role?: string;
            id?: string;
            active?: boolean;
        };
    }
} 