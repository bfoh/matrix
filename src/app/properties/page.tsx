"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareIcon from "@/components/ShareIcon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

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

export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();


    useEffect(() => {
        const fetchProperties = async () => {
            // Get search param from URL manually since we are client-side only for this part
            const searchParams = new URLSearchParams(window.location.search);
            const searchTerm = searchParams.get("search");

            let query = supabase
                .from('properties')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false });

            if (searchTerm) {
                // Apply search filter on title or address
                // Use .or() syntax for Supabase: "column.ilike.value,column2.ilike.value"
                // Note: to search multiple columns with OR, we need the correct syntax
                query = query.or(`title.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%`);
            }

            const { data, error } = await query;

            if (data) {
                setProperties(data as any);
            }
            setLoading(false);
        };
        fetchProperties();
    }, []);

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header />

            {/* 1. HERO SECTION */}
            <section className="relative h-[45vh] md:h-[60vh] w-full flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/hero-bg.png"
                        alt="Luxury Estate"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Title */}
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-white text-[40px] sm:text-[50px] md:text-[70px] font-raleway font-light tracking-[2px]">
                        LISTINGS
                    </h1>
                </div>
            </section>

            {/* 2. PROPERTIES GRID */}
            <section className="flex-grow py-12 md:py-20 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-black text-[20px] sm:text-[24px] md:text-[30px] font-raleway font-normal tracking-[2px] uppercase">
                            ALL PROPERTIES
                        </h2>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">Loading...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-12">
                            {properties.map((property) => (
                                <Link href={`/properties/${property.id}`} key={property.id} className="group cursor-pointer flex flex-col h-full">
                                    {/* Image Container */}
                                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                                        <span className="absolute top-0 right-0 bg-[#D9DE00] text-black text-[13px] font-bold px-6 py-2 tracking-widest z-10 uppercase">
                                            {property.status}
                                        </span>
                                        <img
                                            src={property.image}
                                            alt={property.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Share Icon */}
                                        <div className="absolute bottom-3 right-3 z-30">
                                            <ShareIcon
                                                title={property.title}
                                                price={property.price}
                                                address={property.address}
                                                propertyId={property.id}
                                            />
                                        </div>

                                        {/* Hover Overlay Button */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <button className="border-2 border-white text-white px-8 py-3 font-raleway font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
                                                View Property
                                            </button>
                                        </div>
                                    </div>

                                    {/* Info Box - Seamlessly attached to image */}
                                    <div className="bg-black p-6 md:p-10 text-white flex flex-col justify-center items-center text-center space-y-2 md:space-y-3 flex-grow border-t-0">
                                        <h3 className="text-[18px] md:text-[24px] font-raleway font-medium tracking-[1px] uppercase text-white line-clamp-2">
                                            {property.title}
                                        </h3>
                                        <p className="text-white text-[11px] md:text-[13px] font-bold font-raleway tracking-[1.2px] md:tracking-[1.5px] uppercase line-clamp-1">
                                            {property.address}
                                        </p>
                                        <p className="text-white text-[11px] md:text-[13px] font-bold font-raleway tracking-[1.2px] md:tracking-[1.5px] uppercase">
                                            {property.bedrooms} BD | {property.bathrooms} BA | {property.area_sqm} SQ M
                                        </p>
                                        <p className="text-white text-[16px] md:text-[20px] font-bold font-raleway tracking-[1px] pt-2 md:pt-4">
                                            {property.price}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
