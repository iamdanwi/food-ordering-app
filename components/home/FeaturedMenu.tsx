"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const featuredItems = [
    {
        id: 1,
        name: 'Signature Burger',
        description: 'Premium beef patty with truffle mayo and caramelized onions',
        price: 499,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
        category: 'Main Course'
    },
    {
        id: 2,
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon with herbs and lemon butter sauce',
        price: 799,
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
        category: 'Main Course'
    },
    {
        id: 3,
        name: 'Truffle Pasta',
        description: 'Handmade pasta with black truffle and parmesan cream',
        price: 599,
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
        category: 'Main Course'
    },
    {
        id: 4,
        name: 'Chocolate Soufflé',
        description: 'Warm chocolate soufflé with vanilla ice cream',
        price: 299,
        image: 'https://images.unsplash.com/photo-1579306194872-64d3b7c47f15',
        category: 'Dessert'
    },
    {
        id: 5,
        name: 'Mediterranean Salad',
        description: 'Fresh greens with feta, olives, and balsamic dressing',
        price: 399,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999',
        category: 'Starters'
    },
    {
        id: 6,
        name: 'Seafood Paella',
        description: 'Spanish rice with mixed seafood and saffron',
        price: 899,
        image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a',
        category: 'Main Course'
    }
];

export default function FeaturedMenu() {
    return (
        <section className="py-20 bg-secondary-50 dark:bg-secondary-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
                        Featured Menu
                    </h2>
                    <p className="text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                        Discover our chef&apos;s specially curated selection of signature dishes that
                        define the essence of FoodManiya.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="card group hover:shadow-xl transition-shadow"
                        >
                            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-primary-600 font-semibold mb-2">
                                    {item.category}
                                </p>
                                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">
                                    {item.name}
                                </h3>
                                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                                    {item.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-secondary-900 dark:text-white">
                                        ₹{item.price}
                                    </span>
                                    <button className="btn-primary py-2">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/menu" className="btn-secondary">
                        View Full Menu
                    </Link>
                </div>
            </div>
        </section>
    );
} 