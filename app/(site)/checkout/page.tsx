"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function CheckoutPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { items, total, clearCart } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        address: "",
        phone: "",
        paymentMethod: "COD"
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            toast.error("Please login to continue");
            router.push("/auth/login?callbackUrl=/checkout");
            return;
        }

        if (items.length === 0) {
            router.push("/menu");
            return;
        }
    }, [status, items.length, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!session?.user?.id) {
                throw new Error("Not authenticated");
            }

            if (!formData.address || !formData.phone) {
                throw new Error("Please fill in all required fields");
            }

            if (items.length === 0) {
                throw new Error("Your cart is empty");
            }

            const orderData = {
                items: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                    category: item.category,
                    isVeg: item.isVeg
                })),
                total,
                address: formData.address.trim(),
                phone: formData.phone.trim(),
                paymentMethod: formData.paymentMethod
            };

            console.log('Submitting order:', orderData); // Debug log

            const res = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to place order");
            }

            clearCart();
            toast.success("Order placed successfully!");
            router.push(`/orders/${data.orderId}`);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to place order";
            toast.error(errorMessage);
            console.error('Order placement error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                            Order Summary
                        </h2>
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center"
                                >
                                    <div>
                                        <h3 className="text-secondary-900 dark:text-white">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-secondary-600 dark:text-secondary-400">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>
                                    <p className="text-secondary-900 dark:text-white">
                                        ₹{(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                            <div className="border-t pt-4">
                                <div className="flex justify-between font-bold">
                                    <p className="text-secondary-900 dark:text-white">Total</p>
                                    <p className="text-secondary-900 dark:text-white">
                                        ₹{total.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Checkout Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                            Delivery Details
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="address" className="label">
                                    Delivery Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    required
                                    value={formData.address}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            address: e.target.value,
                                        }))
                                    }
                                    className="input"
                                    placeholder="Enter your full delivery address"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="label">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            phone: e.target.value,
                                        }))
                                    }
                                    className="input"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div>
                                <label className="label">Payment Method</label>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="COD"
                                            checked={formData.paymentMethod === "COD"}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    paymentMethod: e.target.value,
                                                }))
                                            }
                                            className="text-primary-600"
                                        />
                                        <span className="text-secondary-900 dark:text-white">
                                            Cash on Delivery
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn-primary w-full py-3"
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Place Order"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 