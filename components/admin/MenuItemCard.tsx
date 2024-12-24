import Image from "next/image";
import { MenuItem } from "@/types/menu";
import { getImageUrl } from "@/utils/imageUtils";

interface MenuItemCardProps {
    item: MenuItem;
    onEdit: (item: MenuItem) => void;
}

export function MenuItemCard({ item, onEdit }: MenuItemCardProps) {
    return (
        <div className="card hover:shadow-lg transition-shadow">
            <div className="relative h-48 mb-4">
                <Image
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-lg"
                />
                {item.isVeg && (
                    <div className="absolute top-2 right-2 bg-green-500 p-1 rounded-full">
                        <span className="sr-only">Vegetarian</span>
                        <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                    {item.description}
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">₹{item.price}</span>
                    <button
                        onClick={() => onEdit(item)}
                        className="btn-secondary"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
} 