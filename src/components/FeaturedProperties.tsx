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
    details: string; // Currently my DB doesn't have 'details' column in previous scripts I think? 
    // Wait, I created: bedrooms int, bathrooms numeric, area_sqm int. 
    // I should construct the 'details' string from these.
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
                setProperties(data as any); // Type casting for simplicity in this artifact
            }
            setLoading(false);
        };
        fetchProperties();
    }, []);

    if (loading) return null; // Or a skeleton loader
    if (properties.length === 0) return null; // Hide section if no properties? Or show static?

    return (
        <section id="featured-properties" className="bg-[#f9f9f9] py-[85px]">
            <div className="container mx-auto px-6">

                {/* Section Header with Carousel Controls */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-4 md:border-none md:pb-0">
                    <h2 className="text-black text-[32px] md:text-[43px] font-normal font-montserrat tracking-[1px] uppercase leading-tight">
                        Featured Properties
                    </h2>

                    <div className="flex items-center gap-1 text-black text-[14px] font-bold font-raleway tracking-[1px] uppercase mt-4 md:mt-0">
                        <button className="hover:text-gray-600 transition-colors">PREVIOUS</button>
                        <span className="mx-1">|</span>
                        <button className="hover:text-gray-600 transition-colors relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-[#555] after:mt-1">
                            NEXT
                        </button>
                    </div>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                    {properties.map((property, index) => (
                        <motion.div
                            key={property.id}
                            className="group cursor-pointer flex flex-col h-full"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                            {/* Image Container */}
                            <div className="relative overflow-hidden aspect-[4/3] w-full bg-gray-200">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                />
                                {/* Badge */}
                                <div className="absolute top-0 right-0 bg-[#D9DE00] text-black text-[14px] font-bold font-raleway px-[35px] py-[4px] uppercase tracking-wide z-10">
                                    {property.status}
                                </div>

                                {/* Share Icon */}
                                <div className="absolute bottom-3 right-3 z-30">
                                    <ShareIcon
                                        title={property.title}
                                        price={property.price}
                                        address={property.address}
                                        propertyId={property.id}
                                    />
                                </div>

                                {/* Hover Overlay with VIEW PROPERTY Button */}
                                <div className="absolute inset-0 bg-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                    <Link href={`/properties/${property.id}`}>
                                        <button className="w-[250px] h-[58px] border-2 border-black bg-transparent text-black text-[14px] font-raleway font-bold tracking-widest uppercase transition-colors duration-200 hover:bg-black hover:text-[#D9DE00]">
                                            View Property
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Dark Info Box */}
                            <div className="bg-black text-white p-[25px_15px_15px] flex flex-col items-center text-center flex-grow">
                                <h3 className="text-[21px] font-normal font-montserrat tracking-[1px] uppercase mb-[7px] leading-[31.5px]">
                                    {property.title}
                                </h3>

                                <p className="text-[16px] font-normal font-raleway tracking-[1px] uppercase leading-[25.6px] mb-1">
                                    {property.address}
                                </p>

                                <p className="text-[16px] font-normal font-raleway tracking-[1px] uppercase leading-[25.6px] mb-4 text-gray-300">
                                    {property.bedrooms} BD | {property.bathrooms} BA | {property.area_sqm} SQ M
                                </p>

                                <div className="mt-auto">
                                    <span className="text-[16px] font-normal font-raleway tracking-[1px] leading-[25.6px]">
                                        {property.price}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center mt-16">
                    <Link href="/properties">
                        <button className="border-2 border-black text-black px-12 py-4 text-[13px] font-bold font-raleway tracking-[3px] uppercase hover:bg-black hover:text-[#D9DE00] transition-colors duration-300">
                            View All
                        </button>
                    </Link>
                </div>

            </div>
        </section >
    );
}
