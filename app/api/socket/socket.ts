/* eslint-disable no-var */
import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import type { Server } from 'socket.io';

export const config = {
    api: {
        bodyParser: false,
    },
};

declare global {
    var io: Server | undefined;
}

export function initSocket(server: NetServer): Server {
    if (!global.io) {
        console.log('*First use, starting Socket.IO');
        global.io = new SocketIOServer(server, {
            path: '/api/socket',
            addTrailingSlash: false,
        });
    }
    return global.io;
} 