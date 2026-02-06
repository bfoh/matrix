"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BookingModal from "./BookingModal";
import { useState } from "react";



export default function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background - using a placeholder color for now, ideally video */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            <div
                className="absolute inset-0 w-full h-full z-0"
                dangerouslySetInnerHTML={{
                    __html: `
            <video
              class="absolute inset-0 w-full h-full object-cover"
              src="/hero.mp4"
              autoplay
              loop
              muted
              playsinline
            >
            </video>
          `,
                }}
            />

            <div className="relative z-20 text-center px-4 max-w-6xl mx-auto mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-white text-[45px] md:text-[80px] font-bold tracking-tight mb-6 font-montserrat uppercase leading-[0.9]">
                        BUILDING THE <br />
                        <span className="text-primary">FUTURE OF GHANA</span>
                    </h1>
                    <p className="text-gray-300 text-[14px] md:text-[18px] font-normal tracking-wide mb-10 max-w-3xl mx-auto font-raleway">
                        Precision Engineering. Architectural Excellence. Premium Real Estate.
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <Link href="#featured-properties">
                        <button className="bg-primary text-black px-8 py-3 font-montserrat font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors">
                            Explore Properties
                        </button>
                    </Link>
                    <Link href="#contact-us">
                        <button className="border border-white text-white px-8 py-3 font-montserrat font-bold text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-colors">
                            Contact Us
                        </button>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll indicator */}

            {/* Search Bar & Appointment CTA */}
            <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/80 border-t border-white/10 backdrop-blur-sm py-4 px-6">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
                    {/* Search Input */}
                    <div className="relative w-full max-w-2xl">
                        <input
                            type="text"
                            placeholder="Search by Address or Area..."
                            className="w-full bg-white/10 text-white border border-white/20 px-4 py-3 pl-12 focus:outline-none focus:border-primary transition-colors text-sm font-raleway tracking-wide placeholder:text-gray-400"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    window.location.href = `/properties?search=${(e.target as HTMLInputElement).value}`;
                                }
                            }}
                        />
                        {/* Search Icon (SVG) */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>

                    {/* Book Appointment CTA */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full md:w-auto bg-primary text-black px-6 py-3 text-sm font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors uppercase"
                    >
                        {/* Calendar Icon (SVG) */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>Book Appointment</span>
                    </button>
                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </section>
    );
}
