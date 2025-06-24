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
        primaryColor: string; // We'll keep the color logic for dynamic theming
    };
}

export function TapriHeader({ tapri }: HeaderProps) {
    const [activeSection, setActiveSection] = useState("overview");

    // This client-side effect tracks scroll position to highlight the active nav link
    useEffect(() => {
        const sections = ["overview", "about", "roles", "roadmap", "contact"];
        const handleScroll = () => {
            const current = sections.find((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Adjust threshold to be more forgiving
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
        { id: "roadmap", label: "Roadmap", emoji: "🚀" },
        { id: "contact", label: "Contact", emoji: "📩" },
    ];
    
    // Using a more robust way to handle dynamic Tailwind classes
    const primaryColorStyles = {
        text: `text-${tapri.primaryColor}-400`,
        border: `border-${tapri.primaryColor}-400`,
        bg: `bg-${tapri.primaryColor}-600`,
        hoverBg: `hover:bg-${tapri.primaryColor}-700`,
        hoverText: `hover:text-${tapri.primaryColor}-400`,
    }

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
                    <h1 className={`text-xl md:text-2xl font-bold ${primaryColorStyles.text}`}>
                        {tapri.title}
                    </h1>
                </div>
                {/* Scrollable nav for mobile */}
                <nav className="flex items-center gap-2 md:gap-4 overflow-x-auto whitespace-nowrap scrollbar-hidden">
                    {navLinks.map((link) => (
                        <motion.div key={link.id} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                            <Link
                                href={`#${link.id}`}
                                className={`text-sm font-semibold px-2 py-2 transition-colors flex items-center gap-1.5 rounded-md ${
                                    activeSection === link.id
                                        ? `${primaryColorStyles.text} bg-white/10`
                                        : `text-gray-300 ${primaryColorStyles.hoverText}`
                                }`}
                            >
                                <span className="hidden sm:inline">{link.label}</span> {link.emoji}
                            </Link>
                        </motion.div>
                    ))}
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                        <Button
                            asChild
                            className={`${primaryColorStyles.bg} ${primaryColorStyles.hoverBg} text-white px-4 py-2 rounded-full shadow-md text-sm`}
                        >
                             <Link href="#contact">Join Now</Link>
                        </Button>
                    </motion.div>
                </nav>
            </div>
        </header>
    );
}
