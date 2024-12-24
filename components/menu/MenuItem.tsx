"use client"
import Image from "next/image";
import { MenuItem as MenuItemType } from "@/types/menu";

interface MenuItemProps {
    item: MenuItemType;
}

export default function MenuItem({ item }: MenuItemProps) {
    return (
        <div className="card">
            <div className="relative w-full h-48">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-secondary-600">{item.description}</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl font-bold">₹{item.price}</span>
                    {item.isVeg ? (
                        <span className="text-green-600">Veg</span>
                    ) : (
                        <span className="text-red-600">Non-veg</span>
                    )}
                </div>
            </div>
        </div>
    );
} 