import { Socket } from 'socket.io-client';
import type { OrderStatus } from './order';

export interface ServerToClientEvents {
    orderStatusUpdated: (data: { orderId: string; status: OrderStatus }) => void;
}

export interface ClientToServerEvents {
    joinOrder: (orderId: string) => void;
    leaveOrder: (orderId: string) => void;
}

export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>; 