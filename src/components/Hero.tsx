"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BookingModal from "./BookingModal";
import { useState } from "react";

export default function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.18, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 35 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/60 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 z-10 pointer-events-none" />

            {/* Floating ambient orbs */}
            <motion.div
                animate={{ y: [0, -18, 0], opacity: [0.35, 0.55, 0.35] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[18%] left-[8%] w-72 h-72 bg-primary/8 rounded-full blur-[90px] pointer-events-none z-10"
            />
            <motion.div
                animate={{ y: [0, 14, 0], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-[28%] right-[10%] w-56 h-56 bg-white/5 rounded-full blur-[80px] pointer-events-none z-10"
            />
            <motion.div
                animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute top-[45%] right-[25%] w-36 h-36 bg-primary/6 rounded-full blur-[60px] pointer-events-none z-10"
            />

            {/* Subtle architectural grid */}
            <div
                className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: "linear-gradient(rgba(201,168,76,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.6) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                    maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)"
                }}
            />

            {/* Video background */}
            <motion.div
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
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
            ></video>
          `,
                }}
            />

            {/* Hero content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-20 text-center px-4 max-w-5xl mx-auto"
            >
                {/* Eyebrow label */}
                <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-6">
                    <span className="w-8 h-[1px] bg-primary/70 inline-block" />
                    <span className="text-primary font-raleway font-bold text-[11px] tracking-[0.3em] uppercase">
                        Ghana&apos;s Premier Real Estate Firm
                    </span>
                    <span className="w-8 h-[1px] bg-primary/70 inline-block" />
                </motion.div>

                {/* Main headline */}
                <motion.div variants={itemVariants} className="mb-5">
                    <h1 className="text-white text-[46px] md:text-[78px] lg:text-[92px] font-bold tracking-tight font-montserrat uppercase leading-[0.92]">
                        LUXURY LIVING
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-white/70">
                            REDEFINED.
                        </span>
                    </h1>
                </motion.div>

                {/* Subheading */}
                <motion.div variants={itemVariants}>
                    <p className="text-white/60 text-[13px] md:text-[15px] font-raleway tracking-[0.18em] mb-12 max-w-xl mx-auto uppercase">
                        Bespoke properties in Accra&apos;s most coveted addresses
                    </p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    {/* Primary CTA */}
                    <Link href="#featured-properties">
                        <button className="group relative bg-primary text-black px-12 py-4 font-montserrat font-bold text-[12px] uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_32px_rgba(201,168,76,0.45)] min-w-[220px]">
                            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                                Explore Properties
                            </span>
                            <div className="absolute inset-0 bg-primary-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0" />
                        </button>
                    </Link>

                    {/* Secondary CTA — ghost */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group relative border border-white/30 text-white/90 px-12 py-4 font-montserrat font-bold text-[12px] uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 hover:border-primary/60 min-w-[220px]"
                    >
                        <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                            Book a Consultation
                        </span>
                        <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right z-0" />
                    </button>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-3"
            >
                <span className="text-white/40 text-[9px] font-raleway tracking-[0.35em] uppercase">Scroll</span>
                <div className="w-[1px] h-[52px] bg-white/15 relative overflow-hidden">
                    <motion.div
                        animate={{ y: [0, 52] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                        className="w-full h-1/2 bg-primary absolute top-0"
                    />
                </div>
            </motion.div>

            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
