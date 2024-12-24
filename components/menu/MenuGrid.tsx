"use client"
import { motion } from 'framer-motion';
import MenuItem from '@/components/menu/MenuItem';
import type { Category, MenuItem as MenuItemType } from '@/types/menu';

interface MenuGridProps {
    categories: Category[];
}

export default function MenuGrid({ categories }: MenuGridProps) {
    return (
        <div className="space-y-12">
            {categories.map((category) => (
                <div key={category.id} className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
                            {category.name}
                        </h2>
                        <p className="text-secondary-600 dark:text-secondary-400">
                            {category.description}
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {category.items.map((item: MenuItemType, index: number) => (
                            <MenuItem key={item.id} item={item} index={index} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
} 