"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import BusinessCardTemplate from "./BusinessCardTemplate";
import { useCanvasDownload } from "../useCanvasDownload";
import { usePdfDownload } from "../usePdfDownload";
import { BRAND } from "../brandConstants";

interface BusinessCardProps {
    onBack: () => void;
}

export default function BusinessCard({ onBack }: BusinessCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { downloadPng, isGenerating: isPngGenerating } = useCanvasDownload();
    const { downloadPdf, isGenerating: isPdfGenerating } = usePdfDownload();

    const [data, setData] = useState<{ name: string; title: string; phone: string; email: string }>({
        name: BRAND.ceo,
        title: BRAND.ceoTitle,
        phone: BRAND.phone,
        email: BRAND.email,
    });

    const isGenerating = isPngGenerating || isPdfGenerating;

    const handleDownloadPng = () => {
        downloadPng(cardRef, "matrix-business-card.png", 2);
    };

    const handleDownloadPdf = () => {
        downloadPdf(cardRef, {
            orientation: "landscape",
            widthInches: 3.5,
            heightInches: 2,
            scale: 3,
            filename: "matrix-business-card.pdf",
        });
    };

    return (
        <div className="p-6 md:p-8">
            {/* Header */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-white/40 hover:text-[#D9DE00] transition-colors mb-6 group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold tracking-[2px] font-raleway">BRANDING HUB / STATIONERY</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-bold font-montserrat tracking-wider mb-8">
                BUSINESS <span className="text-[#D9DE00]">CARD</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Preview */}
                <div className="flex-1">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 flex justify-between items-center border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">LIVE PREVIEW</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleDownloadPng}
                                    disabled={isGenerating}
                                    className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-[#D9DE00]/15 text-[#D9DE00] hover:bg-[#D9DE00]/25 transition-colors disabled:opacity-50"
                                >
                                    {isPngGenerating ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                                    PNG
                                </button>
                                <button
                                    onClick={handleDownloadPdf}
                                    disabled={isGenerating}
                                    className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-red-500/15 text-red-500 hover:bg-red-500/25 transition-colors disabled:opacity-50"
                                >
                                    {isPdfGenerating ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                                    PDF
                                </button>
                            </div>
                        </div>
                        <div className="p-8 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]">
                            <div className="transform scale-[0.55] md:scale-[0.65] origin-top">
                                <BusinessCardTemplate ref={cardRef} data={data} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editor Form */}
                <div className="lg:w-[340px]">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">CUSTOMIZE</span>
                        </div>
                        <div className="p-5 space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">FULL NAME</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">TITLE</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">PHONE</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">EMAIL</label>
                                <input
                                    type="text"
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors"
                                />
                            </div>

                            <div className="pt-2 space-y-3">
                                <button
                                    onClick={handleDownloadPng}
                                    disabled={isGenerating}
                                    className="w-full flex items-center justify-center gap-2 bg-[#D9DE00] text-black font-bold py-3 rounded-lg text-sm tracking-wider font-montserrat hover:bg-[#e5ea2a] transition-colors disabled:opacity-50"
                                >
                                    {isPngGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                                    DOWNLOAD PNG
                                </button>
                                <button
                                    onClick={handleDownloadPdf}
                                    disabled={isGenerating}
                                    className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-bold py-3 rounded-lg text-sm tracking-wider font-montserrat hover:bg-white/10 transition-colors disabled:opacity-50"
                                >
                                    {isPdfGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                                    DOWNLOAD PRINT PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
