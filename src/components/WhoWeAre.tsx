"use client";

import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useRef, useEffect, useState } from "react";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [inView, target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

const metrics = [
    { target: 12, suffix: "+", label: "Years Experience" },
    { target: 500, suffix: "+", label: "Clients Served" },
    { target: 100, suffix: "%", label: "On-Time Delivery" },
    { target: 4, suffix: ".9★", label: "Google Rating" },
];

export default function WhoWeAre() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    return (
        <section id="about" className="bg-black py-24 md:py-32 relative overflow-hidden">
            {/* Background decorative glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <span className="text-primary font-bold tracking-[4px] text-[12px] uppercase font-raleway">
                        Who We Are
                    </span>
                    <h2 className="text-white text-[32px] md:text-[50px] font-montserrat font-bold mt-4 uppercase leading-tight tracking-tight">
                        Architectural <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white/70">Development</span> & <br className="hidden md:block" />
                        Consultation
                    </h2>
                    <div className="w-24 h-[2px] bg-accent mx-auto mt-8 opacity-70"></div>
                </motion.div>

                {/* Animated metrics strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 mb-20">
                    {metrics.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center justify-center py-10 px-6 gap-3 group relative bg-white/[0.01] hover:bg-white/[0.04] border border-white/[0.05] transition-all duration-500 overflow-hidden"
                        >
                            {/* Top gold accent — expands on hover */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                            {/* Ghost number watermark */}
                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-montserrat font-black text-[80px] text-white/[0.025] leading-none select-none pointer-events-none">
                                {m.target}
                            </span>

                            <span className="relative text-primary font-montserrat font-black text-[42px] md:text-[52px] tracking-tighter leading-none group-hover:text-primary-light transition-colors duration-300 drop-shadow-[0_0_20px_rgba(201,168,76,0.25)]">
                                <CountUp target={m.target} suffix={m.suffix} />
                            </span>
                            <span className="relative text-white/50 font-raleway text-[10px] tracking-[0.22em] uppercase text-center font-bold">
                                {m.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Column: Text Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="lg:w-1/2 space-y-10"
                    >
                        <motion.div variants={itemVariants} className="border-l-4 border-accent pl-8 relative">
                            {/* Decorative line extension */}
                            <div className="absolute -left-[4px] top-0 w-1 h-8 bg-accent opacity-80" />
                            <p className="text-white/95 text-[18px] md:text-[22px] font-raleway leading-[1.6] font-medium tracking-wide">
                                Matrix MultiTech Limited is a premier real estate and construction firm dedicated to transforming the Ghanaian landscape.
                            </p>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-gray-400 text-[15px] md:text-[16px] leading-[1.8] font-raleway tracking-wide pl-9">
                            We combine modern industrial aesthetics with functional luxury to create spaces that stand the test of time. Whether it's residential development, commercial construction, or property management, our commitment to quality is unwavering.
                        </motion.p>

                        <motion.div variants={itemVariants} className="space-y-6 pt-4 pl-9">
                            {[
                                "Modern Architectural Design",
                                "End-to-End Construction",
                                "Premium Property Management"
                            ].map((text, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    className="flex items-center gap-5 group cursor-default"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <CheckCircle2 className="text-primary relative z-10" size={22} strokeWidth={2.5} />
                                    </div>
                                    <span className="text-white/80 group-hover:text-white font-bold font-raleway text-[14px] uppercase tracking-[0.15em] transition-colors duration-300">
                                        {text}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:w-1/2 relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5]"
                    >
                        {/* Decorative background elements */}
                        <div className="absolute -inset-4 bg-primary/10 rounded-lg -z-10 blur-2xl transform rotate-3" />
                        <div className="absolute -inset- border border-white/5 rounded-none z-20 m-6 pointer-events-none" />

                        <div className="relative w-full h-full overflow-hidden group">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                src="/images/prop-1.png"
                                alt="Modern Architectural Design"
                                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                            />
                            {/* Overlay gradients for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
