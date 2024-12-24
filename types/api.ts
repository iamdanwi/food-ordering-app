import type { Order } from './order';
import type { MenuItem } from './menu';

// API Response Types
export interface ApiResponse<T> {
    data?: T;
    error?: string;
    status: 'success' | 'error';
}

export interface DashboardStats {
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    activeUsers: number;
}

export interface OrdersResponse {
    orders: Order[];
    total: number;
    page: number;
    limit: number;
}

export interface MenuResponse {
    items: MenuItem[];
    categories: string[];
}

// API Error Types
export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public code?: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// Input Validation Types
export interface OrderInput {
    items: Array<{
        id: number;
        quantity: number;
    }>;
    address: string;
    phone: string;
    paymentMethod: string;
}

export interface MenuItemInput {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    isVeg: boolean;
} 