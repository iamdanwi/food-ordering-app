import mongoose from 'mongoose';

// Define the status type inline instead of importing
const ORDER_STATUS = [
    'PENDING',
    'CONFIRMED',
    'PREPARING',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'CANCELLED'
] as const;

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        id: Number,
        name: String,
        price: Number,
        quantity: Number,
    }],
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ORDER_STATUS,
        default: 'PENDING',
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema); 