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
                        <div className="p-4 md:p-8 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]">
                            <div
                                ref={templateRef}
                                style={{
                                    width: 320,
                                    height: 506,
                                    background: "#050505",
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    position: "relative",
                                    fontFamily: BRAND.fonts.body,
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
                                }}
                            >
                                {/* Yellow top bar accent */}
                                <div style={{ height: 60, background: BRAND.colors.yellow, position: "relative", overflow: "hidden" }}>
                                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 100%)" }} />
                                </div>

                                {/* Logo Section - overlapping the yellow bar */}
                                <div style={{ position: "absolute", top: 20, left: 0, right: 0, textAlign: "center", zIndex: 10 }}>
                                    <div style={{ background: "#fff", width: 70, height: 70, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
                                        <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 44, height: 44, objectFit: "contain" }} />
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div style={{ padding: "50px 24px 24px", textAlign: "center" }}>
                                    <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 9, fontWeight: 900, color: BRAND.colors.yellow, letterSpacing: 2, marginBottom: 20 }}>{BRAND.companyShort}</div>

                                    {/* Photo Section */}
                                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                                        <div style={{ width: 140, height: 140, borderRadius: 12, background: "#111", border: `2px solid ${BRAND.colors.yellow}`, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>
                                            {data.photo ? (
                                                <img src={data.photo} alt="Photo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                            ) : (
                                                <span style={{ fontSize: 60, color: "#222" }}>👤</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Employee Info */}
                                    <div style={{ marginBottom: 32 }}>
                                        <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: 0.5 }}>{data.name.toUpperCase()}</div>
                                        <div style={{ fontSize: 13, color: BRAND.colors.yellow, fontWeight: 700, letterSpacing: 2, marginTop: 6, textTransform: "uppercase" }}>{data.title}</div>
                                        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 8, letterSpacing: 1.5, fontWeight: 600 }}>DEPT: {data.department.toUpperCase()}</div>
                                    </div>

                                    {/* QR Code Section */}
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                                        <div style={{ padding: 6, background: "#fff", borderRadius: 8, boxShadow: "0 4px 10px rgba(0,0,0,0.5)" }}>
                                            <QRCodeSVG value={BRAND.websiteUrl} size={60} bgColor="#fff" fgColor="#000" />
                                        </div>
                                        <div style={{ fontSize: 7, color: "rgba(255,255,255,0.2)", letterSpacing: 1, fontWeight: 600 }}>OFFICIAL IDENTITY CARD</div>
                                    </div>
                                </div>

                                {/* Bottom corner detail */}
                                <div style={{ position: "absolute", bottom: -20, right: -20, width: 60, height: 60, background: BRAND.colors.yellow, borderRadius: "50%", opacity: 0.2 }} />
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
