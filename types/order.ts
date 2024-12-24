export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
    isVeg: boolean;
}

export type OrderStatus =
    | 'PENDING'
    | 'CONFIRMED'
    | 'PREPARING'
    | 'OUT_FOR_DELIVERY'
    | 'DELIVERED'
    | 'CANCELLED';

export interface Order {
    _id: string;
    userId: string;
    items: Array<{
        id: number;
        name: string;
        price: number;
        quantity: number;
    }>;
    total: number;
    status: OrderStatus;
    address: string;
    phone: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
} 