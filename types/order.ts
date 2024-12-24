import type { OrderStatus } from './enums';

export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
    isVeg: boolean;
}

export interface Order {
    _id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    address: string;
    phone: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
}

export type { OrderStatus } from './enums'; 