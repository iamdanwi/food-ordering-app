import { useState, ChangeEvent } from "react";
import { MenuItem, Category } from "@/types/menu";

interface MenuItemModalProps {
    item: MenuItem | null;
    onClose: () => void;
    onSave: (item: MenuItem) => void;
    categories: Category[];
}

export function MenuItemModal({ item, onClose, onSave, categories }: MenuItemModalProps) {
    const [formData, setFormData] = useState<MenuItem>(
        item || {
            id: Date.now(),
            name: "",
            description: "",
            price: 0,
            image: "",
            category: categories[0]?.id || "",
            isVeg: false,
        }
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">
                    {item ? "Edit Item" : "Add New Item"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="label">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>
                    {/* Add other form fields */}
                    <button type="submit" className="btn-primary w-full">
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn-secondary w-full"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
} 