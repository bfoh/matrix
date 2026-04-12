"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Download, Upload, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useCanvasDownload } from "../useCanvasDownload";
import { usePdfDownload } from "../usePdfDownload";
import { BRAND } from "../brandConstants";

export default function IdBadge({ onBack }: { onBack: () => void }) {
    const templateRef = useRef<HTMLDivElement>(null);
    const { downloadPng, isGenerating: isPng } = useCanvasDownload();
    const { downloadPdf, isGenerating: isPdf } = usePdfDownload();
    const isGenerating = isPng || isPdf;

    const [data, setData] = useState({ name: BRAND.ceo, title: BRAND.ceoTitle, department: "Executive", photo: "" });

    const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setData({ ...data, photo: URL.createObjectURL(file) });
    };

    return (
        <div className="p-6 md:p-8">
            <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-[#D9DE00] transition-colors mb-6 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold tracking-[2px] font-raleway">BRANDING HUB / MARKETING</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-bold font-montserrat tracking-wider mb-8">
                ID <span className="text-[#D9DE00]">BADGE</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 flex justify-between items-center border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">PREVIEW</span>
                            <div className="flex gap-2">
                                <button onClick={() => downloadPng(templateRef, "matrix-id-badge.png", 2)} disabled={isGenerating} className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-[#D9DE00]/15 text-[#D9DE00] hover:bg-[#D9DE00]/25 transition-colors disabled:opacity-50">
                                    {isPng ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />} PNG
                                </button>
                                <button onClick={() => downloadPdf(templateRef, { orientation: "portrait", widthInches: 2.13, heightInches: 3.38, scale: 3, filename: "matrix-id-badge.pdf" })} disabled={isGenerating} className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-red-500/15 text-red-500 hover:bg-red-500/25 transition-colors disabled:opacity-50">
                                    {isPdf ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />} PDF
                                </button>
                            </div>
                        </div>
                        <div className="p-8 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]">
                            <div
                                ref={templateRef}
                                style={{
                                    width: 320,
                                    height: 506,
                                    background: BRAND.colors.black,
                                    borderRadius: 12,
                                    border: `1px solid rgba(217,222,0,0.2)`,
                                    overflow: "hidden",
                                    position: "relative",
                                    fontFamily: BRAND.fonts.body,
                                }}
                            >
                                {/* Yellow top bar */}
                                <div style={{ height: 8, background: BRAND.colors.yellow }} />

                                {/* Logo */}
                                <div style={{ textAlign: "center", padding: "20px 0 12px" }}>
                                    <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 56, height: 56, objectFit: "contain", margin: "0 auto" }} />
                                    <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: 2, marginTop: 6 }}>MATRIX MULTITECH LTD</div>
                                </div>

                                {/* Photo */}
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                                    <div style={{ width: 120, height: 120, borderRadius: "50%", background: "#222", border: `3px solid ${BRAND.colors.yellow}`, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {data.photo ? (
                                            <img src={data.photo} alt="Photo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        ) : (
                                            <span style={{ fontSize: 40, color: "#444" }}>👤</span>
                                        )}
                                    </div>
                                </div>

                                {/* Info */}
                                <div style={{ textAlign: "center", padding: "0 24px" }}>
                                    <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: 1 }}>{data.name.toUpperCase()}</div>
                                    <div style={{ fontSize: 13, color: BRAND.colors.yellow, fontWeight: 600, letterSpacing: 2, marginTop: 4 }}>{data.title.toUpperCase()}</div>
                                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 4, letterSpacing: 1 }}>{data.department}</div>
                                </div>

                                {/* QR Code */}
                                <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", padding: 6, background: "#fff", borderRadius: 4 }}>
                                    <QRCodeSVG value={BRAND.websiteUrl} size={50} bgColor="#fff" fgColor="#000" />
                                </div>

                                {/* Bottom bar */}
                                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: BRAND.colors.yellow }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-[340px]">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">CUSTOMIZE</span>
                        </div>
                        <div className="p-5 space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">PHOTO</label>
                                <label className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-lg py-3 cursor-pointer hover:bg-white/10 transition-colors text-sm text-white/50 font-raleway">
                                    <Upload size={16} /> {data.photo ? "Change Photo" : "Upload Photo"}
                                    <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                                </label>
                            </div>
                            {[
                                { label: "FULL NAME", key: "name" as const },
                                { label: "TITLE", key: "title" as const },
                                { label: "DEPARTMENT", key: "department" as const },
                            ].map((f) => (
                                <div key={f.key}>
                                    <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">{f.label}</label>
                                    <input type="text" value={data[f.key]} onChange={(e) => setData({ ...data, [f.key]: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
