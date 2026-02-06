"use client";

import { Search, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchSticky() {
    return (
        <motion.div
            className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 border-t border-white/10 backdrop-blur-sm py-4 px-6"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
        >
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
                {/* Search Input */}
                <div className="relative w-full max-w-2xl">
                    <input
                        type="text"
                        placeholder="Search by Address or Area..."
                        className="w-full bg-white/10 text-white border border-white/20 px-4 py-3 pl-12 focus:outline-none focus:border-primary transition-colors text-sm font-raleway tracking-wide placeholder:text-gray-400"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>

                {/* Book Appointment CTA */}
                <button className="w-full md:w-auto bg-primary text-black px-6 py-3 text-sm font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors uppercase">
                    <Calendar size={16} />
                    <span>Book Appointment</span>
                </button>
            </div>
        </motion.div>
    );
}
