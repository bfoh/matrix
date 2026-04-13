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
                        <div className="p-3 md:p-8 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]">
                            <div className="transform scale-[0.28] sm:scale-[0.45] md:scale-[0.8] origin-top">
                                <div
                                    ref={templateRef}
                                    style={{
                                        width: 1200,
                                        height: 800,
                                        background: "#050505",
                                        border: `12px solid ${BRAND.colors.yellow}`,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "80px 60px",
                                        position: "relative",
                                        fontFamily: BRAND.fonts.heading,
                                        boxShadow: "inset 0 0 100px rgba(0,0,0,0.5)"
                                    }}
                                >
                                    {/* Logo Section */}
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ background: "#fff", width: 100, height: 100, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>
                                            <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 64, height: 64, objectFit: "contain" }} />
                                        </div>
                                        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.4)", letterSpacing: 6, marginTop: 24, fontWeight: 800, textTransform: "uppercase" }}>{BRAND.companyShort}</div>
                                    </div>

                                    {/* Status Section */}
                                    <div style={{ textAlign: "center", width: "100%" }}>
                                        <div style={{ fontSize: 140, fontWeight: 900, color: BRAND.colors.yellow, letterSpacing: -2, lineHeight: 0.9, textTransform: "uppercase" }}>
                                            {data.status}
                                        </div>
                                        {data.customText && (
                                            <div style={{ fontSize: 36, color: "#fff", marginTop: 20, fontFamily: BRAND.fonts.body, fontWeight: 600, letterSpacing: 1 }}>
                                                {data.customText.toUpperCase()}
                                            </div>
                                        )}
                                    </div>

                                    {/* Contact Section */}
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", marginBottom: 12 }}>
                                            <div style={{ height: 2, width: 40, background: BRAND.colors.yellow }} />
                                            <div style={{ fontSize: 56, color: "#fff", fontWeight: 900, fontFamily: BRAND.fonts.body, letterSpacing: 1 }}>
                                                {data.phone}
                                            </div>
                                            <div style={{ height: 2, width: 40, background: BRAND.colors.yellow }} />
                                        </div>
                                        <div style={{ fontSize: 20, color: BRAND.colors.yellow, letterSpacing: 4, fontWeight: 700 }}>
                                            {BRAND.website.toUpperCase()}
                                        </div>
                                    </div>

                                    {/* Corner detail */}
                                    <div style={{ position: "absolute", bottom: 20, right: 20, width: 40, height: 40, borderRight: `4px solid ${BRAND.colors.yellow}`, borderBottom: `4px solid ${BRAND.colors.yellow}`, opacity: 0.5 }} />
                                    <div style={{ position: "absolute", top: 20, left: 20, width: 40, height: 40, borderLeft: `4px solid ${BRAND.colors.yellow}`, borderTop: `4px solid ${BRAND.colors.yellow}`, opacity: 0.5 }} />
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
