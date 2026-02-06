"use client";

import { motion } from "framer-motion";
import { House, Key, BrickWall, ClipboardList } from "lucide-react";

export default function PremiumServices() {
    const services = [
        {
            id: 1,
            icon: <House strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />,
            title: "LAND & HOUSE SALES",
            description: "Prime real estate in Ghana's most sought-after locations. Secure your legacy with verified titles."
        },
        {
            id: 2,
            icon: <Key strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />,
            title: "APARTMENT RENTALS",
            description: "Luxury apartments for short and long-term stays. Experience comfort and convenience."
        },
        {
            id: 3,
            icon: <BrickWall strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />,
            title: "BUILDING CONSTRUCTION",
            description: "From blueprint to handover. We build with precision, speed, and high-quality materials."
        },
        {
            id: 4,
            icon: <ClipboardList strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />,
            title: "PROPERTY MANAGEMENT",
            description: "Protect your investment. We handle maintenance, tenants, and operations so you don't have to."
        }
    ];

    return (
        <section id="services" className="bg-[#111] text-white py-[85px]">
            <div className="container mx-auto px-6 flex flex-col items-center">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-[#D9DE00] text-[14px] font-bold font-raleway tracking-[2px] uppercase mb-2">
                        Our Expertise
                    </p>
                    <h2 className="text-white text-[32px] md:text-[45px] font-normal font-montserrat tracking-[1px] uppercase leading-tight mb-8">
                        Premium <span className="text-[#D9DE00]">Services</span>
                    </h2>
                    <div className="w-[60px] h-[3px] bg-[#D9DE00] mx-auto"></div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            className="group border border-gray-800 bg-[#151515] p-10 flex flex-col items-center text-center hover:border-[#D9DE00] transition-colors duration-300 min-h-[320px]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                            <div className="text-white mb-8 group-hover:text-[#D9DE00] transition-colors duration-300">
                                {service.icon}
                            </div>

                            <h3 className="text-[16px] md:text-[18px] font-bold font-montserrat tracking-[1px] uppercase mb-6 leading-tight group-hover:text-[#D9DE00] transition-colors duration-300">
                                {service.title}
                            </h3>

                            <p className="text-[14px] font-normal font-raleway tracking-[0.5px] leading-[24px] text-gray-400 group-hover:text-white transition-colors duration-300">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
