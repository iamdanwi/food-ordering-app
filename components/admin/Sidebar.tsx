"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HomeIcon,
    UsersIcon,
    ClipboardDocumentListIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';

const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: HomeIcon },
    { href: '/admin/users', label: 'Users', icon: UsersIcon },
    { href: '/admin/orders', label: 'Orders', icon: ClipboardDocumentListIcon },
    { href: '/admin/analytics', label: 'Analytics', icon: ChartBarIcon },
    { href: '/admin/settings', label: 'Settings', icon: Cog6ToothIcon },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col w-64 bg-white border-r">
            <div className="flex items-center justify-center h-16 border-b">
                <h1 className="text-xl font-semibold">Admin Panel</h1>
            </div>
            <nav className="flex-1 overflow-y-auto">
                <ul className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-indigo-600' : 'text-gray-700'
                                        }`}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="p-4 border-t">
                <button
                    onClick={() => signOut({ callbackUrl: '/auth/login' })}
                    className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                    <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
                    Sign Out
                </button>
            </div>
        </div>
    );
} 