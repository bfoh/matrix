"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function WorkWithUs() {
    return (
        <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/work-bg.png"
                    alt="Work With Us"
                    className="w-full h-full object-cover"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center text-white">
                <h2 className="text-[40px] md:text-[50px] font-raleway font-light tracking-[2px] mb-6 uppercase">
                    WORK WITH US
                </h2>

                {/* Divider */}
                <div className="w-24 h-[1px] bg-white mx-auto mb-8 opacity-70"></div>

                <p className="max-w-3xl mx-auto text-[15px] md:text-[16px] leading-[28px] font-raleway font-normal tracking-[0.5px] mb-12">
                    With extensive experience and top-notch networking skills, Matrix MultiTech Ltd consistently ranks among the top of the industry. Our commitment to client confidentiality and staying ahead of cutting edge marketing techniques is what keeps us out performing the rest.
                </p>

                <Link href="#contact-us">
                    <button className="border-2 border-white text-white px-12 py-4 text-[13px] font-bold font-raleway tracking-[3px] uppercase hover:bg-white hover:text-black transition-colors duration-300">
                        CONTACT US
                    </button>
                </Link>
            </div>
        </section>
    );
}
