"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function CountUp({ value, suffix = "" }: { value: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const duration = 1600;
        const steps = 50;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [inView, value]);

    return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
    { value: 12, suffix: "+", label: "Years of Excellence" },
    { value: 500, suffix: "+", label: "Clients Served" },
    { value: 100, suffix: "%", label: "On-Time Delivery" },
    { value: 4, suffix: ".9★", label: "Google Rating" },
];

export default function SocialProofBar() {
    return (
        <div className="bg-[#080808] border-b border-white/5 relative overflow-hidden">
            {/* Gold top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                            className="flex flex-col items-center justify-center py-5 px-4 gap-1 group"
                        >
                            <span className="text-primary font-montserrat font-bold text-[20px] md:text-[22px] tracking-tight leading-none group-hover:text-primary-light transition-colors duration-300">
                                <CountUp value={stat.value} suffix={stat.suffix} />
                            </span>
                            <span className="text-white/40 font-raleway text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-center">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
