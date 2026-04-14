"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import EnvelopeTemplate from "./EnvelopeTemplate";
import type { EnvelopeData } from "./EnvelopeTemplate";
import { usePdfDownload } from "../usePdfDownload";

export default function Envelope({ onBack }: { onBack: () => void }) {
    const templateRef = useRef<HTMLDivElement>(null);
    const { downloadPdf, isGenerating } = usePdfDownload();

    const [data, setData] = useState<EnvelopeData>({
        recipientName: "",
        organization: "",
        address: "",
        cityCountry: "",
    });

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

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: Preview */}
                <div className="flex-1">
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
                        <div className="p-4 md:p-8 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]">
                            <div className="transform scale-[0.38] sm:scale-[0.55] md:scale-[0.85] origin-top">
                                <EnvelopeTemplate ref={templateRef} data={data} />
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

                {/* Right: Recipient Editor */}
                <div className="lg:w-[340px]">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">RECIPIENT DETAILS</span>
                        </div>
                        <div className="p-5 space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">FULL NAME</label>
                                <input
                                    type="text"
                                    value={data.recipientName}
                                    onChange={(e) => setData({ ...data, recipientName: e.target.value })}
                                    placeholder="e.g. Mr. John Mensah"
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors placeholder:text-white/15"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">ORGANIZATION</label>
                                <input
                                    type="text"
                                    value={data.organization}
                                    onChange={(e) => setData({ ...data, organization: e.target.value })}
                                    placeholder="e.g. Ghana Telecom Authority"
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors placeholder:text-white/15"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">ADDRESS</label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={(e) => setData({ ...data, address: e.target.value })}
                                    placeholder="e.g. P.O. Box 1234, Ring Road"
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors placeholder:text-white/15"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">CITY / COUNTRY</label>
                                <input
                                    type="text"
                                    value={data.cityCountry}
                                    onChange={(e) => setData({ ...data, cityCountry: e.target.value })}
                                    placeholder="e.g. Accra, Ghana"
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors placeholder:text-white/15"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
