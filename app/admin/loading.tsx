export default function Loading() {
    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="animate-pulse">
                    <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded w-1/4 mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="card">
                                <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2 mb-4"></div>
                                <div className="h-10 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 