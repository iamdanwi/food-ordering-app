import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MainTemplate({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
        </>
    );
} 