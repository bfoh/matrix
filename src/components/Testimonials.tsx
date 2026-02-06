"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
    return (
        <section className="relative w-full py-20 md:py-32 overflow-hidden">
            {/* Background Image - Marble/Stone Texture */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/marble-bg.png"
                    alt="Marble Background"
                    className="w-full h-full object-cover"
                />
                {/* Subtle overlay to ensure text readability if needed, though design looks clean */}
                <div className="absolute inset-0 bg-black/5" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row">

                    {/* Left Side: Title & Navigation */}
                    <div className="lg:w-1/3 mb-12 lg:mb-0">
                        <h2 className="text-white text-[40px] md:text-[50px] font-raleway font-light tracking-[2px] mb-8">
                            TESTIMONIALS
                        </h2>

                        <div className="flex gap-4 text-white text-[13px] font-bold font-raleway tracking-[2px] uppercase">
                            <button className="hover:text-black transition-colors underline decoration-1 underline-offset-4">previous</button>
                            <span className="opacity-50">|</span>
                            <button className="hover:text-black transition-colors underline decoration-1 underline-offset-4">next</button>
                        </div>
                    </div>

                    {/* Right Side: Content Box (simulated alignment) */}
                    <div className="lg:w-2/3 lg:pl-20">
                        <div className="max-w-2xl">
                            <p className="text-white text-[15px] md:text-[16px] leading-[28px] font-raleway font-normal tracking-[0.5px] mb-8">
                                After much evaluation and comparison of the real estate brokerages in the area we decided to go with Matrix MultiTech Ltd. It turned out to be a great choice. The Matrix MultiTech team worked hard to keep us up to date and informed about the market values, sales and showings of similar properties in our area. After their comp study they suggested an asking price that was very realistic and achievable, (which turned out to be spot-on). After we went under contract we were always kept informed of the closing schedules and critical dates. I would definitely recommend and use Matrix MultiTech Ltd again.
                            </p>

                            <p className="text-white text-[13px] font-bold font-raleway tracking-[2px] uppercase mb-12 flex items-center gap-4">
                                <span className="w-6 h-[1px] bg-white inline-block"></span>
                                BUBBA RIGGS
                            </p>

                            <button className="border-2 border-white text-white px-10 py-4 text-[13px] font-bold font-raleway tracking-[3px] uppercase hover:bg-white hover:text-black transition-colors duration-300">
                                VIEW ALL
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
