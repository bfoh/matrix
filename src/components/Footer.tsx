import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer id="contact-us" className="bg-black text-white py-16 border-t border-white/10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* 1. Brand */}
                <div>
                    <div className="flex items-center gap-1 group mb-6">
                        <div className="relative h-16 w-16 md:h-20 md:w-20 flex-shrink-0 overflow-hidden">
                            <img
                                src="/images/matrix-logo.png"
                                alt="Matrix MultiTech Ltd"
                                className="h-full w-full object-cover object-top scale-125 translate-y-2"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-white font-montserrat font-bold text-[16px] md:text-[20px] tracking-wide leading-none whitespace-nowrap">
                                MATRIX <span className="text-primary">MULTITECH LTD</span>
                            </h3>
                            <p className="text-gray-400 font-raleway text-[9px] md:text-[10px] tracking-[0.2em] leading-tight md:ml-[1px]">
                                DESIGN | RESIDENTIAL | LAND
                            </p>
                        </div>
                    </div>
                    {/* Address could stay here or move? Keeping simple branding here as contact moved. */}
                </div>

                {/* 2. Explore */}
                <div className="md:pl-12">
                    <h4 className="text-sm font-bold tracking-widest text-gray-500 mb-6 uppercase">Explore</h4>
                    <ul className="space-y-3">
                        {["Home Search", "Home Valuation", "Properties", "Media", "Contact"].map((item) => (
                            <li key={item}>
                                <Link
                                    href={item === "Contact" ? "#contact-us" : "#"}
                                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 3. Contact Us (Moved Here) */}
                <div>
                    <h3 className="text-sm font-bold tracking-widest text-gray-500 mb-6 uppercase">CONTACT US</h3>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Phone className="text-primary w-5 h-5 flex-shrink-0" />
                            <span className="text-gray-300 font-raleway tracking-wide">+233 26 767 1110</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <MessageCircle className="text-primary w-5 h-5 flex-shrink-0" />
                            <span className="text-gray-300 font-raleway tracking-wide">+233 26 767 1110</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Mail className="text-primary w-5 h-5 flex-shrink-0" />
                            <span className="text-gray-300 font-raleway tracking-wide break-all">info@matrixmultitech.com</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <MapPin className="text-primary w-5 h-5 flex-shrink-0" />
                            <span className="text-gray-300 font-raleway tracking-wide">Accra, Ghana</span>
                        </div>
                    </div>
                </div>

                {/* 4. Connect */}
                <div>
                    <h4 className="text-sm font-bold tracking-widest text-gray-500 mb-6 uppercase">Connect</h4>
                    <div className="flex gap-4 mb-8">
                        {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all duration-300">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                    <p className="text-xs text-gray-600">
                        © {new Date().getFullYear()} Matrix MultiTech Limited. All rights reserved.
                        Real Estate functionality pending integration.
                    </p>
                </div>
            </div>
        </footer>
    );
}
