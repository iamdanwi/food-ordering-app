export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    isVeg: boolean;
}

export interface CartItem extends MenuItem {
    quantity: number;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    items: MenuItem[];
} 