"use client";

import { useState, useEffect } from "react";
import { Bed, Bath, Hash, Scaling, Play, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import PropertySchema from "@/components/StructuredData";
import { createClient } from "@/lib/supabase";

interface Property {
    id: string;
    title: string;
    address: string;
    price: string;
    status: string;
    image: string;
    images: string[];
    description: string[];
    bedrooms: number;
    bathrooms: number;
    area_sqm: number;
    plot_size: string;
    video_thumbnail?: string;
    video_url?: string;
}

export default function PropertyPage() {
    const params = useParams();
    const router = useRouter();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [viewMode, setViewMode] = useState<'default' | 'grid' | 'fullscreen'>('default');
    const [isPlayingVideo, setIsPlayingVideo] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        const fetchProperty = async () => {
            if (!params.id) return;

            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .eq('id', params.id)
                .single();

            if (error) {
                console.error("Error fetching property:", error);
                setLoading(false);
                return;
            }

            if (data) {
                // Ensure images array exists, fallback to single image if array is empty/null
                const images = data.images && data.images.length > 0 ? data.images : [data.image];

                setProperty({
                    ...data,
                    images: images,
                    description: data.description || ["No description available."],
                    // Ensure video thumbnail exists or use main image as fallback
                    video_thumbnail: data.video_image || data.image,
                    video_url: data.video_url
                });
            }
            setLoading(false);
        };

        fetchProperty();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <p className="font-raleway text-xl">Loading Property...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen flex flex-col bg-black text-white">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <h1 className="text-2xl font-raleway mt-20">Property not found</h1>
                </div>
                <Footer />
            </div>
        );
    }

    const nextImage = () => {
        if (!property.images || property.images.length === 0) return;
        setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    };

    const prevImage = () => {
        if (!property.images || property.images.length === 0) return;
        setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    };

    const selectImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    // Construct stats dynamically
    const stats = [
        { label: "Bedrooms", value: property.bedrooms, icon: Bed },
        { label: "Bathrooms", value: property.bathrooms, icon: Bath },
        { label: "Square Area", value: `${property.area_sqm} m²`, icon: Scaling },
        { label: "Plot Size", value: property.plot_size || "N/A", icon: Hash },
    ];

    // Gallery Modals
    if (viewMode === 'grid') {
        return (
            <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
                <div className="sticky top-0 bg-black/90 p-4 flex justify-between items-center z-10 backdrop-blur-sm">
                    <h2 className="text-white text-xl font-raleway uppercase tracking-widest">{property.title}</h2>
                    <button
                        onClick={() => setViewMode('default')}
                        className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X size={32} />
                    </button>
                </div>
                <div className="container mx-auto px-4 pb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {property.images.map((img, idx) => (
                            <div
                                key={idx}
                                onClick={() => {
                                    setCurrentImageIndex(idx);
                                    setViewMode('fullscreen');
                                }}
                                className="aspect-[4/3] cursor-pointer relative group overflow-hidden"
                            >
                                <img
                                    src={img}
                                    alt={`${property.title} - ${idx + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onClick={() => { }} // Empty handler to satisfy linter if needed, but the parent div handles click
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (viewMode === 'fullscreen') {
        return (
            <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
                <button
                    onClick={() => setViewMode('grid')}
                    className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-20"
                >
                    <X size={32} />
                </button>

                <button
                    onClick={prevImage}
                    className="absolute left-4 p-4 text-white hover:bg-white/20 rounded-full transition-colors z-20"
                >
                    <ChevronLeft size={48} />
                </button>

                <div className="w-full h-full p-4 md:p-10 flex items-center justify-center">
                    <img
                        src={property.images[currentImageIndex]}
                        alt={`${property.title} - ${currentImageIndex + 1}`}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>

                <button
                    onClick={nextImage}
                    className="absolute right-4 p-4 text-white hover:bg-white/20 rounded-full transition-colors z-20"
                >
                    <ChevronRight size={48} />
                </button>

                <div className="absolute bottom-4 left-0 right-0 text-center text-white/50 font-raleway">
                    {currentImageIndex + 1} / {property.images.length}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <Header />
            <PropertySchema
                property={property}
                url={typeof window !== "undefined" ? window.location.href : `https://www.matrixmultitech.net/properties/${property.id}`}
            />

            {/* 1. HERO SECTION / GALLERY */}
            <section className="relative h-[60vh] md:h-[85vh] w-full bg-gray-200 group overflow-hidden">

                {/* Main Image */}
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImageIndex}
                        src={property.images[currentImageIndex]}
                        alt={property.title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full object-cover"
                    />
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 bg-transparent text-white border-2 border-white p-2 hover:bg-white hover:text-black transition-colors z-20"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 bg-transparent text-white border-2 border-white p-2 hover:bg-white hover:text-black transition-colors z-20"
                >
                    <ChevronRight size={24} />
                </button>

                {/* See All Photos Button */}
                <div className="absolute bottom-[140px] right-6 md:right-10 z-20 md:bottom-[180px]">
                    <button
                        onClick={() => setViewMode('grid')}
                        className="bg-transparent border-2 border-white text-white px-6 py-3 font-raleway font-bold text-[13px] tracking-widest uppercase flex items-center gap-3 hover:bg-white hover:text-black transition-colors"
                    >
                        SEE ALL PHOTOS
                        <Maximize2 size={18} />
                    </button>
                </div>

                {/* Thumbnail Strip */}
                <div className="absolute bottom-0 left-0 right-0 h-[100px] md:h-[140px] bg-black/50 backdrop-blur-sm flex items-center px-4 overflow-x-auto z-10">
                    <div className="flex gap-4 mx-auto">
                        {property.images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => selectImage(index)}
                                className={`relative w-[120px] md:w-[180px] h-[70px] md:h-[100px] flex-shrink-0 overflow-hidden border-2 transition-all duration-300 ${currentImageIndex === index ? 'border-white opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. HEADER: Title & Price */}
            <section className="border-b border-gray-200">
                <div className="container mx-auto px-6 py-10 md:py-14">
                    <h1 className="text-[32px] md:text-[42px] font-normal font-montserrat uppercase tracking-[1px] text-black mb-2">
                        {property.title}
                    </h1>
                    <p className="text-[14px] md:text-[15px] font-bold font-montserrat uppercase tracking-[1px] text-black mb-8">
                        {property.address}
                    </p>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <p className="text-[28px] md:text-[32px] font-bold font-montserrat tracking-[1px] text-black">
                            {property.price}
                        </p>
                        <ShareButtons
                            title={property.title}
                            price={property.price}
                            address={property.address}
                            propertyId={property.id}
                        />
                    </div>
                </div>
            </section>

            {/* 3. MAIN CONTENT: Description & Stats */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                        {/* Description Column (65-70% width) */}
                        <div className="lg:w-2/3">
                            <div className="space-y-6 text-[#1a1a1a] text-[16px] leading-[28px] font-raleway font-normal tracking-[0.5px]">
                                {property.description.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {/* Divider Line (Vertical on Desktop) */}
                        <div className="hidden lg:block w-[1px] bg-gray-300 min-h-full"></div>

                        {/* Stats Column (Sidebar) */}
                        <div className="lg:w-1/3 space-y-10">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex items-start gap-6 group">
                                    <div className="text-gray-400 group-hover:text-black transition-colors">
                                        <stat.icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[20px] font-bold font-montserrat text-black leading-none mb-1">
                                            {stat.value}
                                        </span>
                                        <span className="text-[12px] font-bold font-raleway tracking-[2px] text-black uppercase">
                                            {stat.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. VIDEO SECTION - Only show if video_url exists */}
            {property?.video_url && (
                <section className="relative w-full aspect-video md:aspect-[21/9] bg-gray-900 overflow-hidden group cursor-pointer">
                    {!isPlayingVideo ? (
                        <div onClick={() => setIsPlayingVideo(true)} className="w-full h-full relative">
                            <img
                                src={property.video_thumbnail || property.images[0] || property.image}
                                alt="Property Video Thumbnail"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white flex items-center justify-center mb-4 pl-2 group-hover:scale-110 transition-transform duration-300">
                                    <Play fill="white" className="text-white w-8 h-8 md:w-10 md:h-10" />
                                </div>
                                <span className="text-white font-raleway font-bold text-[13px] tracking-[4px] uppercase">
                                    Watch Video
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full">
                            <video
                                src={property.video_url}
                                className="w-full h-full object-cover"
                                controls
                                autoPlay
                                controlsList="nodownload"
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsPlayingVideo(false);
                                }}
                                className="absolute top-4 right-4 z-20 text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    )}
                </section>
            )}

            <Footer />
        </div>
    );
}
