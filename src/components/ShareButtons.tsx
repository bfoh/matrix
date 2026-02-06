"use client";

import { useState } from "react";
import { Share2, MessageCircle, Facebook, Twitter, Link2, Check } from "lucide-react";
import { PropertyEvents } from "@/components/GoogleAnalytics";

interface ShareButtonsProps {
    title: string;
    price: string;
    address: string;
    propertyUrl?: string;
    propertyId?: string;
}

export default function ShareButtons({ title, price, address, propertyUrl, propertyId }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Get the current URL if not provided
    const url = propertyUrl || (typeof window !== "undefined" ? window.location.href : "");

    // Create share message
    const shareText = `Check out this property: ${title} - ${price} at ${address}`;

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + "\n" + url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            if (propertyId) {
                PropertyEvents.copyPropertyLink(propertyId);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleShare = (platform: keyof typeof shareLinks) => {
        if (propertyId) {
            PropertyEvents.shareProperty(propertyId, platform);
        }
        window.open(shareLinks[platform], "_blank", "noopener,noreferrer,width=600,height=400");
    };

    return (
        <div className="relative">
            {/* Share Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-black text-white px-5 py-3 font-raleway font-bold text-[12px] tracking-[2px] uppercase hover:bg-gray-800 transition-colors"
            >
                <Share2 size={18} />
                Share Property
            </button>

            {/* Share Options Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-xl rounded-lg p-2 min-w-[200px] z-50">
                    {/* WhatsApp */}
                    <button
                        onClick={() => handleShare("whatsapp")}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-green-50 rounded-lg transition-colors group"
                    >
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <MessageCircle size={16} className="text-white" />
                        </div>
                        <span className="font-raleway text-sm font-medium text-gray-700 group-hover:text-green-600">
                            WhatsApp
                        </span>
                    </button>

                    {/* Facebook */}
                    <button
                        onClick={() => handleShare("facebook")}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 rounded-lg transition-colors group"
                    >
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <Facebook size={16} className="text-white" />
                        </div>
                        <span className="font-raleway text-sm font-medium text-gray-700 group-hover:text-blue-600">
                            Facebook
                        </span>
                    </button>

                    {/* Twitter/X */}
                    <button
                        onClick={() => handleShare("twitter")}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                            <Twitter size={16} className="text-white" />
                        </div>
                        <span className="font-raleway text-sm font-medium text-gray-700 group-hover:text-black">
                            X (Twitter)
                        </span>
                    </button>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-2" />

                    {/* Copy Link */}
                    <button
                        onClick={copyToClipboard}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${copied ? "bg-green-500" : "bg-gray-400"}`}>
                            {copied ? <Check size={16} className="text-white" /> : <Link2 size={16} className="text-white" />}
                        </div>
                        <span className="font-raleway text-sm font-medium text-gray-700">
                            {copied ? "Copied!" : "Copy Link"}
                        </span>
                    </button>
                </div>
            )}

            {/* Click outside to close */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}
