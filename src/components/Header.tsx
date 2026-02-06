"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "ABOUT", href: "#about" },
        { name: "PROPERTIES", href: "#featured-properties" },
        { name: "SERVICES", href: "#services" },
        { name: "CONTACT", href: "#contact-us" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                isScrolled ? "bg-black/90 py-4 shadow-md" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
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
                    <div className="relative h-16 w-16 md:h-20 md:w-20 flex-shrink-0 overflow-hidden">
                        <img
                            src="/images/matrix-logo.png"
                            alt="Matrix MultiTech Ltd"
                            className="h-full w-full object-cover object-top scale-125 translate-y-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-white font-montserrat font-bold text-[16px] md:text-[20px] tracking-wide leading-none whitespace-nowrap">
                            MATRIX <span className="text-primary">MULTITECH LTD</span>
                        </h1>
                        <p className="text-gray-400 font-raleway text-[9px] md:text-[10px] tracking-[0.2em] leading-tight md:ml-[1px]">
                            DESIGN | RESIDENTIAL | LAND
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-white text-[13px] font-bold tracking-[1.5px] font-raleway hover:text-primary transition-colors duration-200 uppercase"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <a
                        href="tel:+233267671110"
                        className="flex items-center gap-3 px-6 py-2 border border-white/30 rounded-full hover:bg-white/10 transition-colors ml-4"
                    >
                        <Phone size={18} className="text-[#FF4A4A]" />
                        <span className="text-white font-raleway font-bold text-[14px] tracking-wider">+233 26 767 1110</span>
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-black/95 p-6 md:hidden flex flex-col gap-4 shadow-xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-white text-lg font-medium hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
