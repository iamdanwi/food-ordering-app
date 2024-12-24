interface MenuHeaderProps {
    title: string;
    description: string;
}

export default function MenuHeader({ title, description }: MenuHeaderProps) {
    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
                {title}
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400">
                {description}
            </p>
        </div>
    );
} 