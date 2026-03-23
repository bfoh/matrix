"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function WorkWithUs() {
    return (
        <section className="relative w-full py-32 md:py-48 flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
            {/* Background Image Container */}
            <motion.div
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                {/* Replace /images/ghana-work-bg.jpg with your Ghanaian photo (upload to public/images/) */}
                <img
                    src="/images/ghana-work-bg-updated.png"
                    alt="Work With Us"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/work-bg.png"; }}
                />
                {/* Cinematic overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 z-10 pointer-events-none" />
                {/* Warm gold tint to reinforce brand */}
                <div className="absolute inset-0 bg-primary/5 z-10 pointer-events-none mix-blend-multiply" />
            </motion.div>

            {/* Glowing Element */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none z-[15]" />

            {/* Content Container */}
            <div className="relative z-20 container mx-auto px-6 flex flex-col items-center md:items-start text-center md:text-left text-white max-w-6xl">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="text-primary font-bold tracking-[4px] text-[12px] uppercase font-raleway block mb-6 px-1">
                        Start A Project
                    </span>
                    <h2 className="text-[48px] md:text-[64px] font-montserrat font-bold tracking-tight mb-8 uppercase leading-[1.05]">
                        Work With <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#feffb3] to-white/70">The Best</span>
                    </h2>

                    {/* Divider */}
                    <div className="w-24 h-[2px] bg-accent mb-10 opacity-80 mx-auto md:mx-0"></div>

                    <p className="max-w-xl text-[16px] md:text-[18px] leading-[1.8] font-raleway font-medium tracking-wide mb-14 text-white/80 pr-0 md:pr-10">
                        With extensive experience and top-notch networking skills, Matrix MultiTech Ltd consistently ranks among the top of the industry. Our commitment to client confidentiality and staying ahead of cutting edge techniques is what keeps us out-performing the rest.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link href="#contact-us">
                            <button className="group relative bg-primary text-black px-12 py-5 font-montserrat font-bold text-[13px] uppercase tracking-[3px] overflow-hidden transition-all duration-500 hover:shadow-[0_0_25px_rgba(217,222,0,0.5)] w-full sm:w-auto">
                                <span className="relative z-10">CONTACT US</span>
                                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0" />
                            </button>
                        </Link>
                        <Link href="#services">
                            <button className="group relative border border-white/30 text-white px-12 py-5 font-montserrat font-bold text-[13px] uppercase tracking-[3px] overflow-hidden transition-all duration-500 w-full sm:w-auto hover:border-accent">
                                <span className="relative z-10 group-hover:text-white transition-colors duration-500 delay-100">OUR SERVICES</span>
                                <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right z-0" />
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
