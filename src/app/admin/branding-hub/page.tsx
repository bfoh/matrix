"use client";

import { useState } from "react";
import { MATERIALS, MaterialType } from "./components/brandConstants";
import MaterialCard from "./components/MaterialCard";
import BusinessCard from "./components/stationery/BusinessCard";
import Letterhead from "./components/stationery/Letterhead";
import Envelope from "./components/stationery/Envelope";
import ComplimentSlip from "./components/stationery/ComplimentSlip";
import EmailSignature from "./components/digital/EmailSignature";
import SocialMediaKit from "./components/digital/SocialMediaKit";
import WatermarkGenerator from "./components/digital/WatermarkGenerator";
import IdBadge from "./components/marketing/IdBadge";
import InvoiceEditor from "./components/marketing/InvoiceTemplate";
import PresentationCover from "./components/marketing/PresentationCover";
import PropertyFlyer from "./components/marketing/PropertyFlyer";
import SignageBanner from "./components/marketing/SignageBanner";
import BrandedProposal from "./components/marketing/BrandedProposal";
import { Sparkles, ArrowLeft, Download, Layers } from "lucide-react";

type Tab = "stationery" | "digital" | "marketing";

const TABS: { key: Tab; label: string; count: number }[] = [
    { key: "stationery", label: "STATIONERY", count: MATERIALS.filter((m) => m.category === "stationery").length },
    { key: "digital", label: "DIGITAL", count: MATERIALS.filter((m) => m.category === "digital").length },
    { key: "marketing", label: "MARKETING", count: MATERIALS.filter((m) => m.category === "marketing").length },
];

const TAB_LABELS: Record<Tab, string> = {
    stationery: "CORP. STATIONERY",
    digital: "DIGITAL PRESENCE",
    marketing: "MARKETING & SALES",
};

