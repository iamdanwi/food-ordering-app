import { Server } from 'socket.io';
import { NextApiResponseWithSocket } from '@/lib/socket';
import { NextResponse } from 'next/server';

export function GET(req: Request, res: NextApiResponseWithSocket) {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server, {
            path: '/api/socket',
            addTrailingSlash: false,
        });

        io.on('connection', (socket) => {
            console.log('Client connected');

            socket.on('join-order-room', (orderId: string) => {
                socket.join(`order-${orderId}`);
                console.log(`Client joined room: order-${orderId}`);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });

        res.socket.server.io = io;
    }

    return NextResponse.json({ success: true });
} 