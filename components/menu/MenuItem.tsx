"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import type { MenuItem as MenuItemType } from '@/types/menu';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { getImageUrl, DEFAULT_FOOD_IMAGE } from '@/utils/imageUtils';

interface MenuItemProps {
    item: MenuItemType;
    index: number;
}

export default function MenuItem({ item, index }: MenuItemProps) {
    const { addItem } = useCart();
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const imageUrl = imageError ? DEFAULT_FOOD_IMAGE : getImageUrl(item.image);

    const handleAddToCart = () => {
        setIsLoading(true);
        try {
            addItem(item);
            toast.success(`${item.name} added to cart`, {
                position: "top-center",
                duration: 2000,
                icon: '🛒',
            });
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Failed to add item to cart";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card group hover:shadow-xl transition-shadow"
        >
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-secondary-100">
                <Image
                    src={imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={() => setImageError(true)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 6} // Prioritize loading for first 6 items
                />
                {item.isVeg && (
                    <div className="absolute top-2 right-2 bg-green-500 p-1 rounded-full">
                        <svg
                            className="h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                )}
            </div>
            <div className="p-4">
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
                    <button
                        onClick={handleAddToCart}
                        className="btn-primary py-2"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Adding...' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
} 