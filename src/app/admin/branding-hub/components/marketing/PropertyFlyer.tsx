"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Download, Loader2, Bed, Bath, Maximize } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useCanvasDownload } from "../useCanvasDownload";
import { usePdfDownload } from "../usePdfDownload";
import AiWritingAssistant from "../AiWritingAssistant";
import { BRAND } from "../brandConstants";
import { createClient } from "@/lib/supabase";

interface Property {
    id: number;
    title: string;
    price: number;
    status: string;
    address: string;
    image: string;
    bedrooms: number;
    bathrooms: number;
    area_sqm: number;
    description?: string[];
}

export default function PropertyFlyer({ onBack }: { onBack: () => void }) {
    const templateRef = useRef<HTMLDivElement>(null);
    const { downloadPng, isGenerating: isPng } = useCanvasDownload();
    const { downloadPdf, isGenerating: isPdf } = usePdfDownload();
    const isGenerating = isPng || isPdf;

    const [properties, setProperties] = useState<Property[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [headline, setHeadline] = useState("");
    const [tagline, setTagline] = useState("");
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        const fetchProperties = async () => {
            const { data } = await supabase.from("properties").select("*").eq("published", true);
            if (data) setProperties(data);
            setLoading(false);
        };
        fetchProperties();
    }, []);

    const property = properties.find((p) => p.id === selectedId);

    const handleAiApply = (text: string) => {
        const lines = text.split("\n").filter(Boolean);
        if (lines.length > 0) setHeadline(lines[0]);
        if (lines.length > 1) setTagline(lines.slice(1).join(" "));
    };

    return (
        <div className="p-6 md:p-8">
            <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-[#D9DE00] transition-colors mb-6 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold tracking-[2px] font-raleway">BRANDING HUB / MARKETING</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-bold font-montserrat tracking-wider mb-8">
                PROPERTY <span className="text-[#D9DE00]">FLYER</span>
            </h1>

            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1 space-y-5">
                    {/* Property Selector */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                        <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">SELECT PROPERTY</label>
                        {loading ? (
                            <div className="flex items-center gap-2 text-white/30 text-sm"><Loader2 size={14} className="animate-spin" /> Loading properties...</div>
                        ) : (
                            <select
                                value={selectedId || ""}
                                onChange={(e) => setSelectedId(Number(e.target.value) || null)}
                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none"
                            >
                                <option value="">Choose a property...</option>
                                {properties.map((p) => (
                                    <option key={p.id} value={p.id}>{p.title} — {p.status}</option>
                                ))}
                            </select>
                        )}

                        {property && (
                            <div className="mt-4 space-y-3">
                                <div>
                                    <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">CUSTOM HEADLINE</label>
                                    <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder={property.title} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none placeholder:text-white/15" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">TAGLINE</label>
                                    <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Your dream home awaits..." className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none placeholder:text-white/15" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Flyer Preview */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 flex justify-between items-center border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">FLYER PREVIEW — 1080×1350</span>
                            <div className="flex gap-2">
                                <button onClick={() => downloadPng(templateRef, "matrix-property-flyer.png", 2)} disabled={isGenerating || !property} className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-[#D9DE00]/15 text-[#D9DE00] hover:bg-[#D9DE00]/25 transition-colors disabled:opacity-50">
                                    {isPng ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />} PNG
                                </button>
                                <button onClick={() => downloadPdf(templateRef, { orientation: "portrait", widthInches: 3.6, heightInches: 4.5, scale: 3, filename: "matrix-property-flyer.pdf" })} disabled={isGenerating || !property} className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-red-500/15 text-red-500 hover:bg-red-500/25 transition-colors disabled:opacity-50">
                                    {isPdf ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />} PDF
                                </button>
                            </div>
                        </div>
                        <div className="p-6 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d] overflow-auto">
                            {property ? (
                                <div className="transform scale-[0.45] md:scale-[0.55] origin-top">
                                    <div
                                        ref={templateRef}
                                        style={{
                                            width: 1080, height: 1350, background: BRAND.colors.black,
                                            position: "relative", overflow: "hidden", fontFamily: BRAND.fonts.body,
                                        }}
                                    >
                                        {/* Hero Image */}
                                        <div style={{ position: "relative", height: "55%" }}>
                                            <img src={property.image} alt={property.title} crossOrigin="anonymous" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.9) 100%)" }} />

                                            {/* Status badge */}
                                            <div style={{ position: "absolute", top: 32, right: 32, background: BRAND.colors.yellow, color: "#000", padding: "8px 20px", borderRadius: 4, fontFamily: BRAND.fonts.heading, fontSize: 14, fontWeight: 800, letterSpacing: 2 }}>
                                                {property.status.toUpperCase()}
                                            </div>

                                            {/* Logo */}
                                            <div style={{ position: "absolute", top: 32, left: 32, display: "flex", alignItems: "center", gap: 12 }}>
                                                <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 44, height: 44, objectFit: "contain" }} />
                                                <div>
                                                    <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: 2 }}>MATRIX MULTITECH</div>
                                                    <div style={{ fontSize: 9, color: BRAND.colors.yellow, letterSpacing: 2 }}>{BRAND.tagline}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div style={{ padding: "36px 40px 0" }}>
                                            <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 40, fontWeight: 800, color: BRAND.colors.yellow, letterSpacing: 1 }}>
                                                GH₵ {property.price.toLocaleString()}
                                            </div>
                                            <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 26, fontWeight: 700, color: "#fff", marginTop: 8, letterSpacing: 1 }}>
                                                {headline || property.title}
                                            </div>
                                            {tagline && (
                                                <div style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginTop: 6, fontStyle: "italic" }}>
                                                    {tagline}
                                                </div>
                                            )}
                                            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
                                                📍 {property.address}
                                            </div>

                                            {/* Stats */}
                                            <div style={{ display: "flex", gap: 32, marginTop: 28, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                    <div style={{ fontSize: 28, fontWeight: 800, color: BRAND.colors.yellow, fontFamily: BRAND.fonts.heading }}>{property.bedrooms}</div>
                                                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>BEDROOMS</div>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                    <div style={{ fontSize: 28, fontWeight: 800, color: BRAND.colors.yellow, fontFamily: BRAND.fonts.heading }}>{property.bathrooms}</div>
                                                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>BATHROOMS</div>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                    <div style={{ fontSize: 28, fontWeight: 800, color: BRAND.colors.yellow, fontFamily: BRAND.fonts.heading }}>{property.area_sqm}</div>
                                                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>SQ. M</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom contact bar */}
                                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: BRAND.colors.yellow, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                                                <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 14, fontWeight: 800, color: "#000", letterSpacing: 1 }}>{BRAND.phone}</div>
                                                <div style={{ fontSize: 13, color: "rgba(0,0,0,0.6)" }}>{BRAND.email}</div>
                                                <div style={{ fontSize: 13, color: "rgba(0,0,0,0.6)" }}>{BRAND.website}</div>
                                            </div>
                                            <div style={{ background: "#fff", padding: 4, borderRadius: 4 }}>
                                                <QRCodeSVG value={BRAND.websiteUrl} size={52} bgColor="#fff" fgColor="#000" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-20 text-center text-white/20 text-sm">Select a property above to generate a flyer</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* AI Panel */}
                <div className="xl:w-[380px] min-h-[600px]">
                    <AiWritingAssistant materialType="property-flyer" onApply={handleAiApply} />
                </div>
            </div>
        </div>
    );
}
