"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/Card';

function ErrorContent() {
    const searchParams = useSearchParams();
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const errorParam = searchParams.get('error');
        if (errorParam) {
            switch (errorParam) {
                case 'Signin':
                    setError('Try signing in with a different account.');
                    break;
                case 'OAuthSignin':
                    setError('Try signing in with a different account.');
                    break;
                case 'OAuthCallback':
                    setError('Try signing in with a different account.');
                    break;
                case 'OAuthCreateAccount':
                    setError('Try signing in with a different account.');
                    break;
                case 'EmailCreateAccount':
                    setError('Try signing in with a different account.');
                    break;
                case 'Callback':
                    setError('Try signing in with a different account.');
                    break;
                case 'OAuthAccountNotLinked':
                    setError('To confirm your identity, sign in with the same account you used originally.');
                    break;
                case 'EmailSignin':
                    setError('Check your email address.');
                    break;
                case 'CredentialsSignin':
                    setError('Invalid credentials. Please check your email and password.');
                    break;
                default:
                    setError('Unable to sign in.');
                    break;
            }
        }
    }, [searchParams]);

    return (
        <Card className="w-[380px] mx-auto mt-16">
            <CardContent className="p-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
                    <p className="text-red-500">{error}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default function ErrorPage() {
    return (
        <Suspense fallback={
            <Card className="w-[380px] mx-auto mt-16">
                <CardContent className="p-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
                    </div>
                </CardContent>
            </Card>
        }>
            <ErrorContent />
        </Suspense>
    );
} 