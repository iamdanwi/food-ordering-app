"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const FEATURED_DISHES = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        alt: "Luxury plated dish"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
        alt: "Gourmet pasta"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
        alt: "Perfect pizza"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        alt: "Healthy salad"
    }
];

export default function Hero() {
    return (
        <div className="relative min-h-[calc(100vh-4rem)] flex items-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                    alt="Restaurant ambiance"
                    fill
                    className="object-cover brightness-50"
                    priority
                />
            </div>

            {/* Hero Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Experience Luxury
                            <span className="text-primary-400"> Dining</span>
                        </h1>
                        <p className="text-lg text-gray-200 mb-8 max-w-lg">
                            Indulge in exquisite flavors and impeccable service. Our carefully curated menu
                            brings the finest cuisine straight to your doorstep.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/menu" className="btn-primary">
                                View Menu
                            </Link>
                            <Link href="/about" className="btn-secondary">
                                Learn More
                            </Link>
                        </div>
                    </motion.div>

                    {/* Featured Dishes Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hidden md:grid grid-cols-2 gap-4"
                    >
                        {FEATURED_DISHES.map((dish) => (
                            <div
                                key={dish.id}
                                className="relative h-40 rounded-lg overflow-hidden hover:scale-105 transition-transform"
                            >
                                <Image
                                    src={dish.image}
                                    alt={dish.alt}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 