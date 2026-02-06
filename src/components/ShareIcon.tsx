"use client";

import { useState } from "react";
import { Share2, MessageCircle, Facebook, Twitter, Link2, Check, X } from "lucide-react";
import { PropertyEvents } from "@/components/GoogleAnalytics";

interface ShareIconProps {
    title: string;
    price: string;
    address: string;
    propertyId: string;
}

export default function ShareIcon({ title, price, address, propertyId }: ShareIconProps) {
    const [copied, setCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Construct the property URL
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${baseUrl}/properties/${propertyId}`;

    // Create share message
    const shareText = `Check out this property: ${title} - ${price} at ${address}`;

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + "\n" + url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
    };

    const copyToClipboard = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(url);
            PropertyEvents.copyPropertyLink(propertyId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleShare = (e: React.MouseEvent, platform: keyof typeof shareLinks) => {
        e.preventDefault();
        e.stopPropagation();
        PropertyEvents.shareProperty(propertyId, platform);
        window.open(shareLinks[platform], "_blank", "noopener,noreferrer,width=600,height=400");
    };

    const toggleOpen = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const closeDropdown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
    };

    return (
        <div className="relative" onClick={(e) => e.stopPropagation()}>
            {/* Share Icon Button */}
            <button
                onClick={toggleOpen}
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all hover:scale-110"
                title="Share Property"
            >
                <Share2 size={18} className="text-gray-700" />
            </button>

            {/* Share Options Dropdown */}
            {isOpen && (
                <>
                    <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 shadow-2xl rounded-lg p-2 min-w-[180px] z-50">
                        {/* Close button */}
                        <button
                            onClick={closeDropdown}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-black"
                        >
                            <X size={12} />
                        </button>

                        {/* WhatsApp */}
                        <button
                            onClick={(e) => handleShare(e, "whatsapp")}
                            className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-green-50 rounded-lg transition-colors"
                        >
                            <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
                                <MessageCircle size={14} className="text-white" />
                            </div>
                            <span className="font-raleway text-xs font-medium text-gray-700">WhatsApp</span>
                        </button>

                        {/* Facebook */}
                        <button
                            onClick={(e) => handleShare(e, "facebook")}
                            className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
                                <Facebook size={14} className="text-white" />
                            </div>
                            <span className="font-raleway text-xs font-medium text-gray-700">Facebook</span>
                        </button>

                        {/* Twitter/X */}
                        <button
                            onClick={(e) => handleShare(e, "twitter")}
                            className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                                <Twitter size={14} className="text-white" />
                            </div>
                            <span className="font-raleway text-xs font-medium text-gray-700">X (Twitter)</span>
                        </button>

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-1" />

                        {/* Copy Link */}
                        <button
                            onClick={copyToClipboard}
                            className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${copied ? "bg-green-500" : "bg-gray-400"}`}>
                                {copied ? <Check size={14} className="text-white" /> : <Link2 size={14} className="text-white" />}
                            </div>
                            <span className="font-raleway text-xs font-medium text-gray-700">
                                {copied ? "Copied!" : "Copy Link"}
                            </span>
                        </button>
                    </div>

                    {/* Click outside to close */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={closeDropdown}
                    />
                </>
            )}
        </div>
    );
}
