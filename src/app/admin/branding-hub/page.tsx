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

type Tab = "stationery" | "digital" | "marketing";

const TABS: { key: Tab; label: string; count: number }[] = [
    { key: "stationery", label: "STATIONERY", count: MATERIALS.filter((m) => m.category === "stationery").length },
    { key: "digital", label: "DIGITAL", count: MATERIALS.filter((m) => m.category === "digital").length },
    { key: "marketing", label: "MARKETING", count: MATERIALS.filter((m) => m.category === "marketing").length },
];

const TAB_LABELS: Record<Tab, string> = {
    stationery: "STATIONERY MATERIALS",
    digital: "DIGITAL ASSETS",
    marketing: "MARKETING MATERIALS",
};

export default function BrandingHubPage() {
    const [activeTab, setActiveTab] = useState<Tab>("stationery");
    const [activeMaterial, setActiveMaterial] = useState<MaterialType | null>(null);

    const filteredMaterials = MATERIALS.filter((m) => m.category === activeTab);

    // If a material editor is open, render it instead of the grid
    if (activeMaterial) {
        switch (activeMaterial) {
            case "business-card":
                return <BusinessCard onBack={() => setActiveMaterial(null)} />;
            case "letterhead":
                return <Letterhead onBack={() => setActiveMaterial(null)} />;
            case "envelope":
                return <Envelope onBack={() => setActiveMaterial(null)} />;
            case "compliment-slip":
                return <ComplimentSlip onBack={() => setActiveMaterial(null)} />;
            case "email-signature":
                return <EmailSignature onBack={() => setActiveMaterial(null)} />;
            case "social-media-kit":
                return <SocialMediaKit onBack={() => setActiveMaterial(null)} />;
            case "watermark":
                return <WatermarkGenerator onBack={() => setActiveMaterial(null)} />;
            case "id-badge":
                return <IdBadge onBack={() => setActiveMaterial(null)} />;
            case "invoice":
                return <InvoiceEditor onBack={() => setActiveMaterial(null)} />;
            case "presentation-cover":
                return <PresentationCover onBack={() => setActiveMaterial(null)} />;
            case "property-flyer":
                return <PropertyFlyer onBack={() => setActiveMaterial(null)} />;
            case "signage-banner":
                return <SignageBanner onBack={() => setActiveMaterial(null)} />;
            case "branded-proposal":
                return <BrandedProposal onBack={() => setActiveMaterial(null)} />;
            default:
                return (
                    <div className="p-8">
                        <button
                            onClick={() => setActiveMaterial(null)}
                            className="flex items-center gap-2 text-white/40 hover:text-[#D9DE00] transition-colors mb-6"
                        >
                            <span className="text-xs font-bold tracking-[2px]">← BACK TO HUB</span>
                        </button>
                        <div className="flex items-center justify-center h-[400px] border border-white/10 rounded-xl">
                            <p className="text-white/30 font-montserrat tracking-wider">COMING SOON</p>
                        </div>
                    </div>
                );
        }
    }

    return (
        <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
            {/* Hero Header */}
            <div className="relative px-8 md:px-10 pt-10 md:pt-12 pb-10 mb-8 rounded-2xl bg-gradient-to-br from-[#D9DE00]/[0.08] via-black/90 to-[#D9DE00]/[0.04] border border-[#D9DE00]/15 overflow-hidden">
                {/* Radial glow */}
                <div className="absolute -top-[60%] -right-[20%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(217,222,0,0.06)_0%,transparent_70%)] pointer-events-none" />
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D9DE00]/40 to-transparent" />

                <div className="text-[10px] font-bold tracking-[4px] text-[#D9DE00] mb-3 flex items-center gap-2">
                    <span className="w-6 h-px bg-[#D9DE00]" />
                    MATRIX MULTITECH LTD
                </div>
                <h1 className="font-montserrat text-3xl md:text-[38px] font-extrabold tracking-[3px] text-white mb-2">
                    BRANDING <span className="text-[#D9DE00]">HUB</span>
                </h1>
                <p className="text-[15px] text-white/40 max-w-[500px] leading-relaxed font-raleway">
                    Your complete brand toolkit — generate professional materials with one click, customized to your brand identity.
                </p>

                <div className="flex gap-8 mt-7">
                    <div>
                        <div className="font-montserrat text-[28px] font-extrabold text-[#D9DE00]">
                            {MATERIALS.length}
                        </div>
                        <div className="text-[10px] tracking-[2px] text-white/25 font-semibold">MATERIALS</div>
                    </div>
                    <div>
                        <div className="font-montserrat text-[28px] font-extrabold text-[#D9DE00]">3</div>
                        <div className="text-[10px] tracking-[2px] text-white/25 font-semibold">CATEGORIES</div>
                    </div>
                    <div>
                        <div className="font-montserrat text-[28px] font-extrabold text-[#D9DE00]">∞</div>
                        <div className="text-[10px] tracking-[2px] text-white/25 font-semibold">DOWNLOADS</div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-8 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 py-3.5 px-6 text-center text-[12px] font-bold tracking-[2.5px] rounded-lg transition-all duration-300 ${
                            activeTab === tab.key
                                ? "bg-gradient-to-br from-[#D9DE00] to-[#b8bd00] text-black shadow-[0_4px_20px_rgba(217,222,0,0.25),0_0_40px_rgba(217,222,0,0.08)]"
                                : "text-white/30 hover:text-white/50"
                        }`}
                    >
                        {tab.label}
                        <span
                            className={`ml-2 text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                                activeTab === tab.key
                                    ? "bg-black/15 text-black/60"
                                    : "bg-white/10 text-white/25"
                            }`}
                        >
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] tracking-[3px] font-bold text-white/20">
                    {TAB_LABELS[activeTab]}
                </span>
                <div className="flex-1 h-px bg-white/[0.05]" />
            </div>

            {/* Material Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredMaterials.map((material) => (
                    <MaterialCard
                        key={material.id}
                        material={material}
                        onClick={() => setActiveMaterial(material.id)}
                        thumbnail={<MaterialThumbnail id={material.id} />}
                    />
                ))}
            </div>

            {/* Footer Note */}
            <div className="mt-8 px-6 py-4 rounded-xl bg-gradient-to-br from-[#D9DE00]/[0.04] to-black/50 border border-[#D9DE00]/10 flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#D9DE00]/10 flex items-center justify-center text-[14px] flex-shrink-0">
                    ✦
                </div>
                <span className="text-[12px] text-white/35 font-raleway">
                    Click any card to open the live editor — customize text, preview in real-time, then download as high-resolution PNG or print-ready PDF.
                </span>
            </div>
        </div>
    );
}

/** Mini thumbnail previews for each material card */
function MaterialThumbnail({ id }: { id: MaterialType }) {
    switch (id) {
        case "business-card":
            return (
                <div
                    style={{
                        width: 220,
                        height: 125,
                        background: "#0a0a0a",
                        border: "1px solid rgba(217,222,0,0.2)",
                        borderRadius: 6,
                        display: "flex",
                        overflow: "hidden",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            width: "40%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRight: "2px solid #D9DE00",
                            background: "linear-gradient(180deg,#0a0a0a,#060606)",
                            padding: 10,
                        }}
                    >
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 28, fontWeight: 900, color: "#D9DE00", textShadow: "0 0 20px rgba(217,222,0,0.3)" }}>M</div>
                        <div style={{ fontSize: 5, letterSpacing: 2, color: "rgba(255,255,255,0.5)", marginTop: 4, textAlign: "center", fontWeight: 600 }}>MATRIX MULTITECH</div>
                    </div>
                    <div style={{ width: "60%", padding: "14px 12px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 800, color: "#fff", letterSpacing: 1 }}>ERNEST OPOKU</div>
                        <div style={{ fontSize: 7, color: "#D9DE00", margin: "3px 0", fontWeight: 600, letterSpacing: 1 }}>CEO</div>
                        <div style={{ fontSize: 5, color: "rgba(255,255,255,0.35)", margin: "1px 0" }}>+233 26 767 1110</div>
                        <div style={{ fontSize: 5, color: "rgba(255,255,255,0.35)", margin: "1px 0" }}>info@matrixmultitech.com</div>
                    </div>
                </div>
            );
        case "letterhead":
            return (
                <div style={{ width: 120, height: 160, background: "linear-gradient(180deg,#fafaf5,#f0f0eb)", borderRadius: 3, padding: 10, position: "relative", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 10, fontWeight: 900, color: "#111" }}>M</div>
                        <div style={{ fontSize: 4, color: "#555", textAlign: "right", fontWeight: 600, letterSpacing: 1 }}>MATRIX<br />MULTITECH LTD</div>
                    </div>
                    <div style={{ height: 1.5, background: "linear-gradient(90deg,#D9DE00,rgba(217,222,0,0.3))", marginBottom: 12 }} />
                    {[85, 95, 75, 90, 60].map((w, i) => (
                        <div key={i} style={{ height: 2.5, background: "#e0e0d8", borderRadius: 1, marginBottom: 5, width: `${w}%` }} />
                    ))}
                    <div style={{ position: "absolute", bottom: 8, left: 10, right: 10 }}>
                        <div style={{ height: 1, background: "linear-gradient(90deg,#D9DE00,rgba(217,222,0,0.3))", marginBottom: 4 }} />
                        <div style={{ fontSize: 3, color: "#999", textAlign: "center" }}>Accra, Ghana • +233 26 767 1110</div>
                    </div>
                </div>
            );
        case "envelope":
            return (
                <div style={{ width: 200, height: 110, background: "linear-gradient(180deg,#fafaf5,#f0f0eb)", borderRadius: 3, padding: 14, position: "relative", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 12, fontWeight: 900, color: "#111" }}>M</div>
                        <div style={{ fontSize: 5, color: "#555", fontWeight: 600, letterSpacing: 1 }}>MATRIX MULTITECH LTD</div>
                    </div>
                    <div style={{ fontSize: 4, color: "#999", lineHeight: 1.6 }}>Matrix Headquarters<br />Accra, Ghana</div>
                    <div style={{ position: "absolute", top: 12, right: 14, width: 28, height: 32, border: "1.5px solid #ccc", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 5, color: "#ccc" }}>STAMP</div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#D9DE00,rgba(217,222,0,0.1))", borderRadius: "0 0 3px 3px" }} />
                </div>
            );
        case "compliment-slip":
            return (
                <div style={{ width: 190, height: 90, background: "linear-gradient(180deg,#fafaf5,#f0f0eb)", borderRadius: 3, padding: "10px 12px", position: "relative", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 900, color: "#111" }}>M</div>
                        <div style={{ fontSize: 3.5, color: "#555", fontWeight: 600, letterSpacing: 1 }}>MATRIX MULTITECH LTD</div>
                    </div>
                    <div style={{ height: 1.5, background: "linear-gradient(90deg,#D9DE00,rgba(217,222,0,0.2))", marginBottom: 8 }} />
                    <div style={{ fontSize: 7, color: "#888", fontStyle: "italic", fontWeight: 500 }}>With Compliments</div>
                    <div style={{ position: "absolute", bottom: 7, left: 12, right: 12, fontSize: 3, color: "#bbb", textAlign: "center" }}>+233 26 767 1110 • info@matrixmultitech.com</div>
                </div>
            );
        case "email-signature":
            return (
                <div style={{ width: 210, height: 80, background: "#fff", borderRadius: 4, padding: "10px 12px", display: "flex", gap: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                    <div style={{ borderLeft: "3px solid #D9DE00", paddingLeft: 8, display: "flex", alignItems: "center" }}>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 900, color: "#111" }}>M</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 700, color: "#111" }}>Ernest Opoku</div>
                        <div style={{ fontSize: 6, color: "#D9DE00", fontWeight: 600 }}>CEO</div>
                        <div style={{ height: 0.5, background: "#ddd", margin: "3px 0" }} />
                        <div style={{ fontSize: 4.5, color: "#999" }}>+233 26 767 1110 • info@matrixmultitech.com</div>
                    </div>
                </div>
            );
        case "social-media-kit":
            return (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#0a0a0a", border: "2px solid #D9DE00", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(217,222,0,0.15)" }}>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 22, fontWeight: 900, color: "#D9DE00" }}>M</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <div style={{ width: 100, height: 32, background: "#0a0a0a", borderRadius: 3, border: "1px solid rgba(217,222,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 5, color: "rgba(255,255,255,0.3)" }}>FB COVER</div>
                        <div style={{ width: 100, height: 20, background: "#0a0a0a", borderRadius: 3, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 5, color: "rgba(255,255,255,0.3)" }}>X HEADER</div>
                    </div>
                </div>
            );
        case "watermark":
            return (
                <div style={{ width: 140, height: 100, background: "linear-gradient(135deg,#2a4a2a,#1a3a1a)", borderRadius: 4, position: "relative", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.3 }}>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 24, fontWeight: 900, color: "#fff", transform: "rotate(-30deg)" }}>MATRIX</div>
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 20, background: "linear-gradient(transparent,rgba(0,0,0,0.6))", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4 }}>
                        <div style={{ fontSize: 5, color: "rgba(255,255,255,0.5)" }}>Watermark Overlay</div>
                    </div>
                </div>
            );
        case "id-badge":
            return (
                <div style={{ width: 90, height: 130, background: "#0a0a0a", borderRadius: 6, border: "1px solid rgba(217,222,0,0.2)", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                    <div style={{ height: 6, background: "#D9DE00" }} />
                    <div style={{ padding: "8px 6px", textAlign: "center" }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#222", margin: "4px auto 6px", border: "1px solid rgba(255,255,255,0.1)" }} />
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 6, fontWeight: 700, color: "#fff" }}>ERNEST OPOKU</div>
                        <div style={{ fontSize: 5, color: "#D9DE00", marginTop: 2 }}>CEO</div>
                        <div style={{ width: 24, height: 24, background: "#fff", margin: "6px auto 0", borderRadius: 2 }} />
                    </div>
                </div>
            );
        case "invoice":
            return (
                <div style={{ width: 120, height: 155, background: "#fafaf5", borderRadius: 3, padding: 10, position: "relative", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 900, color: "#111" }}>M</div>
                        <div style={{ fontSize: 8, fontWeight: 800, color: "#D9DE00", fontFamily: "Montserrat,sans-serif" }}>INVOICE</div>
                    </div>
                    <div style={{ height: 1, background: "#e0e0d8", marginBottom: 8 }} />
                    {[1, 2, 3].map((i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <div style={{ height: 2.5, background: "#e0e0d8", width: "60%", borderRadius: 1 }} />
                            <div style={{ height: 2.5, background: "#e0e0d8", width: "25%", borderRadius: 1 }} />
                        </div>
                    ))}
                    <div style={{ position: "absolute", bottom: 10, left: 10, right: 10 }}>
                        <div style={{ height: 1, background: "#D9DE00", marginBottom: 4 }} />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ fontSize: 5, fontWeight: 700, color: "#333" }}>TOTAL</div>
                            <div style={{ fontSize: 5, fontWeight: 700, color: "#D9DE00" }}>GH₵ 0.00</div>
                        </div>
                    </div>
                </div>
            );
        case "presentation-cover":
            return (
                <div style={{ width: 200, height: 113, background: "linear-gradient(135deg,#0a0a0a,#111)", borderRadius: 4, padding: 16, position: "relative", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 6, fontWeight: 900, color: "#D9DE00", letterSpacing: 2, marginBottom: 8 }}>MATRIX MULTITECH LTD</div>
                    <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 10, fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>Presentation Title</div>
                    <div style={{ fontSize: 5, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>Subtitle goes here</div>
                    <div style={{ position: "absolute", bottom: 0, right: 0, width: 80, height: 60, background: "linear-gradient(135deg,transparent,rgba(217,222,0,0.08))" }} />
                </div>
            );
        case "property-flyer":
            return (
                <div style={{ width: 110, height: 140, background: "#0a0a0a", borderRadius: 4, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ height: "55%", background: "linear-gradient(135deg,#2a3a2a,#1a2a2a)", position: "relative" }}>
                        <div style={{ position: "absolute", top: 4, right: 4, background: "#D9DE00", padding: "1px 4px", borderRadius: 2, fontSize: 4, fontWeight: 700, color: "#000" }}>FOR SALE</div>
                    </div>
                    <div style={{ padding: "6px 8px" }}>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 800, color: "#D9DE00" }}>GH₵ 500K</div>
                        <div style={{ fontSize: 5, color: "#fff", fontWeight: 600, marginTop: 2 }}>3 Bed Villa</div>
                        <div style={{ fontSize: 4, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Accra, Ghana</div>
                    </div>
                </div>
            );
        case "signage-banner":
            return (
                <div style={{ width: 180, height: 100, background: "#0a0a0a", borderRadius: 4, border: "3px solid #D9DE00", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                    <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 18, fontWeight: 900, color: "#D9DE00", letterSpacing: 4 }}>FOR SALE</div>
                    <div style={{ fontSize: 6, color: "rgba(255,255,255,0.5)", marginTop: 4, letterSpacing: 1 }}>MATRIX MULTITECH LTD</div>
                    <div style={{ fontSize: 7, color: "#fff", marginTop: 4, fontWeight: 600 }}>+233 26 767 1110</div>
                </div>
            );
        case "branded-proposal":
            return (
                <div style={{ width: 120, height: 155, background: "#0a0a0a", borderRadius: 4, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", border: "1px solid rgba(217,222,0,0.15)", position: "relative" }}>
                    <div style={{ height: 4, background: "#D9DE00" }} />
                    <div style={{ padding: "12px 10px", textAlign: "center" }}>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 900, color: "#D9DE00" }}>M</div>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 5, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: 1.5, marginTop: 4 }}>MATRIX MULTITECH LTD</div>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 7, fontWeight: 700, color: "#fff", marginTop: 12, lineHeight: 1.4 }}>Business Proposal</div>
                        <div style={{ fontSize: 5, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>Prepared for Client</div>
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "#D9DE00" }} />
                </div>
            );
        default:
            return null;
    }
}
