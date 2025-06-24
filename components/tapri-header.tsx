// components/tapri-header.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeaderProps {
    tapri: {
        title: string;
        logo_url: string | null;
        primaryColor: string;
    };
}

// THIS IS THE CRITICAL FIX: We map a color name to actual, full Tailwind class strings.
// Tailwind can now find and generate these classes during the build process.
const colorVariants: { [key: string]: { text: string; bg: string; hoverBg: string; hoverText: string; border: string; } } = {
  blue: { text: 'text-blue-400', bg: 'bg-blue-600', hoverBg: 'hover:bg-blue-700', hoverText: 'hover:text-blue-400', border: 'border-blue-500' },
  green: { text: 'text-green-400', bg: 'bg-green-600', hoverBg: 'hover:bg-green-700', hoverText: 'hover:text-green-400', border: 'border-green-500' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-600', hoverBg: 'hover:bg-purple-700', hoverText: 'hover:text-purple-400', border: 'border-purple-500' },
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-600', hoverBg: 'hover:bg-cyan-700', hoverText: 'hover:text-cyan-400', border: 'border-cyan-500' },
  yellow: { text: 'text-yellow-400', bg: 'bg-yellow-600', hoverBg: 'hover:bg-yellow-700', hoverText: 'hover:text-yellow-400', border: 'border-yellow-500' },
  red: { text: 'text-red-400', bg: 'bg-red-600', hoverBg: 'hover:bg-red-700', hoverText: 'hover:text-red-400', border: 'border-red-500' },
  pink: { text: 'text-pink-400', bg: 'bg-pink-600', hoverBg: 'hover:bg-pink-700', hoverText: 'hover:text-pink-400', border: 'border-pink-500' },
  orange: { text: 'text-orange-400', bg: 'bg-orange-600', hoverBg: 'hover:bg-orange-700', hoverText: 'hover:text-orange-400', border: 'border-orange-500' },
  gray: { text: 'text-gray-400', bg: 'bg-gray-600', hoverBg: 'hover:bg-gray-700', hoverText: 'hover:text-gray-400', border: 'border-gray-500' },
};


export function TapriHeader({ tapri }: HeaderProps) {
    const [activeSection, setActiveSection] = useState("overview");

    useEffect(() => {
        const sections = ["overview", "about", "roles", "roadmap", "contact"];
        const handleScroll = () => {
            const current = sections.find((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) {
                setActiveSection(current);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { id: "overview", label: "Overview", emoji: "🌟" },
        { id: "about", label: "About", emoji: "🫶" },
        { id: "roles", label: "Roles", emoji: "💼" },
    ];
    
    const styles = colorVariants[tapri.primaryColor] || colorVariants.gray;

    return (
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 shadow-lg">
            <div className="container px-4 md:px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }}>
                        <Image
                            src={tapri.logo_url || "/images/tapri-logo.jpeg"}
                            alt={`${tapri.title} logo`}
                            width={48}
                            height={48}
                            className="object-cover rounded-full border-2 border-gray-700"
                        />
                    </motion.div>
                    <h1 className={`text-xl md:text-2xl font-bold ${styles.text}`}>
                        {tapri.title}
                    </h1>
                </div>
                <nav className="flex items-center gap-2 md:gap-4 overflow-x-auto whitespace-nowrap scrollbar-hidden">
                    {navLinks.map((link) => (
                        <motion.div key={link.id} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                            <Link
                                href={`#${link.id}`}
                                className={`text-sm font-semibold px-2 py-2 transition-colors flex items-center gap-1.5 rounded-md ${
                                    activeSection === link.id
                                        ? `${styles.text} bg-white/10`
                                        : `text-gray-300 ${styles.hoverText}`
                                }`}
                            >
                                <span className="hidden sm:inline">{link.label}</span> {link.emoji}
                            </Link>
                        </motion.div>
                    ))}
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                        <Button asChild className={`${styles.bg} ${styles.hoverBg} text-white px-4 py-2 rounded-full shadow-md text-sm`}>
                             <Link href="#contact">Join Now</Link>
                        </Button>
                    </motion.div>
                </nav>
            </div>
        </header>
    );
}
