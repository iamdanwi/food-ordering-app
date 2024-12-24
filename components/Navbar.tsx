"use client"
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/contexts/CartContext";
import {
    ShoppingCartIcon,
    UserIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { data: session } = useSession();
    const { items } = useCart();
    const cartItemsCount = items.length;

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="fixed top-0 w-full bg-white dark:bg-secondary-900 shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-bold text-primary-600">
                            FoodManiya
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/menu" className="nav-link">
                            Menu
                        </Link>
                        <Link href="/about" className="nav-link">
                            About
                        </Link>
                        <Link href="/contact" className="nav-link">
                            Contact
                        </Link>

                        {session ? (
                            <>
                                <Link href="/cart" className="nav-link relative">
                                    <ShoppingCartIcon className="h-6 w-6" />
                                    {cartItemsCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {cartItemsCount}
                                        </span>
                                    )}
                                </Link>
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        className="nav-link p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <UserIcon className="h-6 w-6" />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 w-48 py-2 mt-2 bg-white dark:bg-secondary-800 rounded-md shadow-xl">
                                            <Link
                                                href="/profile"
                                                className="dropdown-item"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                            <Link
                                                href="/orders"
                                                className="dropdown-item"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                Orders
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    signOut();
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="dropdown-item w-full text-left"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Link href="/auth/login" className="btn-primary">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-white"
                        >
                            {isMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            href="/menu"
                            className="mobile-nav-link"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Menu
                        </Link>
                        <Link
                            href="/about"
                            className="mobile-nav-link"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="mobile-nav-link"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        {session ? (
                            <>
                                <Link
                                    href="/cart"
                                    className="mobile-nav-link"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Cart
                                </Link>
                                <Link
                                    href="/profile"
                                    className="mobile-nav-link"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Profile
                                </Link>
                                <Link
                                    href="/orders"
                                    className="mobile-nav-link"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Orders
                                </Link>
                                <button
                                    onClick={() => {
                                        signOut();
                                        setIsMenuOpen(false);
                                    }}
                                    className="mobile-nav-link w-full text-left"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="mobile-nav-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
} 