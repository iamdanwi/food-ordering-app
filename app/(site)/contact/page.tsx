"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeCard, setActiveCard] = useState<number | null>(null);

    const contactInfo = [
        {
            icon: <PhoneIcon className="h-6 w-6" />,
            title: "Phone",
            details: "+1 (555) 123-4567",
            description: "Mon-Sun 9am to 10pm"
        },
        {
            icon: <EnvelopeIcon className="h-6 w-6" />,
            title: "Email",
            details: "support@foodmaniya.com",
            description: "We reply within 24 hours"
        },
        {
            icon: <MapPinIcon className="h-6 w-6" />,
            title: "Address",
            details: "123 Food Street",
            description: "New York, NY 10001"
        }
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Message sent successfully!", {
            position: "top-center",
            duration: 3000,
        });

        setIsSubmitting(false);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-5xl font-bold text-secondary-900 dark:text-white mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
                        Have questions about our service? We&apos;re here to help!
                    </p>
                </motion.div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {contactInfo.map((info, index) => (
                        <motion.div
                            key={info.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="card cursor-pointer text-center"
                            onMouseEnter={() => setActiveCard(index)}
                            onMouseLeave={() => setActiveCard(null)}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className={`inline-block p-4 rounded-full mb-4 transition-colors duration-300 ${activeCard === index
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400'
                                }`}>
                                {info.icon}
                            </div>
                            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">
                                {info.title}
                            </h3>
                            <p className="text-primary-600 font-semibold mb-1">
                                {info.details}
                            </p>
                            <p className="text-secondary-600 dark:text-secondary-400">
                                {info.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-2xl mx-auto"
                >
                    <form onSubmit={handleSubmit} className="card space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="input"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="input"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="label">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                className="input"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="label">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                required
                                className="input"
                            />
                        </div>
                        <motion.button
                            type="submit"
                            className="btn-primary w-full py-3"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
} 