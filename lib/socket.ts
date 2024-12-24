import { Server as NetServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { NextApiResponse } from 'next';

export type NextApiResponseWithSocket = NextApiResponse & {
    socket: {
        server: NetServer & {
            io?: SocketIOServer;
        };
    };
};

export const initSocket = (res: NextApiResponseWithSocket) => {
    if (!res.socket.server.io) {
        const io = new SocketIOServer(res.socket.server);
        res.socket.server.io = io;

        io.on('connection', (socket: Socket) => {
            console.log('Client connected');

            socket.on('join-order-room', (orderId: string) => {
                socket.join(`order-${orderId}`);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
    return res.socket.server.io;
}; 