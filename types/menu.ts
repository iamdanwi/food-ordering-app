export type MenuItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    isVeg: boolean;
    description?: string;
};

export type CartItem = MenuItem & {
    quantity: number;
};

export type Category = {
    id: string;
    name: string;
    description: string;
    items: MenuItem[];
}; 