"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "ABOUT", href: "#about" },
        { name: "PROPERTIES", href: "#featured-properties" },
        { name: "SERVICES", href: "#services" },
        { name: "CONTACT", href: "#contact-us" },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
                isScrolled
                    ? "bg-black/70 backdrop-blur-xl py-4 shadow-lg border-b border-white/10"
                    : "bg-gradient-to-b from-black/80 to-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-3">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-1 group"
                    onClick={(e) => {
                        if (pathname === "/") {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                    }}
                >
                    <div className="relative h-12 w-12 md:h-20 md:w-20 flex-shrink-0">
                        <img
                            src="/matrix-logo-transparent.png"
                            alt="Matrix MultiTech Ltd"
                            className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <h1 className="text-white font-montserrat font-bold text-[13px] sm:text-[16px] md:text-[20px] tracking-wide leading-none whitespace-nowrap">
                            MATRIX <span className="text-white">MULTITECH</span> <span className="text-accent transition-colors duration-300">LTD</span>
                        </h1>
                        <p className="text-gray-400 font-raleway text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.18em] md:tracking-[0.2em] leading-tight md:ml-[1px] whitespace-nowrap">
                            REAL ESTATE | TELECOM | SOFTWARE
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10">
                    <div className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative text-white/90 text-[13px] font-bold tracking-[1.5px] font-raleway uppercase group overflow-hidden"
                            >
                                <span className="relative z-10 group-hover:text-primary transition-colors duration-300">
                                    {link.name}
                                </span>
                                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-primary -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                            </Link>
                        ))}
                    </div>

                    <a
                        href="tel:+233267671110"
                        className="flex items-center gap-2.5 px-5 py-2.5 bg-primary/10 border border-primary/30 rounded-full hover:bg-primary hover:border-primary transition-all duration-300 group"
                    >
                        <Phone size={14} className="text-primary group-hover:text-black transition-colors duration-300 animate-pulse" />
                        <span className="font-raleway font-bold text-[12px] tracking-widest text-white group-hover:text-black transition-colors duration-300">+233 26 767 1110</span>
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden tap-target flex items-center justify-center text-white hover:text-primary transition-colors duration-300 flex-shrink-0"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Scroll progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.04]">
                <div
                    className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 transition-all duration-100 ease-linear"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 md:hidden overflow-hidden"
                    >
                        <div className="p-6 flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-white text-lg font-raleway font-bold tracking-widest hover:text-primary transition-colors duration-300 uppercase block"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
