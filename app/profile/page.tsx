"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const { data: session, update } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Validate passwords if trying to change
            if (formData.newPassword) {
                if (formData.newPassword.length < 6) {
                    throw new Error("New password must be at least 6 characters");
                }
                if (formData.newPassword !== formData.confirmPassword) {
                    throw new Error("Passwords do not match");
                }
            }

            const res = await fetch("/api/user/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            // Update the session with new data
            await update({
                ...session,
                user: {
                    ...session?.user,
                    name: formData.name,
                }
            });

            toast.success("Profile updated successfully", {
                position: "top-center",
            });

            // Clear password fields
            setFormData(prev => ({
                ...prev,
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            }));
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Update failed", {
                position: "top-center",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card"
                >
                    <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8">
                        Profile Settings
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
                                value={formData.name}
                                onChange={handleChange}
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
                                value={formData.email}
                                disabled
                                className="input bg-secondary-100 dark:bg-secondary-800"
                            />
                            <p className="text-sm text-secondary-500 mt-1">
                                Email cannot be changed
                            </p>
                        </div>
                        <div className="border-t border-secondary-200 dark:border-secondary-700 pt-6">
                            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                                Change Password
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="currentPassword" className="label">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        id="currentPassword"
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="newPassword" className="label">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        minLength={6}
                                        className="input"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="label">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn-primary w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Updating..." : "Update Profile"}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
} 