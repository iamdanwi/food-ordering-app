import { ReactNode } from 'react';
import AdminSidebar from '../../components/admin/Sidebar';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen">
            <div className="flex h-full">
                <AdminSidebar />
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
            <Toaster position="top-right" />
        </div>
    );
} 