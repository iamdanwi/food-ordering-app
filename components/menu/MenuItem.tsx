"use client"
import Image from "next/image";
import { MenuItem as MenuItemType } from "@/src/types/menu";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCartIcon, PlusIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

interface MenuItemProps {
    item: MenuItemType;
}

export default function MenuItem({ item }: MenuItemProps) {
    const { addItem } = useCart();

    const handleAddToCart = () => {
        addItem(item);
        toast.success(`${item.name} added to cart`);
    };

    return (
        <div className="card group">
            <div className="relative w-full h-48">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-2 right-2 p-2 bg-white dark:bg-secondary-800 rounded-full shadow-lg 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                             hover:bg-primary-50 dark:hover:bg-secondary-700"
                    title="Add to cart"
                >
                    <PlusIcon className="h-6 w-6 text-primary-600" />
                </button>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    {item.isVeg ? (
                        <span className="text-green-600">●</span>
                    ) : (
                        <span className="text-red-600">●</span>
                    )}
                </div>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">₹{item.price}</span>
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center gap-1 text-primary-600 hover:text-primary-700 
                                 transition-colors duration-200"
                        title="Add to cart"
                    >
                        <ShoppingCartIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
} 