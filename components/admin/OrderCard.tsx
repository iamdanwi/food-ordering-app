import { useState } from "react";
import { Order, OrderStatus } from "@/types/order";
import { motion } from "framer-motion";

interface OrderCardProps {
    order: Order;
    onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

const statusOptions: OrderStatus[] = [
    'PENDING',
    'CONFIRMED',
    'PREPARING',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'CANCELLED'
];

export function OrderCard({ order, onUpdateStatus }: OrderCardProps) {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusChange = async (status: OrderStatus) => {
        setIsUpdating(true);
        try {
            await onUpdateStatus(order._id, status);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
        >
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold mb-2">
                        Order #{order._id.slice(-6)}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                        {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p className="text-secondary-600 dark:text-secondary-400">
                        Customer: {order.userId}
                    </p>
                    <p className="text-secondary-600 dark:text-secondary-400">
                        Phone: {order.phone}
                    </p>
                    <p className="text-secondary-600 dark:text-secondary-400">
                        Address: {order.address}
                    </p>
                </div>

                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="font-semibold">Status:</span>
                        <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                            disabled={isUpdating}
                            className="select"
                        >
                            {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <p className="text-lg font-bold">
                        Total: ₹{order.total.toFixed(2)}
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <h4 className="font-semibold mb-2">Items:</h4>
                <div className="space-y-2">
                    {order.items.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center"
                        >
                            <span>
                                {item.name} x {item.quantity}
                            </span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
} 