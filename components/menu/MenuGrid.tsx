"use client"
import { Category } from "@/types/menu";
import MenuHeader from "./MenuHeader";
import MenuItem from "./MenuItem";

interface MenuGridProps {
    categories: Category[];
}

export default function MenuGrid({ categories }: MenuGridProps) {
    return (
        <div className="space-y-12">
            {categories.map((category) => (
                <div key={category.id}>
                    <MenuHeader
                        title={category.name}
                        description={category.description}
                    />
                    <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {category.items.map((item) => (
                            <MenuItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
} 