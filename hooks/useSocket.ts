"use client";
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (orderId?: string) => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        // Initialize socket connection
        if (!socketRef.current) {
            socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || '', {
                path: '/api/socket',
            });

            // Connection event handlers
            socketRef.current.on('connect', () => {
                console.log('Socket connected');
            });

            socketRef.current.on('error', (error) => {
                console.error('Socket error:', error);
            });
        }

        // Join order-specific room if orderId is provided
        if (orderId && socketRef.current) {
            socketRef.current.emit('join-order-room', orderId);
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [orderId]);

    return socketRef.current;
}; 