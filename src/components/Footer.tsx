import { Phone, Mail, MapPin, MessageCircle, Navigation } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer id="contact-us" className="bg-[#050505] text-white py-20 border-t border-white/5 relative overflow-hidden">
            {/* Decorative background lines */}
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/[0.02] hidden lg:block" />
            <div className="absolute top-0 left-2/4 w-[1px] h-full bg-white/[0.02] hidden lg:block" />
            <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/[0.02] hidden lg:block" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                {/* 12-column grid on large screens to properly distribute width and prevent overlapping */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                    {/* 1. Brand (3/12 width) */}
                    <div className="flex flex-col lg:col-span-3">
                        <Link href="/" className="flex items-center gap-2 group mb-8">
                            <div className="relative h-16 w-16 md:h-20 md:w-20 flex-shrink-0">
                                <img
                                    src="/matrix-logo-transparent.png"
                                    alt="Matrix MultiTech Ltd"
                                    className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-white font-montserrat font-bold text-[16px] xl:text-[20px] tracking-wide leading-none whitespace-nowrap">
                                    MATRIX <span className="text-primary transition-colors duration-300">MULTITECH</span>
                                </h3>
                                <p className="text-white/50 font-raleway text-[9px] xl:text-[10px] tracking-[0.2em] leading-tight md:ml-[1px] mt-1">
                                    DESIGN | RESIDENTIAL | LAND
                                </p>
                            </div>
                        </Link>
                        <p className="text-gray-400 font-raleway text-[13px] xl:text-[14px] leading-relaxed tracking-wide pr-4">
                            Pioneering excellence in real estate, architectural development, and property management across Ghana.
                        </p>
                    </div>

                    {/* 2. Explore (2/12 width) */}
                    <div className="lg:col-span-2 lg:pl-4 xl:pl-8">
                        <h4 className="text-[12px] font-bold font-raleway tracking-[3px] text-white/50 mb-8 uppercase flex items-center gap-3">
                            <span className="w-4 h-[2px] bg-accent inline-block" />
                            Explore
                        </h4>
                        <ul className="space-y-4">
                            {["Home Search", "Home Valuation", "Properties", "Media", "Contact"].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === "Contact" ? "#contact-us" : "#"}
                                        className="text-gray-300 hover:text-primary text-[13px] xl:text-[14px] font-medium font-raleway tracking-wide transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Contact Us (4/12 width - Needs more space for email, whatsapp, and map) */}
                    <div className="lg:col-span-4 lg:pl-4">
                        <h4 className="text-[12px] font-bold font-raleway tracking-[3px] text-white/50 mb-8 uppercase flex items-center gap-3">
                            <span className="w-4 h-[2px] bg-accent inline-block" />
                            Contact Us
                        </h4>
                        <div className="space-y-5">
                            <a href="tel:+233267671110" className="flex items-start gap-4 group">
                                <Phone className="text-white/40 group-hover:text-primary w-5 h-5 flex-shrink-0 transition-colors duration-300 mt-0.5" strokeWidth={1.5} />
                                <span className="text-gray-300 group-hover:text-white text-[13px] xl:text-[14px] font-raleway tracking-wide transition-colors duration-300">+233 26 767 1110</span>
                            </a>
                            <a href="https://wa.me/233267671110" className="flex items-start gap-4 group">
                                <MessageCircle className="text-white/40 group-hover:text-primary w-5 h-5 flex-shrink-0 transition-colors duration-300 mt-0.5" strokeWidth={1.5} />
                                <span className="text-gray-300 group-hover:text-white text-[13px] xl:text-[14px] font-raleway tracking-wide transition-colors duration-300">+233 26 767 1110 (WhatsApp)</span>
                            </a>
                            <a href="mailto:info@matrixmultitech.com" className="flex items-start gap-4 group">
                                <Mail className="text-white/40 group-hover:text-primary w-5 h-5 flex-shrink-0 transition-colors duration-300 mt-0.5" strokeWidth={1.5} />
                                <span className="text-gray-300 group-hover:text-white text-[13px] xl:text-[14px] font-raleway tracking-wide transition-colors duration-300 break-words line-clamp-1">info@matrixmultitech.com</span>
                            </a>
                            <div className="flex items-start gap-4 group pt-2">
                                <MapPin className="text-white/40 group-hover:text-primary w-5 h-5 flex-shrink-0 transition-colors duration-300 mt-0.5" strokeWidth={1.5} />
                                <div className="flex flex-col w-full pr-4">
                                    <span className="text-gray-300 font-raleway text-[13px] xl:text-[14px] tracking-wide leading-relaxed cursor-default">
                                        Matrix Headquarters<br />
                                        Accra, Ghana
                                    </span>
                                    <span className="text-primary/80 font-bold font-raleway text-[11px] tracking-[2px] mt-1 mb-3 uppercase">
                                        GPS: GG-001-1387
                                    </span>

                                    {/* Google Map Embedded Area */}
                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=5.6425,-0.1554"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full h-[140px] xl:h-[160px] border border-white/10 rounded-sm overflow-hidden relative group/map bg-white/5"
                                    >
                                        <iframe
                                            src="https://maps.google.com/maps?q=5.6425,-0.1554&t=&z=16&ie=UTF8&iwloc=&output=embed"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(80%) hue-rotate(180deg)', opacity: 0.8, pointerEvents: 'none' }}
                                            allowFullScreen={false}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="transition-all duration-700 group-hover/map:scale-105 group-hover/map:filter-none object-cover"
                                        ></iframe>
                                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover/map:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                                            <Navigation className="text-primary w-6 h-6 mb-2" />
                                            <span className="text-white text-[11px] font-bold font-raleway tracking-[2px] uppercase">Get Directions</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Connect (3/12 width) */}
                    <div className="lg:col-span-3 lg:pl-4">
                        <h4 className="text-[12px] font-bold font-raleway tracking-[3px] text-white/50 mb-8 uppercase flex items-center gap-3">
                            <span className="w-4 h-[2px] bg-accent inline-block" />
                            Connect
                        </h4>
                        <div className="flex gap-4 mb-10">
                            {[
                                { label: "Facebook", href: "#", svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
                                { label: "Instagram", href: "#", svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                                { label: "LinkedIn", href: "#", svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                                { label: "X / Twitter", href: "#", svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    aria-label={item.label}
                                    className="w-10 h-10 xl:w-12 xl:h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/70 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    {item.svg}
                                </a>
                            ))}
                        </div>

                        {/* Newsletter value exchange */}
                        <div className="bg-white/[0.03] border border-white/10 p-5 xl:p-6 flex flex-col gap-3 group hover:border-primary/50 transition-colors duration-300">
                            <p className="text-[11px] xl:text-[12px] font-montserrat font-bold text-primary tracking-[2px] uppercase">
                                Free Market Report
                            </p>
                            <p className="text-white/40 font-raleway text-[11px] leading-relaxed">
                                Monthly insights on Accra property prices, hotspots &amp; investment tips.
                            </p>
                            <div className="flex w-full border-b border-white/20 group-hover:border-primary pb-2 transition-colors duration-300 mt-1">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="bg-transparent border-none outline-none text-white font-raleway text-[12px] xl:text-[13px] w-full placeholder:text-white/25 focus:ring-0"
                                />
                                <button className="text-primary text-[10px] font-bold tracking-widest uppercase hover:text-primary-light transition-colors duration-300 flex-shrink-0 whitespace-nowrap">
                                    Get It →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-gray-500 font-raleway text-[11px] xl:text-[12px] tracking-wide gap-4 text-center md:text-left">
                    <p>
                        © {new Date().getFullYear()} Matrix MultiTech Limited. All rights reserved.
                    </p>
                    <div className="flex items-center justify-center md:justify-end gap-6 w-full md:w-auto">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
