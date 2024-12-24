"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { MenuItem, Category } from "@/types/menu";
import { MenuItemCard } from "@/components/admin/MenuItemCard";
import { MenuItemModal } from "@/components/admin/MenuItemModal";

export default function AdminMenu() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
            return;
        }

        if (status === "authenticated" && session?.user?.role !== "ADMIN") {
            router.push("/");
            return;
        }

        fetchMenu();
    }, [status, session, router]);

    const fetchMenu = async () => {
        try {
            const res = await fetch('/api/admin/menu');
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            setCategories(data.categories);
        } catch (err) {
            console.error('Failed to fetch menu:', err);
            toast.error("Failed to fetch menu");
        } finally {
            setLoading(false);
        }
    };

    const handleEditItem = (item: MenuItem) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleSaveItem = async (updatedItem: MenuItem) => {
        try {
            const res = await fetch(`/api/admin/menu/${updatedItem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            toast.success("Item updated successfully");
            fetchMenu();
            setIsModalOpen(false);
        } catch (err) {
            console.error('Failed to update item:', err);
            toast.error("Failed to update item");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                            Loading...
                        </h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
                        Menu Management
                    </h1>
                    <button
                        onClick={() => {
                            setEditingItem(null);
                            setIsModalOpen(true);
                        }}
                        className="btn-primary"
                    >
                        Add New Item
                    </button>
                </div>

                {categories.map((category) => (
                    <div key={category.id} className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.items.map((item) => (
                                <MenuItemCard
                                    key={item.id}
                                    item={item}
                                    onEdit={handleEditItem}
                                />
                            ))}
                        </div>
                    </div>
                ))}

                {isModalOpen && (
                    <MenuItemModal
                        item={editingItem}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSaveItem}
                        categories={categories}
                    />
                )}
            </div>
        </div>
    );
}

// Continue with MenuItemCard and MenuItemModal components... 