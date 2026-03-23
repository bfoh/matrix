"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import ShareIcon from "@/components/ShareIcon";

interface Property {
    id: string;
    title: string;
    address: string;
    price: string;
    status: string;
    image: string;
    bedrooms: number;
    bathrooms: number;
    area_sqm: number;
}

export default function FeaturedProperties() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchProperties = async () => {
            const { data } = await supabase
                .from('properties')
                .select('*')
                .eq('published', true)
                .limit(3)
                .order('created_at', { ascending: false });

            if (data) {
                setProperties(data as any);
            }
            setLoading(false);
        };
        fetchProperties();
    }, []);

    if (loading) return null;
    if (properties.length === 0) return null;

    return (
        <section id="featured-properties" className="bg-[#050505] py-24 md:py-32 border-t border-white/5 relative overflow-hidden">
            {/* Subtle glow effect behind grid */}
            <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-primary/5 blur-[150px] rounded-[100%] pointer-events-none z-0" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header with Carousel Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 border-b border-white/10 pb-6 md:pb-8"
                >
                    <div>
                        <span className="text-primary font-bold tracking-[4px] text-[12px] uppercase font-raleway block mb-4">
                            Exclusive Listing
                        </span>
                        <h2 className="text-white text-[32px] md:text-[48px] font-bold font-montserrat tracking-[1px] uppercase leading-tight">
                            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-white/50">Properties</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-4 text-white text-[12px] font-bold font-raleway tracking-[2px] uppercase mt-8 md:mt-0">
                        <button className="hover:text-primary transition-colors flex items-center gap-2 group">
                            <span className="w-8 h-[1px] bg-white/30 group-hover:bg-primary transition-colors inline-block" />
                            PREV
                        </button>
                        <span className="text-white/20">|</span>
                        <button className="hover:text-primary transition-colors flex items-center gap-2 group">
                            NEXT
                            <span className="w-8 h-[1px] bg-white group-hover:bg-primary transition-colors inline-block" />
                        </button>
                    </div>
                </motion.div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {properties.map((property, index) => (
                        <Link href={`/properties/${property.id}`} key={property.id} className="block h-full">
                        <motion.div
                            className="group cursor-pointer flex flex-col h-full bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden relative backdrop-blur-sm"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Image Container */}
                            <div className="relative overflow-hidden aspect-[4/3] w-full bg-black">
                                <motion.img
                                    whileHover={{ scale: 1.08 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    src={property.image}
                                    alt={property.title}
                                    className="object-cover w-full h-full transform transition-transform duration-1000 ease-out"
                                />
                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                                {/* Badge */}
                                <div className="absolute top-4 right-4 bg-primary text-black text-[11px] font-bold font-raleway px-4 py-1.5 uppercase tracking-widest z-10 shadow-lg backdrop-blur-md">
                                    {property.status}
                                </div>

                                {/* Share Icon */}
                                <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    <ShareIcon
                                        title={property.title}
                                        price={property.price}
                                        address={property.address}
                                        propertyId={property.id}
                                    />
                                </div>

                                {/* Hover vignette */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 pointer-events-none" />
                            </div>

                            {/* Info Box */}
                            <div className="p-6 flex flex-col flex-grow relative z-10">
                                {/* Title + address */}
                                <h3 className="text-white text-[17px] font-bold font-montserrat tracking-wide uppercase mb-1 leading-tight line-clamp-1 group-hover:text-primary transition-colors duration-300">
                                    {property.title}
                                </h3>
                                <p className="text-gray-500 text-[11px] font-medium font-raleway tracking-widest uppercase mb-4 line-clamp-1">
                                    {property.address}
                                </p>

                                {/* Divider */}
                                <div className="w-10 h-[1px] bg-white/15 mb-4 group-hover:w-full group-hover:bg-primary/40 transition-all duration-700" />

                                {/* Stats */}
                                <p className="text-gray-400 text-[11px] font-bold font-raleway tracking-[0.18em] uppercase mb-5 flex items-center gap-3">
                                    <span>{property.bedrooms} BD</span>
                                    <span className="w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                                    <span>{property.bathrooms} BA</span>
                                    <span className="w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                                    <span>{property.area_sqm} SQM</span>
                                </p>

                                {/* Price + CTA row — always visible */}
                                <div className="mt-auto flex items-center justify-between gap-3">
                                    <span className="text-primary text-[17px] font-bold font-montserrat tracking-wide">
                                        {property.price}
                                    </span>
                                    <span className="bg-primary/10 border border-primary/30 group-hover:bg-primary group-hover:border-primary text-primary group-hover:text-black px-5 py-2 text-[10px] font-bold font-raleway tracking-[0.2em] uppercase transition-all duration-300 flex-shrink-0">
                                        View Property
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex justify-center mt-20"
                >
                    <Link href="/properties">
                        <button className="group relative border border-white/20 bg-transparent text-white px-14 py-4 text-[12px] font-bold font-raleway tracking-[4px] uppercase overflow-hidden transition-all duration-500 hover:border-accent">
                            <span className="relative z-10 group-hover:text-white transition-colors duration-500">View All Properties</span>
                            <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0" />
                        </button>
                    </Link>
                </motion.div>

            </div>
        </section >
    );
}
