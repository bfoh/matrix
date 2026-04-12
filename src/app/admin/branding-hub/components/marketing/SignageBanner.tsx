"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { useCanvasDownload } from "../useCanvasDownload";
import { BRAND } from "../brandConstants";

const STATUSES = ["FOR SALE", "FOR RENT", "SOLD", "COMING SOON"] as const;

export default function SignageBanner({ onBack }: { onBack: () => void }) {
    const templateRef = useRef<HTMLDivElement>(null);
    const { downloadPng, isGenerating } = useCanvasDownload();
    const [data, setData] = useState<{ status: string; phone: string; customText: string }>({ status: "FOR SALE", phone: BRAND.phone, customText: "" });

    return (
        <div className="p-6 md:p-8">
            <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-[#D9DE00] transition-colors mb-6 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold tracking-[2px] font-raleway">BRANDING HUB / MARKETING</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-bold font-montserrat tracking-wider mb-8">
                SIGNAGE <span className="text-[#D9DE00]">BANNER</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 flex justify-between items-center border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">PREVIEW</span>
                            <button onClick={() => downloadPng(templateRef, `matrix-${data.status.toLowerCase().replace(" ", "-")}-sign.png`, 2)} disabled={isGenerating} className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-[#D9DE00]/15 text-[#D9DE00] hover:bg-[#D9DE00]/25 transition-colors disabled:opacity-50">
                                {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />} PNG
                            </button>
                        </div>
                        <div className="p-8 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]">
                            <div className="transform scale-[0.65] md:scale-[0.8] origin-top">
                                <div
                                    ref={templateRef}
                                    style={{
                                        width: 1200,
                                        height: 800,
                                        background: BRAND.colors.black,
                                        border: `6px solid ${BRAND.colors.yellow}`,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        position: "relative",
                                        fontFamily: BRAND.fonts.heading,
                                    }}
                                >
                                    <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 100, height: 100, objectFit: "contain", marginBottom: 24 }} />

                                    <div style={{ fontSize: 80, fontWeight: 900, color: BRAND.colors.yellow, letterSpacing: 10, textAlign: "center" }}>
                                        {data.status}
                                    </div>

                                    {data.customText && (
                                        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.6)", marginTop: 12, fontFamily: BRAND.fonts.body, fontWeight: 500 }}>
                                            {data.customText}
                                        </div>
                                    )}

                                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", letterSpacing: 4, marginTop: 24, fontWeight: 600 }}>
                                        MATRIX MULTITECH LTD
                                    </div>

                                    <div style={{ fontSize: 32, color: "#fff", fontWeight: 700, marginTop: 20, fontFamily: BRAND.fonts.body }}>
                                        {data.phone}
                                    </div>

                                    <div style={{ fontSize: 16, color: "rgba(255,255,255,0.3)", marginTop: 8, fontFamily: BRAND.fonts.body }}>
                                        {BRAND.website}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-[300px]">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">CUSTOMIZE</span>
                        </div>
                        <div className="p-5 space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">STATUS</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {STATUSES.map((s) => (
                                        <button key={s} onClick={() => setData({ ...data, status: s })} className={`py-2.5 rounded-lg text-[10px] font-bold tracking-wider border transition-all ${data.status === s ? "bg-[#D9DE00]/10 border-[#D9DE00]/30 text-[#D9DE00]" : "bg-white/5 border-white/10 text-white/30"}`}>
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">PHONE</label>
                                <input type="text" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">CUSTOM TEXT (OPTIONAL)</label>
                                <input type="text" value={data.customText} onChange={(e) => setData({ ...data, customText: e.target.value })} placeholder="e.g. 3 Bedroom Villa" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors placeholder:text-white/15" />
                            </div>
                            <button onClick={() => downloadPng(templateRef, `matrix-${data.status.toLowerCase().replace(" ", "-")}-sign.png`, 2)} disabled={isGenerating} className="w-full flex items-center justify-center gap-2 bg-[#D9DE00] text-black font-bold py-3 rounded-lg text-sm tracking-wider font-montserrat hover:bg-[#e5ea2a] transition-colors disabled:opacity-50">
                                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} DOWNLOAD PNG
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
