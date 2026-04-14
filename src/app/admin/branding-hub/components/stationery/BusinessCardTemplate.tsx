"use client";

import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { BRAND } from "../brandConstants";

interface BusinessCardData {
    name: string;
    title: string;
    phone: string;
    email: string;
}

export const BusinessCardFront = forwardRef<HTMLDivElement, { data: BusinessCardData }>(
    ({ data }, ref) => {
        return (
            <div
                ref={ref}
                style={{
                    width: 1050,
                    height: 600,
                    background: "#050505",
                    fontFamily: BRAND.fonts.body,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                }}
            >
                {/* Tech Grid Background */}
                <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                {/* Left Column: Info */}
                <div
                    style={{
                        flex: 1,
                        padding: "80px 60px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        position: "relative",
                        zIndex: 1,
                        background: "linear-gradient(90deg, rgba(5,5,5,1) 60%, transparent)",
                    }}
                >
                    <div>
                        <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 44, fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>
                            {data.name}
                        </div>
                        <div style={{ fontFamily: BRAND.fonts.body, fontSize: 16, color: BRAND.colors.yellow, fontWeight: 800, marginTop: 12, textTransform: "uppercase" }}>
                            {data.title}
                        </div>
                        <div style={{ width: 60, height: 4, background: BRAND.colors.yellow, marginTop: 30 }} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <ContactRow label="M" value={data.phone} />
                        <ContactRow label="E" value={data.email} />
                        <ContactRow label="W" value={BRAND.website.toUpperCase()} />
                        <ContactRow label="A" value={`${BRAND.address.toUpperCase()} | GPS: ${BRAND.gps}`} small />
                    </div>
                </div>

                {/* Right Column: Logo */}
                <div
                    style={{
                        width: 380,
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderLeft: "1px solid rgba(255,255,255,0.05)",
                        background: "rgba(255,255,255,0.02)",
                    }}
                >
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(217,222,0,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
                    
                    <div style={{ position: "relative", zIndex: 1, marginBottom: 40, textAlign: "center" }}>
                        <div style={{ background: "#fff", width: 120, height: 120, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 10px 40px rgba(0,0,0,0.5)"}}>
                            <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 80, height: 80, objectFit: "contain" }} />
                        </div>
                        <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 16, fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>
                            {BRAND.companyShort}
                        </div>
                    </div>

                    <div style={{ padding: 12, background: "#fff", borderRadius: 8, boxShadow: "0 10px 30px rgba(0,0,0,0.5)", position: "relative", zIndex: 1 }}>
                        <QRCodeSVG value={BRAND.websiteUrl} size={80} bgColor="#fff" fgColor="#000" />
                    </div>
                </div>

                {/* Left Yellow Line */}
                <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 8, background: BRAND.colors.yellow }} />
            </div>
        );
    }
);
BusinessCardFront.displayName = "BusinessCardFront";

function ContactRow({ label, value, small }: { label: string; value: string; small?: boolean }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 28, height: 28, borderRadius: 4, background: "rgba(217,222,0,0.1)", border: "1px solid rgba(217,222,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#D9DE00", fontFamily: "Montserrat, sans-serif" }}>
                {label}
            </div>
            <span style={{ fontSize: small ? 14 : 16, color: small ? "rgba(255,255,255,0.5)" : "#fff", fontWeight: 500, fontFamily: "Montserrat, sans-serif" }}>
                {value}
            </span>
        </div>
    );
}

export const BusinessCardBack = forwardRef<HTMLDivElement, object>(
    (_, ref) => {
        return (
            <div
                ref={ref}
                style={{
                    width: 1050,
                    height: 600,
                    background: "#050505",
                    fontFamily: BRAND.fonts.heading,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(217,222,0,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
                
                <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)", backgroundPosition: "0 0, 10px 10px", backgroundSize: "20px 20px" }} />

                <div style={{ position: "relative", zIndex: 1, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ background: "#fff", width: 160, height: 160, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32, boxShadow: "0 0 60px rgba(217,222,0,0.2)"}}>
                        <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 100, height: 100, objectFit: "contain" }} />
                    </div>
                    <div style={{ fontSize: 40, fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>
                        {BRAND.companyShort}
                    </div>
                    <div style={{ fontFamily: BRAND.fonts.body, fontSize: 18, color: BRAND.colors.yellow, fontWeight: 800, marginTop: 16, textTransform: "uppercase" }}>
                        {BRAND.tagline}
                    </div>
                </div>

                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 8, background: BRAND.colors.yellow }} />
            </div>
        );
    }
);
BusinessCardBack.displayName = "BusinessCardBack";

const BusinessCardTemplate = BusinessCardFront;
export default BusinessCardTemplate;
