import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SiteLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-16">
                {children}
            </main>
            <Footer />
        </>
    );
} 