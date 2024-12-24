interface CardProps {
    className?: string;
    children: React.ReactNode;
}

export function Card({ className = "", children }: CardProps) {
    return (
        <div className={`bg-white rounded-lg shadow-md ${className}`}>
            {children}
        </div>
    );
}

interface CardContentProps {
    className?: string;
    children: React.ReactNode;
}

export function CardContent({ className = "", children }: CardContentProps) {
    return (
        <div className={`p-4 ${className}`}>
            {children}
        </div>
    );
} 