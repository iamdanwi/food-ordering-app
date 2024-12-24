import { z } from 'zod';
import type { OrderInput, MenuItemInput } from '@/types/api';

// Order validation schema
export const orderSchema = z.object({
    items: z.array(z.object({
        id: z.number().positive(),
        quantity: z.number().min(1).max(99),
    })).min(1),
    address: z.string().min(10).max(200),
    phone: z.string().regex(/^\+?[\d\s-]{10,}$/),
    paymentMethod: z.enum(['CASH', 'CARD', 'UPI']),
});

// Menu item validation schema
export const menuItemSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(10).max(500),
    price: z.number().positive(),
    category: z.string().min(2).max(50),
    image: z.string().url(),
    isVeg: z.boolean(),
});

// Validation helper functions
export function validateOrder(input: OrderInput): z.infer<typeof orderSchema> {
    return orderSchema.parse(input);
}

export function validateMenuItem(input: MenuItemInput): z.infer<typeof menuItemSchema> {
    return menuItemSchema.parse(input);
} 