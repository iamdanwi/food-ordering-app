import { useEffect } from 'react';
import { useSocket } from './useSocket';
import type { OrderStatus } from '@/types/order';

interface OrderUpdate {
    orderId: string;
    status: OrderStatus;
}

export function useOrderUpdates(orderId: string, onUpdate: (status: OrderStatus) => void) {
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        socket.emit('joinOrder', orderId);

        socket.on('orderStatusUpdated', (data: OrderUpdate) => {
            if (data.orderId === orderId) {
                onUpdate(data.status);
            }
        });

        return () => {
            socket.emit('leaveOrder', orderId);
            socket.off('orderStatusUpdated');
        };
    }, [socket, orderId, onUpdate]);
} 