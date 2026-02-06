"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BioSection() {
    return (
        <section className="bg-zinc-900 py-24 md:py-32">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

                    {/* Image Side */}
                    <motion.div
                        className="w-full md:w-1/2 relative aspect-[3/4] md:aspect-square max-w-lg"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Using a placeholder that represents a professional portrait */}
                        <div className="absolute inset-0 bg-gray-800 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                                alt="Tamara Strait"
                                className="object-cover w-full h-full opacity-80 hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        {/* Decorative Border */}
                        <div className="absolute top-4 -left-4 w-full h-full border-2 border-primary/30 -z-10 hidden md:block" />
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        className="w-full md:w-1/2 text-center md:text-left"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-primary text-sm font-bold tracking-[0.2em] mb-4 uppercase">
                            Meet Your Agent
                        </h3>
                        <h2 className="text-white text-3xl md:text-5xl font-bold font-montserrat mb-8 leading-tight">
                            STRAIT <br /> <span className="text-gray-400">EXPERIENCE</span>
                        </h2>
                        <div className="w-20 h-1 bg-primary mb-8 mx-auto md:mx-0" />

                        <p className="text-gray-300 font-raleway leading-relaxed mb-6 text-lg">
                            Tamara Strait provides a level of service that is unmatched in the luxury real estate market.
                            With years of experience and a deep understanding of the Texas Hill Country, she brings
                            expertise, integrity, and passion to every transaction.
                        </p>
                        <p className="text-gray-400 font-raleway leading-relaxed mb-10">
                            Whether you are buying your dream home or selling a prized property, let us guide you
                            through the process with the sophistication and attention to detail you deserve.
                        </p>

                        <button className="bg-transparent border border-white text-white px-8 py-3 text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-colors uppercase">
                            Read Full Bio
                        </button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
