"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
    const [activeFeature, setActiveFeature] = useState<number | null>(null);

    const features = [
        {
            title: "Fast Delivery",
            description: "Our dedicated delivery partners ensure your food arrives hot and fresh within 30 minutes.",
            icon: "🚀",
            stats: "Average delivery time: 25 mins"
        },
        {
            title: "Quality Food",
            description: "We partner with restaurants that maintain the highest standards of food quality and hygiene.",
            icon: "⭐",
            stats: "4.8/5 average rating"
        },
        {
            title: "24/7 Support",
            description: "Our customer support team is available round the clock to assist you with any queries.",
            icon: "💬",
            stats: "2 minute average response time"
        }
    ];

    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-5xl font-bold text-secondary-900 dark:text-white mb-6">
                        Our Story
                    </h1>
                    <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
                        From a simple idea to revolutionizing food delivery in your city
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="space-y-6 text-secondary-600 dark:text-secondary-400">
                            <p className="text-lg">
                                Welcome to FoodManiya, where passion for food meets convenience.
                                We believe that great food should be accessible to everyone,
                                delivered right to your doorstep without compromising on quality.
                            </p>
                            <motion.div
                                className="bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-lg"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h3 className="text-2xl font-bold text-primary-600 mb-2">Our Mission</h3>
                                <p>To deliver happiness through food, one order at a time.</p>
                            </motion.div>
                            <p className="text-lg">
                                Our journey began with a simple idea: to connect food lovers
                                with the best restaurants in town. Today, we&apos;re proud to serve
                                thousands of satisfied customers, delivering not just food,
                                but memorable dining experiences.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative h-[500px] rounded-lg overflow-hidden shadow-xl"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b"
                            alt="Restaurant interior"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                            className="card cursor-pointer group"
                            onMouseEnter={() => setActiveFeature(index)}
                            onMouseLeave={() => setActiveFeature(null)}
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="text-4xl mb-4 block">{feature.icon}</span>
                            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                                {feature.description}
                            </p>
                            <div
                                className={`text-primary-600 font-semibold transition-opacity duration-300 ${activeFeature === index ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                {feature.stats}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Section */}
                <motion.div
                    className="mt-24 bg-white dark:bg-secondary-800 rounded-lg shadow-xl p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-primary-600 mb-2">50K+</div>
                            <div className="text-secondary-600 dark:text-secondary-400">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary-600 mb-2">100+</div>
                            <div className="text-secondary-600 dark:text-secondary-400">Restaurant Partners</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary-600 mb-2">500K+</div>
                            <div className="text-secondary-600 dark:text-secondary-400">Orders Delivered</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
} 