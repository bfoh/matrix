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

const PropertyStat = ({ val, label }: { val: number | string, label: string }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 36, fontWeight: 900, color: BRAND.colors.yellow, fontFamily: BRAND.fonts.heading, minWidth: 60 }}>{val}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 800, textTransform: "uppercase" }}>{label}</div>
    </div>
);

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
                        <div className="px-4 md:px-5 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">FLYER PREVIEW</span>
                            <div className="flex gap-2">
                                <button onClick={() => downloadPng(templateRef, "matrix-property-flyer.png", 2)} disabled={isGenerating || !property} className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-[#D9DE00]/15 text-[#D9DE00] hover:bg-[#D9DE00]/25 transition-colors disabled:opacity-50">
                                    {isPng ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />} PNG
                                </button>
                                <button onClick={() => downloadPdf(templateRef, { orientation: "portrait", widthInches: 3.6, heightInches: 4.5, scale: 3, filename: "matrix-property-flyer.pdf" })} disabled={isGenerating || !property} className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-red-500/15 text-red-500 hover:bg-red-500/25 transition-colors disabled:opacity-50">
                                    {isPdf ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />} PDF
                                </button>
                            </div>
                        </div>
                        <div className="p-3 md:p-6 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d] overflow-auto">
                            {property ? (
                                <div className="transform scale-[0.28] sm:scale-[0.38] md:scale-[0.55] origin-top">
                                    <div
                                        ref={templateRef}
                                        style={{
                                            width: 1080, height: 1350, background: "#0a0a0a",
                                            position: "relative", overflow: "hidden", fontFamily: BRAND.fonts.body,
                                        }}
                                    >
                                        {/* Hero Image Section */}
                                        <div style={{ position: "relative", height: "60%" }}>
                                            <img src={property.image} alt={property.title} crossOrigin="anonymous" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                            
                                            {/* Top Overlays */}
                                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 25%, transparent 75%, #0a0a0a 100%)" }} />
                                            
                                            {/* Status Badge */}
                                            <div style={{ 
                                                position: "absolute", 
                                                top: 40, 
                                                right: 40, 
                                                background: BRAND.colors.yellow, 
                                                color: "#000", 
                                                padding: "16px 36px", 
                                                borderRadius: 6, 
                                                fontFamily: BRAND.fonts.heading, 
                                                fontSize: 18, 
                                                fontWeight: 900, 
                                                boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                                            }}>
                                                {property.status.toUpperCase()}
                                            </div>

                                            {/* Logo Header */}
                                            <div style={{ position: "absolute", top: 40, left: 40, display: "flex", alignItems: "center", gap: 16 }}>
                                                <div style={{ background: "#fff", width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
                                                    <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 36, height: 36, objectFit: "contain" }} />
                                                </div>
                                                <div>
                                                    <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 16, fontWeight: 800, color: "#fff", textTransform: "uppercase" }}>{BRAND.companyShort}</div>
                                                    <div style={{ fontSize: 10, color: BRAND.colors.yellow, fontWeight: 700, textTransform: "uppercase" }}>{BRAND.tagline}</div>
                                                </div>
                                            </div>

                                            {/* Price Overlay */}
                                            <div style={{ position: "absolute", bottom: 40, left: 40 }}>
                                                <div style={{ 
                                                    background: BRAND.colors.yellow, 
                                                    color: "#000", 
                                                    display: "inline-block", 
                                                    padding: "12px 32px", 
                                                    fontFamily: BRAND.fonts.heading, 
                                                    fontSize: 48, 
                                                    fontWeight: 900, 
                                                    boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
                                                }}>
                                                    GH₵ {property.price.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Property Details Section */}
                                        <div style={{ padding: "50px 60px" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40 }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 36, fontWeight: 900, color: "#fff", lineHeight: 1.1, textTransform: "uppercase" }}>
                                                        {headline || property.title}
                                                    </div>
                                                    <div style={{ fontSize: 18, color: "rgba(255,255,255,0.4)", marginTop: 12, display: "flex", alignItems: "center", gap: 8, fontWeight: 500 }}>
                                                        <span style={{ color: BRAND.colors.yellow }}>📍</span> {property.address.toUpperCase()}
                                                    </div>
                                                    {tagline && (
                                                        <div style={{ fontSize: 16, color: BRAND.colors.yellow, marginTop: 16, fontWeight: 600, fontStyle: "italic", opacity: 0.8 }}>
                                                            "{tagline}"
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Stats Column */}
                                                <div style={{ display: "flex", flexDirection: "column", gap: 24, borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: 40 }}>
                                                    <PropertyStat val={property.bedrooms} label="BEDROOMS" />
                                                    <PropertyStat val={property.bathrooms} label="BATHROOMS" />
                                                    <PropertyStat val={property.area_sqm} label="SQ. METERS" />
                                                </div>
                                            </div>

                                            {/* Description Placeholder */}
                                            <div style={{ marginTop: 40, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: "70%" }}>
                                                Experience unparalleled luxury in this meticulously designed property. Located in one of the most sought-after neighborhoods, this residence offers the perfect blend of modern sophistication and timeless elegance.
                                            </div>
                                        </div>

                                        {/* Footer Contact Bar */}
                                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "#111", borderTop: `1px solid ${BRAND.colors.yellow}33`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 60px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
                                                <div>
                                                    <div style={{ fontSize: 12, color: BRAND.colors.yellow, fontWeight: 800, marginBottom: 4 }}>CONTACT AGENT</div>
                                                    <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 24, fontWeight: 800, color: "#fff" }}>{BRAND.phone}</div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 800, marginBottom: 4 }}>EMAIL</div>
                                                    <div style={{ fontSize: 16, color: "#fff", fontWeight: 600 }}>{BRAND.email.toUpperCase()}</div>
                                                </div>
                                            </div>
                                            
                                            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                                                <div style={{ textAlign: "right" }}>
                                                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 800, marginBottom: 4 }}>WEBSITE</div>
                                                    <div style={{ fontSize: 16, color: BRAND.colors.yellow, fontWeight: 700 }}>{BRAND.website.toUpperCase()}</div>
                                                </div>
                                                <div style={{ background: "#fff", padding: 6, borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }}>
                                                    <QRCodeSVG value={BRAND.websiteUrl} size={52} bgColor="#fff" fgColor="#000" />
                                                </div>
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
                <div className="xl:w-[380px] min-h-[400px] md:min-h-[600px]">
                    <AiWritingAssistant materialType="property-flyer" onApply={handleAiApply} />
                </div>
            </div>
        </div>
    );
}
