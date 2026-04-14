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
                        <div className="p-3 md:p-6 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d] overflow-auto">
                            <div className="transform scale-[0.18] sm:scale-[0.28] md:scale-[0.5] origin-top">
                                <div
                                    ref={templateRef}
                                    style={{
                                        width: 1920, height: 1080, background: "#0a0a0a",
                                        position: "relative", overflow: "hidden", fontFamily: BRAND.fonts.heading,
                                        display: "flex", flexDirection: "column", padding: "120px 160px",
                                    }}
                                >
                                    {/* Large Background Watermark Logo (very subtle) */}
                                    <div style={{ position: "absolute", bottom: -200, right: -200, opacity: 0.02, pointerEvents: "none" }}>
                                        <img src={BRAND.logoTransparent} alt="" crossOrigin="anonymous" style={{ width: 1000, height: 1000, objectFit: "contain" }} />
                                    </div>
                                    
                                    {/* Geometric Accents */}
                                    <div style={{ position: "absolute", top: 0, left: 0, width: 24, height: "100%", background: BRAND.colors.yellow }} />
                                    <div style={{ position: "absolute", top: 0, right: 0, width: 600, height: 4, background: `linear-gradient(90deg, transparent, ${BRAND.colors.yellow})` }} />
                                    <div style={{ position: "absolute", bottom: 0, left: 0, width: 800, height: 4, background: `linear-gradient(90deg, ${BRAND.colors.yellow}, transparent)` }} />

                                    <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
                                        {/* Top Branding */}
                                        <div style={{ display: "flex", alignItems: "center", gap: 32, marginBottom: "auto" }}>
                                            <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 100, height: 100, objectFit: "contain" }} />
                                            <div>
                                                <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>{BRAND.companyShort}</div>
                                                <div style={{ fontSize: 18, color: BRAND.colors.yellow, fontWeight: 800, marginTop: 4, textTransform: "uppercase" }}>{BRAND.tagline}</div>
                                            </div>
                                        </div>

                                        {/* Main Content Area */}
                                        <div style={{ marginBottom: "auto" }}>
                                            <div style={{ width: 180, height: 8, background: BRAND.colors.yellow, marginBottom: 40 }} />
                                            <div style={{ fontSize: 110, fontWeight: 900, color: "#fff", lineHeight: 1.05, maxWidth: 1200, textTransform: "uppercase" }}>
                                                {data.title}
                                            </div>
                                            <div style={{ fontSize: 40, color: "rgba(255,255,255,0.6)", marginTop: 24, fontFamily: BRAND.fonts.body, fontWeight: 500, maxWidth: 1000 }}>
                                                {data.subtitle}
                                            </div>
                                        </div>

                                        {/* Bottom Presenter Details */}
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                                            <div>
                                                <div style={{ fontSize: 20, color: BRAND.colors.yellow, fontWeight: 900, marginBottom: 8, textTransform: "uppercase" }}>PRESENTED BY</div>
                                                <div style={{ fontSize: 36, color: "#fff", fontWeight: 700, fontFamily: BRAND.fonts.body }}>{data.presenter.toUpperCase()}</div>
                                            </div>
                                            <div style={{ textAlign: "right" }}>
                                                <div style={{ fontSize: 24, color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>{data.date.toUpperCase()}</div>
                                            </div>
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
