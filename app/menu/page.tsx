import MenuGrid from "@/components/menu/MenuGrid";
import { categories } from "@/src/data/menu";

export default function MenuPage() {
    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8">
                    Our Menu
                </h1>
                <MenuGrid categories={categories} />
            </div>
        </div>
    );
} 