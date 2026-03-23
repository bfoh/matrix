"use client";

import { motion } from "framer-motion";
import { House, Key, BrickWall, ClipboardList, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PremiumServices() {
    const services = [
        {
            id: 1,
            slug: "land-house-sales",
            icon: <House strokeWidth={1.5} className="w-10 h-10 md:w-12 md:h-12" />,
            title: "LAND & HOUSE SALES",
            description: "Prime real estate in Ghana's most sought-after locations. Secure your legacy with verified titles and unmatched value."
        },
        {
            id: 2,
            slug: "apartment-rentals",
            icon: <Key strokeWidth={1.5} className="w-10 h-10 md:w-12 md:h-12" />,
            title: "APARTMENT RENTALS",
            description: "Luxury apartments for short and long-term stays. Experience premium comfort, modern aesthetics, and ultimate convenience."
        },
        {
            id: 3,
            slug: "building-construction",
            icon: <BrickWall strokeWidth={1.5} className="w-10 h-10 md:w-12 md:h-12" />,
            title: "BUILDING CONSTRUCTION",
            description: "From blueprint to handover. We build with engineering precision, speed, and industry-leading high-quality materials."
        },
        {
            id: 4,
            slug: "property-management",
            icon: <ClipboardList strokeWidth={1.5} className="w-10 h-10 md:w-12 md:h-12" />,
            title: "PROPERTY MANAGEMENT",
            description: "Protect your investment effortlessly. We handle maintenance, tenant relations, and all operations so you don't have to."
        }
    ];

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
        <section id="services" className="bg-[#030303] text-white py-24 md:py-32 relative overflow-hidden text-center">
            {/* Soft backdrop glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10 translate-x-1/2 -translate-y-1/2" />

            <div className="container mx-auto px-6 flex flex-col items-center">
                {/* Header Phase */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <p className="text-primary text-[12px] font-bold font-raleway tracking-[4px] uppercase mb-4">
                        Our Expertise
                    </p>
                    <h2 className="text-white text-[32px] md:text-[50px] font-bold font-montserrat tracking-tight uppercase leading-tight mb-8">
                        Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white/70">Services</span>
                    </h2>
                    <div className="w-[80px] h-[2px] bg-accent mx-auto"></div>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={itemVariants}
                            whileHover={{ y: -10, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                        >
                            <Link 
                                href={`/services/${service.slug}`}
                                className="group block h-full relative bg-[#0A0A0A] border border-white/5 hover:border-primary/20 p-10 flex flex-col items-center text-center overflow-hidden transition-all duration-500 min-h-[360px] md:min-h-[400px]"
                            >
                                {/* Inner hover glow */}
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                {/* Animated top border */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-600 pointer-events-none" />

                                {/* Ghost number */}
                                <span className="absolute top-4 right-5 font-montserrat font-black text-[64px] text-white/[0.04] leading-none select-none pointer-events-none group-hover:text-primary/8 transition-colors duration-500">
                                    {String(service.id).padStart(2, "0")}
                                </span>

                                <div className="relative z-10 text-white/40 mb-8 group-hover:text-primary transition-all duration-500 group-hover:scale-110 transform group-hover:drop-shadow-[0_0_14px_rgba(201,168,76,0.5)] flex flex-col items-center">
                                    {service.icon}
                                </div>

                                <h3 className="relative z-10 text-[16px] md:text-[18px] font-bold font-montserrat tracking-[1.5px] uppercase mb-6 leading-tight group-hover:text-white transition-colors duration-300">
                                    {service.title}
                                </h3>

                                <p className="relative z-10 text-[14px] font-medium font-raleway tracking-wide leading-[1.8] text-gray-400 group-hover:text-white/80 transition-colors duration-300">
                                    {service.description}
                                </p>

                                {/* Discover More */}
                                <div className="relative z-10 mt-auto pt-8 flex items-center justify-center gap-2">
                                    <span className="text-[11px] font-raleway font-bold text-white/40 group-hover:text-primary uppercase tracking-[2px] transition-colors duration-500">
                                        Discover More
                                    </span>
                                    <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-primary transform group-hover:translate-x-1 transition-all duration-500" strokeWidth={2.5} />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
