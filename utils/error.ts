import { ApiError } from '@/types/api';

export function handleApiError(error: unknown): never {
    if (error instanceof ApiError) {
        throw error;
    }

    if (error instanceof Error) {
        throw new ApiError(error.message, 500);
    }

    throw new ApiError('An unexpected error occurred', 500);
}

export async function withErrorHandling<T>(
    fn: () => Promise<T>,
    errorMessage = 'Operation failed'
): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        console.error(`${errorMessage}:`, error);
        throw handleApiError(error);
    }
} 