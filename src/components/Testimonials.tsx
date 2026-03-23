"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const testimonials = [
    {
        text: "After much evaluation and comparison of the real estate brokerages in the area we decided to go with Matrix MultiTech Ltd. It turned out to be a great choice. The team worked hard to keep us informed about market values, suggested a realistic asking price, and kept us updated through every step. I would definitely recommend and use Matrix MultiTech Ltd again.",
        name: "Bubba Riggs",
        role: "Property Seller",
        initials: "BR",
        rating: 5,
    },
    {
        text: "Matrix MultiTech delivered beyond our expectations. From the initial consultation to handing over the keys, the entire process was seamless. Their architectural team understood our vision perfectly and the construction quality is simply outstanding. Our family home is everything we dreamed of.",
        name: "Abena Mensah",
        role: "Homeowner, East Legon",
        initials: "AM",
        rating: 5,
    },
    {
        text: "As an investor, I needed a firm I could trust to manage my portfolio in Accra. Matrix MultiTech has consistently delivered strong returns and kept my properties in excellent condition. Their property management team is professional, responsive, and truly exceptional.",
        name: "Kwame Asante",
        role: "Property Investor",
        initials: "KA",
        rating: 5,
    },
];

function StarRating({ count }: { count: number }) {
    return (
        <div className="flex items-center gap-1 mb-6">
            {Array.from({ length: count }).map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C9A84C" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
            <span className="text-primary/70 text-[11px] font-raleway font-bold tracking-widest ml-2 uppercase">
                Verified Review
            </span>
        </div>
    );
}

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const go = (dir: 1 | -1) => {
        setDirection(dir);
        setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
    };

    const t = testimonials[current];

    return (
        <section className="relative w-full py-24 md:py-32 overflow-hidden bg-black flex items-center min-h-[620px]">
            {/* Background texture */}
            <div className="absolute inset-0 z-0 opacity-35 mix-blend-luminosity">
                <img src="/images/marble-bg.png" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-0 opacity-80" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row h-full">

                    {/* Left: Title & Nav */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:w-1/3 mb-16 lg:mb-0 flex flex-col justify-center"
                    >
                        <span className="text-primary font-bold tracking-[4px] text-[12px] uppercase font-raleway mb-4 block">
                            Client Experiences
                        </span>
                        <h2 className="text-white text-[40px] md:text-[52px] font-montserrat font-bold tracking-tight mb-6 uppercase leading-[1.05]">
                            Words Of <br />
                            <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                                Trust.
                            </em>
                        </h2>

                        {/* Testimonial counter */}
                        <p className="text-white/30 font-raleway text-[12px] tracking-[3px] uppercase mb-10">
                            <span className="text-primary font-bold">{String(current + 1).padStart(2, "0")}</span>
                            &nbsp;/&nbsp;{String(testimonials.length).padStart(2, "0")}
                        </p>

                        {/* Navigation */}
                        <div className="flex items-center gap-6 text-white/50 text-[12px] font-bold font-raleway tracking-[3px] uppercase">
                            <button
                                onClick={() => go(-1)}
                                className="hover:text-primary transition-colors flex items-center gap-3 group"
                                aria-label="Previous testimonial"
                            >
                                <span className="w-8 h-[1px] bg-white/30 group-hover:bg-primary transition-colors block" />
                                PREV
                            </button>
                            <span className="text-white/20">|</span>
                            <button
                                onClick={() => go(1)}
                                className="hover:text-primary transition-colors flex items-center gap-3 group"
                                aria-label="Next testimonial"
                            >
                                NEXT
                                <span className="w-8 h-[1px] bg-white/30 group-hover:bg-primary transition-colors block" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right: Testimonial content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:w-2/3 lg:pl-24 relative flex items-center"
                    >
                        {/* Decorative quote mark */}
                        <div className="absolute top-[-60px] md:top-[-100px] left-8 lg:left-20 text-[180px] md:text-[280px] font-serif font-black text-white/[0.025] leading-none pointer-events-none select-none">
                            &ldquo;
                        </div>

                        <div className="max-w-3xl relative z-10 pl-6 border-l border-primary/30 w-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, x: direction * 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: direction * -20 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {/* Star rating */}
                                    <StarRating count={t.rating} />

                                    {/* Testimonial text */}
                                    <p className="text-white/85 text-[15px] md:text-[18px] leading-[1.85] font-raleway font-medium tracking-wide mb-10">
                                        &ldquo;{t.text}&rdquo;
                                    </p>

                                    {/* Client info */}
                                    <div className="flex items-center justify-between border-t border-white/10 pt-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                                <span className="text-primary font-montserrat font-bold text-[14px]">
                                                    {t.initials}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-white text-[13px] font-bold font-raleway tracking-[2px] uppercase">
                                                    {t.name}
                                                </p>
                                                <p className="text-primary/70 text-[11px] font-semibold font-raleway tracking-widest uppercase mt-1">
                                                    {t.role}
                                                </p>
                                            </div>
                                        </div>

                                        <button className="hidden sm:flex border border-white/20 hover:border-primary text-white/70 hover:text-primary px-8 py-3 text-[11px] font-bold font-raleway tracking-[3px] uppercase transition-all duration-300 items-center justify-center">
                                            VIEW ALL
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
