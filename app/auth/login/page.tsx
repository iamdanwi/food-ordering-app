"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Invalid credentials", {
                    position: "top-center",
                    duration: 3000,
                });
                return;
            }

            router.push("/menu");
            router.refresh();
        } catch {
            toast.error("An error occurred during login", {
                position: "top-center",
                duration: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card"
                >
                    <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8">
                        Login
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="input"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="input"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn-primary w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Login"}
                        </button>
                    </form>
                    <p className="mt-4 text-center text-secondary-600 dark:text-secondary-400">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/auth/register"
                            className="text-primary-600 hover:text-primary-500"
                        >
                            Register
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
} 