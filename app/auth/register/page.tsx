"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || "Registration failed");
            }

            toast.success("Registration successful!", {
                position: "top-center",
                duration: 3000,
            });
            router.push("/auth/login");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Registration failed", {
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
                        Register
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="label">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="input"
                            />
                        </div>
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
                                minLength={6}
                                className="input"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn-primary w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating account..." : "Register"}
                        </button>
                    </form>
                    <p className="mt-4 text-center text-secondary-600 dark:text-secondary-400">
                        Already have an account?{" "}
                        <Link
                            href="/auth/login"
                            className="text-primary-600 hover:text-primary-500"
                        >
                            Login
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
} 