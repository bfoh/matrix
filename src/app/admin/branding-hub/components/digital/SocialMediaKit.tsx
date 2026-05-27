"use client";

import { useRef } from "react";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { useCanvasDownload } from "../useCanvasDownload";
import { BRAND } from "../brandConstants";

const SIZES = [
    { id: "profile", label: "Profile Picture", w: 400, h: 400, desc: "400×400 — All platforms" },
    { id: "fb-cover", label: "Facebook Cover", w: 820, h: 312, desc: "820×312 — Facebook page" },
    { id: "x-header", label: "X / Twitter Header", w: 1500, h: 500, desc: "1500×500 — X profile" },
    { id: "ig-story", label: "Instagram Story", w: 1080, h: 1920, desc: "1080×1920 — IG Stories" },
] as const;

export default function SocialMediaKit({ onBack }: { onBack: () => void }) {
    const profileRef = useRef<HTMLDivElement>(null);
    const fbRef = useRef<HTMLDivElement>(null);
    const xRef = useRef<HTMLDivElement>(null);
    const igRef = useRef<HTMLDivElement>(null);
    const { downloadPng, isGenerating } = useCanvasDownload();

    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
        profile: profileRef, "fb-cover": fbRef, "x-header": xRef, "ig-story": igRef,
    };

    const handleDownload = (id: string, label: string) => {
        const ref = refs[id];
        if (ref) downloadPng(ref, `matrix-${id}.png`, 2);
    };

    return (
        <div className="p-6 md:p-8">
            <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-[#D9DE00] transition-colors mb-6 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold tracking-[2px] font-raleway">BRANDING HUB / DIGITAL</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-bold font-montserrat tracking-wider mb-8">
                SOCIAL MEDIA <span className="text-[#D9DE00]">KIT</span>
            </h1>

            <div className="space-y-8">
                {/* Profile Picture */}
                <SocialItem label="Profile Picture" desc="400×400 — All platforms" onDownload={() => handleDownload("profile", "Profile")} isGenerating={isGenerating}>
                    <div ref={profileRef} style={{ width: 400, height: 400, background: BRAND.colors.black, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(217,222,0,0.08) 0%, transparent 70%)" }} />
                        <div style={{ width: 220, height: 220, borderRadius: "50%", border: `4px solid ${BRAND.colors.yellow}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 60px rgba(217,222,0,0.15)" }}>
                            <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 140, height: 140, objectFit: "contain" }} />
                        </div>
                        <div style={{ position: "absolute", bottom: 30, fontFamily: BRAND.fonts.heading, fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 800, textTransform: "uppercase" }}>
                            {BRAND.tagline}
                        </div>
                    </div>
                </SocialItem>

                {/* Facebook Cover */}
                <SocialItem label="Facebook Cover" desc="820×312 — Facebook page" onDownload={() => handleDownload("fb-cover", "FB Cover")} isGenerating={isGenerating}>
                    <div ref={fbRef} style={{ width: 820, height: 312, background: BRAND.colors.black, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: BRAND.colors.yellow }} />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(217,222,0,0.06) 0%, transparent 50%)" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
                            <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 100, height: 100, objectFit: "contain" }} />
                            <div>
                                <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 32, fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>MATRIX MULTI-TECH LTD.</div>
                                <div style={{ fontFamily: BRAND.fonts.body, fontSize: 16, color: BRAND.colors.yellow, fontWeight: 800, marginTop: 8, textTransform: "uppercase" }}>{BRAND.tagline}</div>
                                <div style={{ fontFamily: BRAND.fonts.body, fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 12, fontWeight: 600 }}>{BRAND.website.toUpperCase()} &nbsp;&nbsp;|&nbsp;&nbsp; {BRAND.phone}</div>
                            </div>
                        </div>
                    </div>
                </SocialItem>

                {/* X Header */}
                <SocialItem label="X / Twitter Header" desc="1500×500 — X profile" onDownload={() => handleDownload("x-header", "X Header")} isGenerating={isGenerating}>
                    <div ref={xRef} style={{ width: 1500, height: 500, background: BRAND.colors.black, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(217,222,0,0.04) 0%, transparent 40%, rgba(217,222,0,0.04) 100%)" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
                            <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 120, height: 120, objectFit: "contain" }} />
                            <div>
                                <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 48, fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>MATRIX MULTI-TECH</div>
                                <div style={{ fontFamily: BRAND.fonts.body, fontSize: 24, color: BRAND.colors.yellow, fontWeight: 800, marginTop: 12, textTransform: "uppercase" }}>{BRAND.tagline}</div>
                            </div>
                        </div>
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, transparent, ${BRAND.colors.yellow}, transparent)` }} />
                    </div>
                </SocialItem>

                {/* Instagram Story */}
                <SocialItem label="Instagram Story" desc="1080×1920 — IG Stories" onDownload={() => handleDownload("ig-story", "IG Story")} isGenerating={isGenerating}>
                    <div ref={igRef} style={{ width: 1080, height: 1920, background: BRAND.colors.black, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(217,222,0,0.06) 0%, transparent 60%)" }} />
                        <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 220, height: 220, objectFit: "contain", marginBottom: 50 }} />
                        <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 56, fontWeight: 900, color: "#fff", textAlign: "center", textTransform: "uppercase", lineHeight: 1.1 }}>MATRIX<br />MULTI-TECH LTD.</div>
                        <div style={{ fontFamily: BRAND.fonts.body, fontSize: 24, color: BRAND.colors.yellow, fontWeight: 800, marginTop: 20, textTransform: "uppercase" }}>{BRAND.tagline}</div>
                        <div style={{ fontFamily: BRAND.fonts.body, fontSize: 18, color: "rgba(255,255,255,0.4)", marginTop: 50, fontWeight: 700, textTransform: "uppercase" }}>{BRAND.website}</div>
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 8, background: BRAND.colors.yellow }} />
                    </div>
                </SocialItem>
            </div>
        </div>
    );
}

function SocialItem({ label, desc, children, onDownload, isGenerating }: {
    label: string; desc: string; children: React.ReactNode; onDownload: () => void; isGenerating: boolean;
}) {
    return (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="px-4 md:px-5 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-white/[0.06]">
                <div>
                    <span className="text-[12px] md:text-[13px] font-bold font-montserrat text-white tracking-wider">{label}</span>
                    <span className="text-[9px] md:text-[10px] text-white/25 ml-2 md:ml-3">{desc}</span>
                </div>
                <button
                    onClick={onDownload}
                    disabled={isGenerating}
                    className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-[#D9DE00]/15 text-[#D9DE00] hover:bg-[#D9DE00]/25 transition-colors disabled:opacity-50 self-start sm:self-auto"
                >
                    {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                    PNG
                </button>
            </div>
            <div className="p-3 md:p-6 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d] overflow-auto">
                <div className="transform origin-top scale-[0.22] sm:scale-[0.3] md:scale-[0.4]">
                    {children}
                </div>
            </div>
        </div>
    );
}
