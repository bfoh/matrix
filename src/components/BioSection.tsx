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
                                src="/images/ghanaian-ceo.png"
                                alt="Kwabena Boateng - Managing Director"
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
                            Meet Our Leadership
                        </h3>
                        <h2 className="text-white text-3xl md:text-5xl font-bold font-montserrat mb-8 leading-tight">
                            EXECUTIVE <br /> <span className="text-gray-400">EXPERTISE</span>
                        </h2>
                        <div className="w-20 h-1 bg-accent mb-8 mx-auto md:mx-0" />

                        <p className="text-gray-300 font-raleway leading-relaxed mb-6 text-lg">
                            Matrix MultiTech Ltd provides a level of service that is unmatched in the Ghanaian luxury real estate and construction market.
                            With decades of combined experience and a deep understanding of Accra's prime neighborhoods, our leadership team brings
                            unmatched expertise, integrity, and passion to every development and transaction.
                        </p>
                        <p className="text-gray-400 font-raleway leading-relaxed mb-10">
                            Whether you are securing premium land in East Legon or building a commercial plaza in Kumasi, let us guide you
                            through the process with the sophistication and attention to detail your investment deserves.
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
