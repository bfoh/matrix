"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { usePdfDownload } from "../usePdfDownload";
import AiWritingAssistant from "../AiWritingAssistant";
import { BRAND } from "../brandConstants";

export default function BrandedProposal({ onBack }: { onBack: () => void }) {
    const templateRef = useRef<HTMLDivElement>(null);
    const { downloadPdf, isGenerating } = usePdfDownload();

    const [data, setData] = useState({
        title: "Business Proposal",
        client: "Client Name",
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
        content: `Executive Summary

Matrix MultiTech Ltd is pleased to present this proposal for your consideration. Our team of experienced professionals is committed to delivering exceptional results that exceed your expectations.

Scope of Work

[Describe the scope of work here]

Deliverables

[List the deliverables here]

Timeline

[Describe the timeline here]

Investment

[Detail the pricing here]

We look forward to the opportunity to work with you.

Yours faithfully,

Ernest Opoku
Chief Executive Officer
Matrix MultiTech Ltd`,
    });

    const handleAiApply = (text: string) => {
        setData((prev) => ({ ...prev, content: text }));
    };

    return (
        <div className="p-6 md:p-8">
            <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-[#D9DE00] transition-colors mb-6 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold tracking-[2px] font-raleway">BRANDING HUB / MARKETING</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-bold font-montserrat tracking-wider mb-8">
                BRANDED <span className="text-[#D9DE00]">PROPOSAL</span>
            </h1>

            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1 space-y-5">
                    {/* Preview */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 flex justify-between items-center border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">PREVIEW</span>
                            <button onClick={() => downloadPdf(templateRef, { orientation: "portrait", widthInches: 8.27, heightInches: 11.69, scale: 3, filename: "matrix-proposal.pdf" })} disabled={isGenerating} className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-red-500/15 text-red-500 hover:bg-red-500/25 transition-colors disabled:opacity-50">
                                {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />} PDF
                            </button>
                        </div>
                        <div className="p-3 md:p-6 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d] overflow-auto">
                            <div className="transform scale-[0.42] sm:scale-[0.55] md:scale-[0.7] origin-top">
                                <div
                                    ref={templateRef}
                                    style={{
                                        width: 620, height: 877, background: "#0a0a0a",
                                        fontFamily: BRAND.fonts.body, position: "relative", overflow: "hidden",
                                        display: "flex", flexDirection: "column"
                                    }}
                                >
                                    {/* Animated-like background accent */}
                                    <div style={{ position: "absolute", top: -100, right: -100, width: 300, height: 300, background: `radial-gradient(circle, ${BRAND.colors.yellow}1A 0%, transparent 70%)`, borderRadius: "50%" }} />
                                    <div style={{ position: "absolute", bottom: -50, left: -50, width: 200, height: 200, background: `radial-gradient(circle, ${BRAND.colors.yellow}0F 0%, transparent 70%)`, borderRadius: "50%" }} />

                                    {/* Top accent */}
                                    <div style={{ height: 4, width: "100%", background: `linear-gradient(90deg, ${BRAND.colors.yellow}, ${BRAND.colors.yellow}33)` }} />

                                    {/* Cover content */}
                                    <div style={{ padding: "80px 60px", flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
                                        {/* Logo and Company Header */}
                                        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 60 }}>
                                            <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 60, height: 60, objectFit: "contain" }} />
                                            <div>
                                                <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 16, fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>{BRAND.companyShort}</div>
                                                <div style={{ fontSize: 10, color: BRAND.colors.yellow, fontWeight: 800, marginTop: 4, textTransform: "uppercase" }}>{BRAND.tagline}</div>
                                            </div>
                                        </div>

                                        {/* Main Title Section */}
                                        <div style={{ marginBottom: "auto" }}>
                                            <div style={{ 
                                                fontFamily: BRAND.fonts.heading, 
                                                fontSize: 44, 
                                                fontWeight: 900, 
                                                color: "#fff", 
                                                lineHeight: 1.1,
                                                maxWidth: "90%",
                                                textTransform: "uppercase"
                                            }}>
                                                {data.title}
                                            </div>
                                            <div style={{ width: 60, height: 4, background: BRAND.colors.yellow, marginTop: 28, marginBottom: 36 }} />
                                            
                                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 800, textTransform: "uppercase" }}>PREPARED FOR</div>
                                                <div style={{ fontSize: 20, color: BRAND.colors.yellow, fontWeight: 800, textTransform: "uppercase" }}>{data.client}</div>
                                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4, fontWeight: 600 }}>{data.date}</div>
                                            </div>
                                        </div>

                                        {/* Content Preview / Summary */}
                                        <div style={{
                                            fontSize: 14,
                                            color: "rgba(255,255,255,0.7)",
                                            lineHeight: 1.8,
                                            whiteSpace: "pre-wrap",
                                            maxHeight: 320,
                                            overflow: "hidden",
                                            maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                                            fontWeight: 500
                                        }}>
                                            {data.content}
                                        </div>

                                        {/* Footer */}
                                        <div style={{ marginTop: 60, borderTop: `1px solid rgba(255,255,255,0.08)`, paddingTop: 20 }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>
                                                <span style={{textTransform: "uppercase"}}>{BRAND.companyShort}</span>
                                                <span style={{textTransform: "uppercase"}}>{BRAND.websiteUrl.replace("https://", "")}</span>
                                                <span style={{textTransform: "uppercase"}}>{BRAND.gps}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden p-5 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">TITLE</label>
                                <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">CLIENT</label>
                                <input type="text" value={data.client} onChange={(e) => setData({ ...data, client: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">DATE</label>
                                <input type="text" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-[10px] font-bold tracking-[2px] text-white/30">PROPOSAL CONTENT</label>
                                <span className="text-[10px] tracking-[1px] font-bold text-[#D9DE00]">✦ AI-ENHANCED</span>
                            </div>
                            <textarea value={data.content} onChange={(e) => setData({ ...data, content: e.target.value })} rows={10} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none resize-none leading-relaxed" />
                        </div>
                        <button onClick={() => downloadPdf(templateRef, { orientation: "portrait", widthInches: 8.27, heightInches: 11.69, scale: 3, filename: "matrix-proposal.pdf" })} disabled={isGenerating} className="w-full flex items-center justify-center gap-2 bg-[#D9DE00] text-black font-bold py-3 rounded-lg text-sm tracking-wider font-montserrat hover:bg-[#e5ea2a] transition-colors disabled:opacity-50">
                            {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} DOWNLOAD PDF
                        </button>
                    </div>
                </div>

                <div className="xl:w-[380px] min-h-[400px] md:min-h-[600px]">
                    <AiWritingAssistant materialType="branded-proposal" onApply={handleAiApply} />
                </div>
            </div>
        </div>
    );
}
