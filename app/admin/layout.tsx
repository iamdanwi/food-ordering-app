"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const adminNavItems = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/menu", label: "Menu" },
    { href: "/admin/analytics", label: "Analytics" },
    { href: "/admin/users", label: "Users" },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
            return;
        }

        if (status === "authenticated" && session?.user?.role !== "ADMIN") {
            router.push("/");
            return;
        }
    }, [status, session, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                            Loading...
                        </h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
            {/* Admin Navigation */}
            <nav className="bg-white dark:bg-secondary-800 shadow-sm fixed top-16 w-full z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8 h-16 items-center">
                        {adminNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white px-3 py-2 text-sm font-medium"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-32">
                {children}
            </div>
        </div>
    );
} 