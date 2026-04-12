"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import ComplimentSlipTemplate from "./ComplimentSlipTemplate";
import AiWritingAssistant from "../AiWritingAssistant";
import { usePdfDownload } from "../usePdfDownload";

export default function ComplimentSlip({ onBack }: { onBack: () => void }) {
    const templateRef = useRef<HTMLDivElement>(null);
    const { downloadPdf, isGenerating } = usePdfDownload();
    const [data, setData] = useState({ message: "" });

    const handleDownload = () => {
        downloadPdf(templateRef, {
            orientation: "landscape",
            widthInches: 8.27,
            heightInches: 3.19,
            scale: 3,
            filename: "matrix-compliment-slip.pdf",
        });
    };

    return (
        <div className="p-6 md:p-8">
            <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-[#D9DE00] transition-colors mb-6 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold tracking-[2px] font-raleway">BRANDING HUB / STATIONERY</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-bold font-montserrat tracking-wider mb-8">
                COMPLIMENT <span className="text-[#D9DE00]">SLIP</span>
            </h1>

            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1 space-y-5">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 flex justify-between items-center border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">LIVE PREVIEW</span>
                            <button
                                onClick={handleDownload}
                                disabled={isGenerating}
                                className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-red-500/15 text-red-500 hover:bg-red-500/25 transition-colors disabled:opacity-50"
                            >
                                {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                                PDF
                            </button>
                        </div>
                        <div className="p-6 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]">
                            <div className="transform scale-[0.75] md:scale-[0.9] origin-top">
                                <ComplimentSlipTemplate ref={templateRef} data={data} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 flex justify-between items-center border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">MESSAGE</span>
                            <span className="text-[10px] tracking-[1px] font-bold text-[#D9DE00]">✦ AI-ENHANCED</span>
                        </div>
                        <textarea
                            value={data.message}
                            onChange={(e) => setData({ message: e.target.value })}
                            className="w-full bg-transparent p-5 text-[13px] text-white/70 font-raleway leading-relaxed resize-none focus:outline-none min-h-[100px]"
                            placeholder="Type your compliment message..."
                        />
                    </div>

                    <button
                        onClick={handleDownload}
                        disabled={isGenerating}
                        className="w-full flex items-center justify-center gap-2 bg-[#D9DE00] text-black font-bold py-3 rounded-lg text-sm tracking-wider font-montserrat hover:bg-[#e5ea2a] transition-colors disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                        DOWNLOAD PDF
                    </button>
                </div>

                <div className="xl:w-[380px] min-h-[500px]">
                    <AiWritingAssistant materialType="compliment-slip" onApply={(text) => setData({ message: text })} />
                </div>
            </div>
        </div>
    );
}
