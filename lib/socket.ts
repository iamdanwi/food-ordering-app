import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initializeSocket = () => {
    socket = io({
        path: '/api/socket',
        addTrailingSlash: false,
    });

    socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
    });

    socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
    });

    return socket;
};

export const getSocket = () => {
    if (!socket) {
        return initializeSocket();
    }
    return socket;
}; 