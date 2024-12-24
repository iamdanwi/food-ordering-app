"use client"
import { MenuItem as MenuItemType } from "@/types/menu";

interface MenuItemProps {
    item: MenuItemType;
}

export default function MenuItem({ item }: MenuItemProps) {
    return (
        <div className="card">
            <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
            />
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