export default function BrandingHubPage() {
    const [activeTab, setActiveTab] = useState<Tab>("stationery");
    const [activeMaterial, setActiveMaterial] = useState<MaterialType | null>(null);

    const filteredMaterials = MATERIALS.filter((m) => m.category === activeTab);

    if (activeMaterial) {
        switch (activeMaterial) {
            case "business-card": return <BusinessCard onBack={() => setActiveMaterial(null)} />;
            case "letterhead": return <Letterhead onBack={() => setActiveMaterial(null)} />;
            case "envelope": return <Envelope onBack={() => setActiveMaterial(null)} />;
            case "compliment-slip": return <ComplimentSlip onBack={() => setActiveMaterial(null)} />;
            case "email-signature": return <EmailSignature onBack={() => setActiveMaterial(null)} />;
            case "social-media-kit": return <SocialMediaKit onBack={() => setActiveMaterial(null)} />;
            case "watermark": return <WatermarkGenerator onBack={() => setActiveMaterial(null)} />;
            case "id-badge": return <IdBadge onBack={() => setActiveMaterial(null)} />;
            case "invoice": return <InvoiceEditor onBack={() => setActiveMaterial(null)} />;
            case "presentation-cover": return <PresentationCover onBack={() => setActiveMaterial(null)} />;
            case "property-flyer": return <PropertyFlyer onBack={() => setActiveMaterial(null)} />;
            case "signage-banner": return <SignageBanner onBack={() => setActiveMaterial(null)} />;
            case "branded-proposal": return <BrandedProposal onBack={() => setActiveMaterial(null)} />;
            default:
                return (
                    <div className="p-8 max-w-[1400px] mx-auto min-h-screen bg-[#050505]">
                        <button onClick={() => setActiveMaterial(null)} className="flex items-center gap-2 text-white/40 hover:text-[#D9DE00] transition-colors mb-6 group uppercase text-xs font-bold">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Return
                        </button>
                        <div className="flex items-center justify-center h-[500px] border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-xl">
                            <div className="text-center">
                                <Sparkles className="w-8 h-8 text-[#D9DE00] mx-auto mb-4 opacity-50" />
                                <p className="text-white/40 font-montserrat font-semibold tracking-widest text-sm uppercase">Engine Initializing</p>
                            </div>
                        </div>
                    </div>
                );
        }
    }

    return (
        <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-screen bg-[#020202]">
            {/* Hero Section */}
            <div className="relative px-6 md:px-12 pt-12 md:pt-16 pb-10 md:pb-14 mb-8 md:mb-12 rounded-3xl bg-[#080808] border border-white/[0.04] overflow-hidden shadow-2xl">
                {/* Tech Grid Background */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                
                {/* Glowing Core */}
                <div className="absolute -top-[40%] -right-[10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(217,222,0,0.12)_0%,transparent_60%)] pointer-events-none mix-blend-screen" />
                <div className="absolute bottom-0 left-[20%] w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_bottom,rgba(217,222,0,0.08)_0%,transparent_70%)] pointer-events-none mix-blend-screen" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#D9DE00]/10 border border-[#D9DE00]/20 mb-6">
                            <div className="w-2 h-2 rounded-full bg-[#D9DE00] animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#D9DE00]">Matrix MultiTech Hub</span>
                        </div>
                        <h1 className="font-montserrat text-4xl md:text-6xl font-black text-white mb-4 leading-tight uppercase relative">
                            Brand <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9DE00] to-[#E5EA00]">Engine</span>
                        </h1>
                        <p className="text-[15px] md:text-lg text-white/40 leading-relaxed font-raleway font-medium max-w-xl">
                            Enterprise-grade asset generation for Telecom and Real Estate infrastructure. Select a template below to deploy localized materials.
                        </p>
                    </div>

                    {/* Stats Matrix */}
                    <div className="flex gap-4 md:gap-8 backdrop-blur-md bg-black/40 p-6 rounded-2xl border border-white/[0.05]">
                        <div>
                            <div className="font-montserrat text-3xl md:text-4xl font-black text-white mb-1 shadow-[#D9DE00]/20 drop-shadow-lg">{MATERIALS.length}</div>
                            <div className="text-[10px] font-bold uppercase tracking-[2px] text-[#D9DE00]">Assets</div>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div>
                            <div className="font-montserrat text-3xl md:text-4xl font-black text-white mb-1">HQ</div>
                            <div className="text-[10px] font-bold uppercase tracking-[2px] text-[#D9DE00]">Resolution</div>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div>
                            <div className="font-montserrat text-3xl md:text-4xl font-black text-white mb-1">0.1s</div>
                            <div className="text-[10px] font-bold uppercase tracking-[2px] text-[#D9DE00]">Render</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-8 bg-[#0a0a0a] border border-white/[0.04] p-1.5 rounded-2xl w-full max-w-2xl">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 py-3.5 px-4 text-center text-xs font-bold uppercase transition-all duration-500 rounded-xl flex items-center justify-center gap-2 ${
                            activeTab === tab.key
                                ? "bg-[#D9DE00] text-black shadow-[0_0_20px_rgba(217,222,0,0.3)]"
                                : "text-white/40 hover:text-white/80 hover:bg-white/[0.02]"
                        }`}
                    >
                        {tab.key === 'stationery' && <Layers size={14} className={activeTab === tab.key ? "text-black" : "text-white/40"} />}
                        {tab.key === 'digital' && <Sparkles size={14} className={activeTab === tab.key ? "text-black" : "text-white/40"} />}
                        {tab.key === 'marketing' && <Download size={14} className={activeTab === tab.key ? "text-black" : "text-white/40"} />}
                        <span className="hidden sm:inline" style={{textTransform: 'uppercase'}}>{tab.label}</span>
                        <span
                            className={`ml-1 text-[10px] font-black px-2 py-0.5 rounded-md ${
                                activeTab === tab.key
                                    ? "bg-black/10 text-black/80"
                                    : "bg-white/5 text-white/30"
                            }`}
                        >
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Section Header */}
            <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-black uppercase text-white/20">
                    {TAB_LABELS[activeTab]}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-white/[0.05] to-transparent" />
            </div>

            {/* Assets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMaterials.map((material) => (
                    <MaterialCard
                        key={material.id}
                        material={material}
                        onClick={() => setActiveMaterial(material.id)}
                        thumbnail={<MaterialThumbnail id={material.id} />}
                    />
                ))}
            </div>
            
            {/* Context Footer */}
            <div className="mt-12 flex justify-center pb-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#D9DE00]/[0.03] border border-[#D9DE00]/10 text-center">
                    <div className="w-6 h-6 rounded-full bg-[#D9DE00]/10 flex items-center justify-center animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-[#D9DE00]" />
                    </div>
                    <span className="text-xs font-medium text-white/30 uppercase">Secure Connection • Matrix Datacenter</span>
                </div>
            </div>
        </div>
    );
}

/** Mini thumbnail previews for each material card */
function MaterialThumbnail({ id }: { id: MaterialType }) {
    // Redesigned without letterSpacing for rendering stability & modern look
    switch (id) {
        case "business-card":
            return (
                <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ width: 110, height: 60, background: "#050505", borderRadius: 4, position: "relative", display: "flex", border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
                        <div style={{ width: 4, height: "100%", background: "#D9DE00" }} />
                        <div style={{ padding: "8px", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                            <div>
                                <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 800, color: "#fff", textTransform: "uppercase" }}>ERNEST OPOKU</div>
                                <div style={{ fontSize: 5, color: "#D9DE00", fontWeight: 700, marginTop: 2, textTransform: "uppercase" }}>CEO / FOUNDER</div>
                            </div>
                            <div style={{ fontSize: 4, color: "rgba(255,255,255,0.4)" }}>+233 26 767 1110</div>
                        </div>
                        <div style={{ width: 30, background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "center", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
                            <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 14, fontWeight: 900, color: "#D9DE00" }}>M</div>
                        </div>
                    </div>
                    <div style={{ width: 110, height: 60, background: "#050505", borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle, rgba(217,222,0,0.1) 0%, transparent 60%)" }} />
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 18, fontWeight: 900, color: "#fff" }}>M</div>
                        <div style={{ fontSize: 4, color: "#D9DE00", fontWeight: 700, marginTop: 4, textTransform: "uppercase" }}>MATRIX MULTITECH</div>
                    </div>
                </div>
            );
        case "letterhead":
            return (
                <div style={{ width: 130, height: 180, background: "#FFFFFF", borderRadius: 2, position: "relative", border: "1px solid rgba(255,255,255,0.1)", padding: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div style={{ width: 16, height: 16, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2 }}>
                            <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 10, fontWeight: 900, color: "#D9DE00" }}>M</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 5, fontWeight: 800, color: "#000", textTransform: "uppercase" }}>MATRIX MULTITECH</div>
                            <div style={{ fontSize: 3.5, color: "#666", marginTop: 2 }}>TELECOM & REAL ESTATE</div>
                        </div>
                    </div>
                    {[80, 100, 90, 85, 40].map((w, i) => (
                        <div key={i} style={{ height: 3, background: "#F0F0F0", marginBottom: 6, width: `${w}%`, borderRadius: 1 }} />
                    ))}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 18, background: "#0A0A0A", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ width: "30%", height: 1.5, background: "#D9DE00", marginBottom: 3 }} />
                        <div style={{ fontSize: 3, color: "rgba(255,255,255,0.5)" }}>ACCRA, GHANA • INFO@MATRIXMULTITECH.COM</div>
                    </div>
                </div>
            );
        case "envelope":
            return (
                <div style={{ width: 220, height: 110, background: "#FFFFFF", borderRadius: 2, border: "1px solid rgba(255,255,255,0.1)", padding: 14, position: "relative" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                        <div style={{ width: 20, height: 20, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2 }}>
                            <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 12, fontWeight: 900, color: "#D9DE00" }}>M</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 6, fontWeight: 800, color: "#000", textTransform: "uppercase" }}>MATRIX MULTITECH LTD</div>
                            <div style={{ fontSize: 4, color: "#666", marginTop: 2, textTransform: "uppercase" }}>HEADQUARTERS, ACCRA GHANA</div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: 14, left: "40%" }}>
                        <div style={{ width: 60, height: 3, background: "#E0E0E0", marginBottom: 3 }} />
                        <div style={{ width: 80, height: 3, background: "#E0E0E0", marginBottom: 3 }} />
                        <div style={{ width: 50, height: 3, background: "#E0E0E0" }} />
                    </div>
                    <div style={{ position: "absolute", top: 14, right: 14, width: 24, height: 28, border: "1px dashed #CCC", display: "flex", alignItems: "center", justifyContent: "center", color: "#CCC", fontSize: 4 }}>
                        STAMP 
                    </div>
                </div>
            );
        case "compliment-slip":
            return (
                <div style={{ width: 210, height: 95, background: "#FFFFFF", borderRadius: 2, padding: "16px", position: "relative", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                         <div style={{ width: 14, height: 14, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2 }}>
                            <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 900, color: "#D9DE00" }}>M</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 5, fontWeight: 800, color: "#000", textTransform: "uppercase" }}>MATRIX MULTITECH</div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", width: "100%", left: 0, textAlign: "center" }}>
                        <div style={{ fontSize: 10, fontFamily: "Georgia, serif", fontStyle: "italic", color: "#000" }}>With Compliments</div>
                        <div style={{ width: 30, height: 1, background: "#D9DE00", margin: "6px auto 0" }} />
                    </div>
                </div>
            );
        case "email-signature":
            return (
                <div style={{ width: 230, height: 85, background: "#0A0A0A", borderRadius: 6, padding: "12px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #D9DE00", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 20, fontWeight: 900, color: "#fff" }}>M</div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: "#FFF", textTransform: "uppercase" }}>ERNEST OPOKU</div>
                        <div style={{ fontSize: 6, color: "#D9DE00", fontWeight: 700, marginTop: 2, textTransform: "uppercase" }}>CHIEF EXECUTIVE OFFICER</div>
                        <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "6px 0" }} />
                        <div style={{ fontSize: 5, color: "rgba(255,255,255,0.5)" }}>INFO@MATRIXMULTITECH.COM</div>
                    </div>
                </div>
            );
        case "social-media-kit":
            return (
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 70, height: 70, borderRadius: "50%", background: "#050505", border: "3px solid #D9DE00", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(217,222,0,0.2)" }}>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 28, fontWeight: 900, color: "#FFF" }}>M</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <div style={{ width: 110, height: 40, background: "linear-gradient(135deg, #0A0A0A, #111)", borderRadius: 4, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 6, color: "#FFF", textTransform: "uppercase", fontWeight: 700 }}>COVER IMAGE</div>
                        <div style={{ width: 110, height: 24, background: "linear-gradient(135deg, #0A0A0A, #111)", borderRadius: 4, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 5, color: "#D9DE00", textTransform: "uppercase", fontWeight: 700 }}>STORY TEMPLATE</div>
                    </div>
                </div>
            );
        case "watermark":
            return (
                <div style={{ width: 160, height: 100, background: "#111", borderRadius: 4, overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,0.1)" }}>
                     <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%, #222), linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%, #222)", backgroundPosition: "0 0, 10px 10px", backgroundSize: "20px 20px" }} />
                     <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.8 }}>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 28, fontWeight: 900, color: "#FFF", textTransform: "uppercase" }}>MATRIX</div>
                     </div>
                </div>
            );
        case "id-badge":
            return (
                <div style={{ width: 100, height: 160, background: "#050505", borderRadius: 8, border: "1px solid #000", overflow: "hidden", position: "relative" }}>
                    <div style={{ height: 12, background: "#D9DE00", display: "flex", justifyContent: "center" }}>
                        <div style={{ width: 30, height: 6, background: "#050505", borderRadius: "0 0 4px 4px" }} />
                    </div>
                    <div style={{ padding: "16px 10px", textAlign: "center" }}>
                        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#1A1A1A", margin: "0 auto 10px", border: "2px solid rgba(255,255,255,0.1)" }} />
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 800, color: "#FFF", textTransform: "uppercase" }}>ERNEST OPOKU</div>
                        <div style={{ fontSize: 5, color: "#D9DE00", fontWeight: 700, marginTop: 4, textTransform: "uppercase" }}>CHIEF EXECUTIVE</div>
                        <div style={{ width: 30, height: 30, background: "#FFF", margin: "16px auto 0", borderRadius: 2 }} />
                    </div>
                </div>
            );
        case "invoice":
            return (
                <div style={{ width: 130, height: 180, background: "#FFFFFF", borderRadius: 2, padding: 12, position: "relative", border: "1px solid rgba(255,255,255,0.1)" }}>
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div style={{ width: 14, height: 14, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2 }}>
                            <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 900, color: "#D9DE00" }}>M</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 9, fontWeight: 900, color: "#000", textTransform: "uppercase" }}>INVOICE</div>
                            <div style={{ fontSize: 4, color: "#D9DE00", fontWeight: 800 }}>#INV-2026</div>
                        </div>
                    </div>
                    <div style={{ height: 2, background: "#000", marginBottom: 10 }} />
                    {[1, 2, 3].map((i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                            <div style={{ height: 3, background: "#F0F0F0", width: "60%" }} />
                            <div style={{ height: 3, background: "#F0F0F0", width: "20%" }} />
                        </div>
                    ))}
                    <div style={{ position: "absolute", bottom: 12, left: 12, right: 12 }}>
                        <div style={{ height: 1.5, background: "#D9DE00", marginBottom: 6 }} />
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                            <div style={{ fontSize: 5, fontWeight: 800, color: "#000", textTransform: "uppercase" }}>TOTAL DUE</div>
                            <div style={{ fontSize: 8, fontWeight: 900, color: "#000" }}>GHS 0.00</div>
                        </div>
                    </div>
                </div>
            );
        case "presentation-cover":
            return (
                <div style={{ width: 220, height: 124, background: "#050505", borderRadius: 4, padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ position: "absolute", right: -40, top: -40, width: 120, height: 120, border: "20px solid rgba(217,222,0,0.1)", borderRadius: "50%" }} />
                    <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 5, fontWeight: 800, color: "#D9DE00", textTransform: "uppercase", marginBottom: 8 }}>MATRIX MULTITECH LTD</div>
                    <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 14, fontWeight: 900, color: "#FFF", lineHeight: 1.2, textTransform: "uppercase", width: "80%" }}>ENTERPRISE SOLUTION PROPOSAL</div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, width: "30%", height: 4, background: "#D9DE00" }} />
                </div>
            );
        case "property-flyer":
            return (
                <div style={{ width: 130, height: 180, background: "#050505", borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ height: "55%", background: "#1A1A1A", position: "relative" }}>
                        <div style={{ position: "absolute", top: 8, right: 8, background: "#D9DE00", padding: "4px 8px", fontSize: 6, fontWeight: 900, color: "#000", textTransform: "uppercase" }}>FOR SALE</div>
                        <div style={{ position: "absolute", bottom: 8, left: 8, fontSize: 12, fontWeight: 900, color: "#FFF", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>GHS 500K</div>
                    </div>
                    <div style={{ padding: "12px 10px" }}>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 900, color: "#FFF", textTransform: "uppercase", lineHeight: 1.2 }}>LUXURY VILLA</div>
                        <div style={{ fontSize: 5, color: "#D9DE00", fontWeight: 700, marginTop: 4, textTransform: "uppercase" }}>ACCRA, GHANA</div>
                        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                            <div style={{ width: 16, height: 16, background: "rgba(255,255,255,0.05)", borderRadius: 2 }} />
                            <div style={{ width: 16, height: 16, background: "rgba(255,255,255,0.05)", borderRadius: 2 }} />
                            <div style={{ width: 16, height: 16, background: "rgba(255,255,255,0.05)", borderRadius: 2 }} />
                        </div>
                    </div>
                </div>
            );
        case "signage-banner":
             return (
                <div style={{ width: 200, height: 100, background: "#0A0A0A", borderRadius: 4, border: "4px solid #D9DE00", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "#D9DE00", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ fontSize: 8, fontWeight: 900, color: "#000" }}>+233 26 767 1110</div>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: "10%" }}>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 28, fontWeight: 900, color: "#FFF", textTransform: "uppercase", lineHeight: 1 }}>FOR SALE</div>
                        <div style={{ fontSize: 6, color: "rgba(255,255,255,0.5)", marginTop: 2, fontWeight: 800, textTransform: "uppercase" }}>MATRIX MULTITECH LTD</div>
                    </div>
                </div>
            );
        case "branded-proposal":
             return (
                <div style={{ width: 130, height: 180, background: "#050505", borderRadius: 4, border: "1px solid rgba(255,255,255,0.1)", position: "relative", overflow: "hidden" }}>
                    <div style={{ width: 6, height: "100%", background: "#D9DE00", position: "absolute", left: 0, top: 0 }} />
                    <div style={{ padding: "30px 16px 16px 20px" }}>
                        <div style={{ width: 24, height: 24, background: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2, marginBottom: 20 }}>
                            <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 900, color: "#000" }}>M</div>
                        </div>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 12, fontWeight: 900, color: "#FFF", textTransform: "uppercase", lineHeight: 1.2 }}>PROJECT <br/>PROPOSAL</div>
                        <div style={{ position: "absolute", bottom: 16, left: 20 }}>
                            <div style={{ fontSize: 5, color: "#D9DE00", fontWeight: 800, textTransform: "uppercase" }}>PREPARED BY</div>
                            <div style={{ fontSize: 6, color: "#FFF", fontWeight: 700, marginTop: 2 }}>MATRIX MULTITECH</div>
                        </div>
                    </div>
                </div>
            );
        default: break;
    }
    return null;
}
