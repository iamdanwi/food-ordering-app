import { NextResponse } from 'next/server';
import { createServer } from 'http';
import { initSocket } from './socket';

export const runtime = 'nodejs';

export async function GET() {
    try {
        const httpServer = createServer();
        const io = initSocket(httpServer);

        io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);

            socket.on('orderStatusUpdated', (data) => {
                io.to(`order-${data.orderId}`).emit('orderStatusUpdated', data);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });

        return new NextResponse('Socket.IO server is running', {
            status: 200,
        });
    } catch (error) {
        console.error('Socket initialization error:', error);
        return new NextResponse('Failed to initialize Socket.IO server', {
            status: 500,
        });
    }
} 