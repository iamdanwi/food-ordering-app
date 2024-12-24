export interface User {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserInput {
    name: string;
    email: string;
    password: string;
} 