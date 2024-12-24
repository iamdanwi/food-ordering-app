import MenuGrid from "@/components/menu/MenuGrid";
import { categories } from "@/data/menu";

export default function MenuPage() {
    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <MenuGrid categories={categories} />
            </div>
        </div>
    );
} 