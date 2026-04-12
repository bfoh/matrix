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
                            <button onClick={() => downloadPdf(templateRef, { orientation: "portrait", widthInches: 8.27, heightInches: 11.69, scale: 4, filename: "matrix-proposal.pdf" })} disabled={isGenerating} className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-red-500/15 text-red-500 hover:bg-red-500/25 transition-colors disabled:opacity-50">
                                {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />} PDF
                            </button>
                        </div>
                        <div className="p-6 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d] overflow-auto">
                            <div className="transform scale-[0.6] md:scale-[0.7] origin-top">
                                <div
                                    ref={templateRef}
                                    style={{
                                        width: 620, height: 877, background: BRAND.colors.black,
                                        fontFamily: BRAND.fonts.body, position: "relative", overflow: "hidden",
                                    }}
                                >
                                    {/* Top accent */}
                                    <div style={{ height: 6, background: BRAND.colors.yellow }} />

                                    {/* Cover content */}
                                    <div style={{ padding: "60px 50px", display: "flex", flexDirection: "column", height: "calc(100% - 6px)" }}>
                                        {/* Logo */}
                                        <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 70, height: 70, objectFit: "contain", marginBottom: 16 }} />

                                        <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: 3 }}>
                                            MATRIX MULTITECH LTD
                                        </div>
                                        <div style={{ fontSize: 8, color: BRAND.colors.yellow, letterSpacing: 2, marginTop: 4 }}>
                                            {BRAND.tagline}
                                        </div>

                                        {/* Title */}
                                        <div style={{ marginTop: 50 }}>
                                            <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: 1, lineHeight: 1.3 }}>
                                                {data.title}
                                            </div>
                                            <div style={{ width: 60, height: 3, background: BRAND.colors.yellow, marginTop: 16, marginBottom: 16 }} />
                                            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
                                                Prepared for: <span style={{ color: BRAND.colors.yellow, fontWeight: 600 }}>{data.client}</span>
                                            </div>
                                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 8 }}>
                                                {data.date}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div style={{
                                            marginTop: 40,
                                            fontSize: 10,
                                            color: "rgba(255,255,255,0.6)",
                                            lineHeight: 1.9,
                                            whiteSpace: "pre-wrap",
                                            flex: 1,
                                            overflow: "hidden",
                                        }}>
                                            {data.content}
                                        </div>

                                        {/* Footer */}
                                        <div style={{ borderTop: `1px solid rgba(217,222,0,0.2)`, paddingTop: 12, marginTop: 20 }}>
                                            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.25)", textAlign: "center", letterSpacing: 0.5 }}>
                                                {BRAND.location} • {BRAND.phone} • {BRAND.email} • {BRAND.website}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom accent */}
                                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: BRAND.colors.yellow }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden p-5 space-y-4">
                        <div className="grid grid-cols-3 gap-3">
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
                        <button onClick={() => downloadPdf(templateRef, { orientation: "portrait", widthInches: 8.27, heightInches: 11.69, scale: 4, filename: "matrix-proposal.pdf" })} disabled={isGenerating} className="w-full flex items-center justify-center gap-2 bg-[#D9DE00] text-black font-bold py-3 rounded-lg text-sm tracking-wider font-montserrat hover:bg-[#e5ea2a] transition-colors disabled:opacity-50">
                            {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} DOWNLOAD PDF
                        </button>
                    </div>
                </div>

                <div className="xl:w-[380px] min-h-[600px]">
                    <AiWritingAssistant materialType="branded-proposal" onApply={handleAiApply} />
                </div>
            </div>
        </div>
    );
}
