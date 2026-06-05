"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";
import type { ServiceData } from "@/data/services";
import { servicesData } from "@/data/services";

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
    }),
};

export default function ServicePageClient({ service }: { service: ServiceData }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Related services (other 3)
    const related = servicesData.filter((s) => s.slug !== service.slug).slice(0, 3);

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            {/* ── Hero ── */}
            <section className="relative pt-40 pb-28 md:pt-52 md:pb-36 overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/6 blur-[140px] rounded-full pointer-events-none" />
                {/* Architectural grid */}
                <div
                    className="absolute inset-0 opacity-[0.035] pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)",
                        backgroundSize: "72px 72px",
                        maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)",
                    }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    {/* Back link */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        className="mb-10"
                    >
                        <Link
                            href="/#services"
                            className="inline-flex items-center gap-2.5 text-white/40 hover:text-primary transition-colors duration-300 text-[11px] font-raleway font-bold tracking-[0.25em] uppercase group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
                            All Services
                        </Link>
                    </motion.div>

                    {/* Service number */}
                    <motion.span
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        className="text-primary font-bold tracking-[4px] text-[12px] uppercase font-raleway block mb-5"
                    >
                        {String(service.id).padStart(2, "0")} / 05 — {service.title}
                    </motion.span>

                    {/* Title */}
                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        className="text-[38px] md:text-[68px] lg:text-[80px] font-montserrat font-black uppercase leading-[0.92] tracking-tight mb-8 max-w-4xl"
                    >
                        {service.tagline.split(" ").slice(0, -3).join(" ")}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-white/60">
                            {service.tagline.split(" ").slice(-3).join(" ")}
                        </span>
                    </motion.h1>

                    {/* Divider */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={3}
                        className="w-20 h-[2px] bg-accent mb-10"
                    />

                    {/* Hero description */}
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={4}
                        className="text-white/65 text-[16px] md:text-[19px] font-raleway leading-[1.8] max-w-2xl mb-14"
                    >
                        {service.heroDescription}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={5}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group relative bg-primary text-black px-10 py-4 font-montserrat font-bold text-[12px] uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_28px_rgba(201,168,76,0.45)] w-full sm:w-auto"
                        >
                            <span className="relative z-10">{service.cta}</span>
                            <div className="absolute inset-0 bg-primary-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0" />
                        </button>
                        <a
                            href="tel:+233267671110"
                            className="group relative border border-white/20 text-white px-10 py-4 font-montserrat font-bold text-[12px] uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 hover:border-primary/50 w-full sm:w-auto text-center"
                        >
                            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                                Call: +233 26 767 1110
                            </span>
                            <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right z-0" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ── Stat highlight bar ── */}
            <div className="bg-[#080808] border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <span className="text-primary font-montserrat font-black text-[48px] md:text-[56px] leading-none tracking-tighter">
                            {service.highlight.stat}
                        </span>
                        <span className="text-white/50 font-raleway text-[12px] tracking-[0.2em] uppercase max-w-[200px]">
                            {service.highlight.label}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-end">
                        {service.keyPoints.slice(0, 3).map((kp, i) => (
                            <span
                                key={i}
                                className="flex items-center gap-2 text-[11px] font-raleway font-bold text-white/50 tracking-wide uppercase border border-white/8 px-3 py-1.5"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                {kp}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Overview ── */}
            <section className="py-24 md:py-32 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/4 blur-[120px] rounded-full pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                        {/* Left: overview copy */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:w-1/2"
                        >
                            <span className="text-primary font-bold tracking-[4px] text-[12px] uppercase font-raleway block mb-6">
                                Overview
                            </span>
                            <div className="border-l-4 border-accent pl-8 mb-8">
                                <p className="text-white/90 text-[17px] md:text-[20px] font-raleway leading-[1.65] font-medium">
                                    {service.overview.split(".")[0] + "."}
                                </p>
                            </div>
                            <p className="text-gray-400 text-[15px] md:text-[16px] leading-[1.85] font-raleway pl-9">
                                {service.overview.split(".").slice(1).join(".").trim()}
                            </p>
                        </motion.div>

                        {/* Right: key points */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                            className="lg:w-1/2 space-y-4 lg:pt-14"
                        >
                            <p className="text-primary font-bold tracking-[4px] text-[12px] uppercase font-raleway mb-8">
                                What&apos;s Included
                            </p>
                            {service.keyPoints.map((kp, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex items-center gap-4 group cursor-default"
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <CheckCircle2 className="text-primary relative z-10" size={20} strokeWidth={2.5} />
                                    </div>
                                    <span className="text-white/75 group-hover:text-white font-raleway font-bold text-[13px] uppercase tracking-[0.14em] transition-colors duration-300">
                                        {kp}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Features / Areas ── */}
            <section className="py-20 bg-[#040404] border-t border-white/5">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8 }}
                        className="mb-16 text-center"
                    >
                        <span className="text-primary font-bold tracking-[4px] text-[12px] uppercase font-raleway block mb-4">
                            Key Areas & Specialisations
                        </span>
                        <h2 className="text-[28px] md:text-[44px] font-montserrat font-bold uppercase tracking-tight text-white">
                            Where We <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white/60">Deliver</span>
                        </h2>
                        <div className="w-16 h-[2px] bg-accent mx-auto mt-6" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {service.features.map((feat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative bg-white/[0.02] border border-white/6 hover:border-primary/25 p-8 overflow-hidden transition-all duration-500"
                            >
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <span className="absolute top-5 right-6 font-montserrat font-black text-[52px] text-white/[0.03] leading-none pointer-events-none">
                                    {String(i + 1).padStart(2, "0")}
                                </span>

                                <h3 className="relative z-10 text-white font-montserrat font-bold text-[16px] md:text-[18px] tracking-wide uppercase mb-4 group-hover:text-primary transition-colors duration-300">
                                    {feat.title}
                                </h3>
                                <p className="relative z-10 text-gray-400 font-raleway text-[14px] leading-[1.8] group-hover:text-white/80 transition-colors duration-300">
                                    {feat.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Process ── */}
            <section className="py-24 md:py-32 relative overflow-hidden">
                <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-accent/4 blur-[130px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8 }}
                        className="mb-16"
                    >
                        <span className="text-primary font-bold tracking-[4px] text-[12px] uppercase font-raleway block mb-4">
                            Our Process
                        </span>
                        <h2 className="text-[28px] md:text-[44px] font-montserrat font-bold uppercase tracking-tight text-white max-w-xl">
                            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white/60">Works</span>
                        </h2>
                        <div className="w-16 h-[2px] bg-accent mt-6" />
                    </motion.div>

                    <div className="space-y-0 max-w-4xl">
                        {service.process.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="group flex gap-8 py-8 border-b border-white/[0.05] hover:border-primary/20 transition-colors duration-300 relative"
                            >
                                {/* Step number */}
                                <div className="flex-shrink-0 w-14 flex flex-col items-center">
                                    <span className="text-primary font-montserrat font-black text-[13px] tracking-[2px]">
                                        {step.step}
                                    </span>
                                    {i < service.process.length - 1 && (
                                        <div className="w-[1px] flex-1 bg-white/8 mt-3 group-hover:bg-primary/20 transition-colors duration-300" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 pb-2">
                                    <h3 className="text-white font-montserrat font-bold text-[17px] md:text-[20px] tracking-wide uppercase mb-3 group-hover:text-primary transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400 font-raleway text-[14px] md:text-[15px] leading-[1.85] group-hover:text-white/75 transition-colors duration-300">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section className="py-20 bg-[#050505] border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row items-center justify-between gap-10"
                    >
                        <div>
                            <h3 className="text-[26px] md:text-[38px] font-montserrat font-bold uppercase tracking-tight text-white mb-3">
                                Ready to Get Started?
                            </h3>
                            <p className="text-white/50 font-raleway text-[15px] max-w-lg">
                                Speak with our Ghana-based specialists today. No obligation — just expert advice tailored to your goals.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="group relative bg-primary text-black px-10 py-4 font-montserrat font-bold text-[12px] uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_28px_rgba(201,168,76,0.45)]"
                            >
                                <span className="relative z-10">{service.cta}</span>
                                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0" />
                            </button>
                            <a
                                href="https://wa.me/233267671110"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative border border-white/25 text-white px-10 py-4 font-montserrat font-bold text-[12px] uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 hover:border-primary/50 text-center"
                            >
                                <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                                    WhatsApp Us
                                </span>
                                <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right z-0" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Other Services ── */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mb-12"
                    >
                        <span className="text-primary font-bold tracking-[4px] text-[12px] uppercase font-raleway block mb-3">
                            Explore More
                        </span>
                        <h3 className="text-[22px] md:text-[32px] font-montserrat font-bold uppercase tracking-tight">
                            Other Services
                        </h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {related.map((rel, i) => (
                            <motion.div
                                key={rel.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <Link
                                    href={`/services/${rel.slug}`}
                                    className="group block bg-white/[0.02] border border-white/6 hover:border-primary/25 p-8 transition-all duration-400 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                                    <span className="text-primary/50 font-montserrat font-black text-[11px] tracking-[3px] uppercase block mb-3">
                                        {String(rel.id).padStart(2, "0")}
                                    </span>
                                    <h4 className="text-white font-montserrat font-bold text-[15px] uppercase tracking-wide group-hover:text-primary transition-colors duration-300 mb-3">
                                        {rel.title}
                                    </h4>
                                    <p className="text-gray-500 font-raleway text-[13px] leading-relaxed line-clamp-2 group-hover:text-white/60 transition-colors duration-300">
                                        {rel.heroDescription.split(".")[0]}.
                                    </p>
                                    <div className="flex items-center gap-2 mt-5 text-primary/50 group-hover:text-primary transition-colors duration-300 text-[11px] font-bold font-raleway tracking-[2px] uppercase">
                                        Learn More
                                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
