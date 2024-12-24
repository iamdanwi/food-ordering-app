"use client"
import { motion } from 'framer-motion';
import {
    ClockIcon,
    SparklesIcon,
    TruckIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

const features = [
    {
        name: 'Quick Delivery',
        description: 'Fresh and hot delivery within 30 minutes',
        icon: TruckIcon,
    },
    {
        name: 'Premium Quality',
        description: 'Sourced from the finest ingredients',
        icon: SparklesIcon,
    },
    {
        name: '24/7 Service',
        description: 'Available round the clock for your cravings',
        icon: ClockIcon,
    },
    {
        name: 'Secure Payments',
        description: 'Multiple secure payment options available',
        icon: ShieldCheckIcon,
    },
];

export default function Features() {
    return (
        <section className="py-20 bg-white dark:bg-secondary-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
                        Why Choose FoodManiya?
                    </h2>
                    <p className="text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                        We strive to provide the best dining experience with our premium services
                        and attention to detail.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="mx-auto h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                                <feature.icon className="h-6 w-6 text-primary-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                                {feature.name}
                            </h3>
                            <p className="text-secondary-600 dark:text-secondary-400">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
} 