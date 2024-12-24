import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-2xl font-bold text-primary-600">
                            FoodManiya
                        </Link>
                        <p className="mt-4 text-secondary-600 dark:text-secondary-400 max-w-md">
                            Experience luxury dining at your doorstep. We bring you the finest cuisine
                            with impeccable service and attention to detail.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 uppercase tracking-wider">
                            Quick Links
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/menu" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 uppercase tracking-wider">
                            Contact Us
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li className="text-secondary-600 dark:text-secondary-400">
                                123 Luxury Lane
                                <br />
                                Gourmet City, GC 12345
                            </li>
                            <li>
                                <a href="tel:+1234567890" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@foodmaniya.com" className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
                                    info@foodmaniya.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-secondary-200 dark:border-secondary-800">
                    <p className="text-center text-secondary-600 dark:text-secondary-400">
                        © {new Date().getFullYear()} FoodManiya. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
} 