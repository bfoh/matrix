"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { useCanvasDownload } from "../useCanvasDownload";
import { BRAND } from "../brandConstants";

export default function PresentationCover({ onBack }: { onBack: () => void }) {
    const templateRef = useRef<HTMLDivElement>(null);
    const { downloadPng, isGenerating } = useCanvasDownload();
    const [data, setData] = useState({ title: "Presentation Title", subtitle: "Subtitle goes here", presenter: BRAND.ceo, date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) });

    return (
        <div className="p-6 md:p-8">
            <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-[#D9DE00] transition-colors mb-6 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold tracking-[2px] font-raleway">BRANDING HUB / MARKETING</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-bold font-montserrat tracking-wider mb-8">
                PRESENTATION <span className="text-[#D9DE00]">COVER</span>
            </h1>

            <div className="flex flex-col xl:flex-row gap-8">
                <div className="flex-1">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 flex justify-between items-center border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">PREVIEW — 1920×1080</span>
                            <button onClick={() => downloadPng(templateRef, "matrix-presentation-cover.png", 2)} disabled={isGenerating} className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-[#D9DE00]/15 text-[#D9DE00] hover:bg-[#D9DE00]/25 transition-colors disabled:opacity-50">
                                {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />} PNG
                            </button>
                        </div>
                        <div className="p-6 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d] overflow-auto">
                            <div className="transform scale-[0.4] md:scale-[0.5] origin-top">
                                <div
                                    ref={templateRef}
                                    style={{
                                        width: 1920, height: 1080, background: BRAND.colors.black,
                                        position: "relative", overflow: "hidden", fontFamily: BRAND.fonts.heading,
                                        display: "flex", alignItems: "center", padding: "0 120px",
                                    }}
                                >
                                    {/* Background accents */}
                                    <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 8, background: BRAND.colors.yellow }} />
                                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(217,222,0,0.06) 0%, transparent 40%)" }} />
                                    <div style={{ position: "absolute", bottom: 0, right: 0, width: 400, height: 300, background: "linear-gradient(135deg, transparent, rgba(217,222,0,0.04))" }} />

                                    <div style={{ position: "relative", zIndex: 1 }}>
                                        {/* Logo + Company */}
                                        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 60 }}>
                                            <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 60, height: 60, objectFit: "contain" }} />
                                            <div>
                                                <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: 4 }}>MATRIX MULTITECH LTD</div>
                                                <div style={{ fontSize: 11, color: BRAND.colors.yellow, letterSpacing: 3, fontWeight: 600, marginTop: 2 }}>{BRAND.tagline}</div>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <div style={{ fontSize: 64, fontWeight: 800, color: "#fff", letterSpacing: 2, lineHeight: 1.2, maxWidth: 900 }}>
                                            {data.title}
                                        </div>
                                        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.4)", marginTop: 16, fontFamily: BRAND.fonts.body, fontWeight: 400, letterSpacing: 1 }}>
                                            {data.subtitle}
                                        </div>

                                        {/* Divider */}
                                        <div style={{ width: 80, height: 3, background: BRAND.colors.yellow, marginTop: 40, marginBottom: 40 }} />

                                        {/* Presenter + Date */}
                                        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", fontFamily: BRAND.fonts.body }}>
                                            {data.presenter}
                                        </div>
                                        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", marginTop: 6, fontFamily: BRAND.fonts.body }}>
                                            {data.date}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="xl:w-[320px]">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">CUSTOMIZE</span>
                        </div>
                        <div className="p-5 space-y-5">
                            {[
                                { label: "TITLE", key: "title" as const },
                                { label: "SUBTITLE", key: "subtitle" as const },
                                { label: "PRESENTER", key: "presenter" as const },
                                { label: "DATE", key: "date" as const },
                            ].map((f) => (
                                <div key={f.key}>
                                    <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">{f.label}</label>
                                    <input type="text" value={data[f.key]} onChange={(e) => setData({ ...data, [f.key]: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors" />
                                </div>
                            ))}
                            <button onClick={() => downloadPng(templateRef, "matrix-presentation-cover.png", 2)} disabled={isGenerating} className="w-full flex items-center justify-center gap-2 bg-[#D9DE00] text-black font-bold py-3 rounded-lg text-sm tracking-wider font-montserrat hover:bg-[#e5ea2a] transition-colors disabled:opacity-50">
                                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} DOWNLOAD PNG
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
