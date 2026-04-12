"use client";

import { useRef } from "react";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import EnvelopeTemplate from "./EnvelopeTemplate";
import { usePdfDownload } from "../usePdfDownload";

export default function Envelope({ onBack }: { onBack: () => void }) {
    const templateRef = useRef<HTMLDivElement>(null);
    const { downloadPdf, isGenerating } = usePdfDownload();

    const handleDownload = () => {
        downloadPdf(templateRef, {
            orientation: "landscape",
            widthInches: 8.66,
            heightInches: 4.33,
            scale: 3,
            filename: "matrix-envelope.pdf",
        });
    };

    return (
        <div className="p-6 md:p-8">
            <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-[#D9DE00] transition-colors mb-6 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold tracking-[2px] font-raleway">BRANDING HUB / STATIONERY</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-bold font-montserrat tracking-wider mb-8">
                ENVE<span className="text-[#D9DE00]">LOPE</span>
            </h1>

            <div className="max-w-3xl mx-auto">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                    <div className="px-5 py-3 flex justify-between items-center border-b border-white/[0.06]">
                        <span className="text-[10px] tracking-[2px] font-bold text-white/30">PREVIEW</span>
                        <button
                            onClick={handleDownload}
                            disabled={isGenerating}
                            className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-red-500/15 text-red-500 hover:bg-red-500/25 transition-colors disabled:opacity-50"
                        >
                            {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                            PDF
                        </button>
                    </div>
                    <div className="p-8 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]">
                        <div className="transform scale-[0.7] md:scale-[0.85] origin-top">
                            <EnvelopeTemplate ref={templateRef} />
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleDownload}
                    disabled={isGenerating}
                    className="w-full mt-5 flex items-center justify-center gap-2 bg-[#D9DE00] text-black font-bold py-3 rounded-lg text-sm tracking-wider font-montserrat hover:bg-[#e5ea2a] transition-colors disabled:opacity-50"
                >
                    {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    DOWNLOAD PRINT-READY PDF
                </button>
            </div>
        </div>
    );
}
