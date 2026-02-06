"use client";

import { motion } from "framer-motion";
import { Check, CheckCircle2 } from "lucide-react";

export default function WhoWeAre() {
    return (
        <section id="about" className="bg-black py-20 relative overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-[#FF4A4A] font-bold tracking-[4px] text-[12px] uppercase font-raleway">
                        Who We Are
                    </span>
                    <h2 className="text-white text-[32px] md:text-[48px] font-montserrat font-bold mt-4 uppercase leading-tight">
                        Architectural <span className="text-[#FF4A4A]">Development</span> & <br className="hidden md:block" />
                        Consultation
                    </h2>
                    <div className="w-24 h-1 bg-[#FF4A4A] mx-auto mt-6"></div>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Column: Text */}
                    <div className="lg:w-1/2 space-y-8">
                        <div className="border-l-4 border-[#FF4A4A] pl-6">
                            <p className="text-white/90 text-[18px] md:text-[20px] font-raleway leading-relaxed">
                                Matrix MultiTech Limited is a premier real estate and construction firm dedicated to transforming the Ghanaian landscape.
                            </p>
                        </div>

                        <p className="text-gray-400 text-[16px] leading-7 font-raleway">
                            We combine modern industrial aesthetics with functional luxury to create spaces that stand the test of time. Whether it's residential development, commercial construction, or property management, our commitment to quality is unwavering.
                        </p>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4">
                                <CheckCircle2 className="text-[#FF4A4A] flex-shrink-0" size={24} />
                                <span className="text-white font-bold font-raleway text-[16px] uppercase tracking-wide">
                                    Modern Architectural Design
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <CheckCircle2 className="text-[#FF4A4A] flex-shrink-0" size={24} />
                                <span className="text-white font-bold font-raleway text-[16px] uppercase tracking-wide">
                                    End-to-End Construction
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <CheckCircle2 className="text-[#FF4A4A] flex-shrink-0" size={24} />
                                <span className="text-white font-bold font-raleway text-[16px] uppercase tracking-wide">
                                    Premium Property Management
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="lg:w-1/2 relative">
                        {/* Decorative background element */}
                        <div className="absolute -inset-4 bg-[#FF4A4A]/10 rounded-lg -z-10 blur-xl"></div>

                        <div className="relative rounded-sm overflow-hidden border border-white/10">
                            {/* Using property image 1 as it looks structurally impressive, or hero-bg which is usually high quality */}
                            <img
                                src="/images/prop-1.png"
                                alt="Modern Architectural Design"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
