'use client';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                        Something went wrong!
                    </h2>
                    <button
                        onClick={reset}
                        className="btn-primary"
                    >
                        Try again
                    </button>
                </div>
            </div>
        </div>
    );
} 