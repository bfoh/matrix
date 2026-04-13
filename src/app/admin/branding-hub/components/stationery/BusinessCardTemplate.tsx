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

/**
 * Front side — two-column layout: info left, logo right
 */
export const BusinessCardFront = forwardRef<HTMLDivElement, { data: BusinessCardData }>(
    ({ data }, ref) => {
        return (
            <div
                ref={ref}
                style={{
                    width: 1050,
                    height: 600,
                    background: "#050505", // Slightly deeper black
                    fontFamily: BRAND.fonts.body,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                }}
            >
                {/* ── Left column: Name + Contact ── */}
                <div
                    style={{
                        flex: 1,
                        padding: "72px 40px 60px 72px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {/* Name block */}
                    <div>
                        <div
                            style={{
                                fontFamily: BRAND.fonts.heading,
                                fontSize: 40,
                                fontWeight: 900,
                                color: "#ffffff",
                                letterSpacing: "-0.5px",
                                lineHeight: 1.1,
                                textTransform: "uppercase"
                            }}
                        >
                            {data.name}
                        </div>
                        <div
                            style={{
                                fontFamily: BRAND.fonts.body,
                                fontSize: 13,
                                color: BRAND.colors.yellow,
                                fontWeight: 700,
                                letterSpacing: "5px",
                                marginTop: 12,
                                textTransform: "uppercase"
                            }}
                        >
                            {data.title}
                        </div>
                        {/* Accent line */}
                        <div style={{ width: 44, height: 4, background: BRAND.colors.yellow, marginTop: 28 }} />
                    </div>

                    {/* Contact details */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <ContactRow label="M" value={data.phone} />
                        <ContactRow label="E" value={data.email} />
                        <ContactRow label="W" value={BRAND.website.toUpperCase()} />
                        <ContactRow label="A" value={`${BRAND.address.toUpperCase()} | GPS: ${BRAND.gps}`} small />
                    </div>
                </div>

                {/* ── Right column: Logo + QR ── */}
                <div
                    style={{
                        width: 380,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        background: "rgba(255,255,255,0.02)",
                        borderLeft: "1px solid rgba(255,255,255,0.05)",
                    }}
                >
                    {/* Subtle background glow */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "radial-gradient(circle at center, rgba(217,222,0,0.04) 0%, transparent 70%)",
                            pointerEvents: "none",
                        }}
                    />

                    {/* Logo Section */}
                    <div style={{ position: "relative", zIndex: 1, marginBottom: 40, textAlign: "center" }}>
                        <img
                            src={BRAND.logo}
                            alt="Matrix Logo"
                            crossOrigin="anonymous"
                            style={{
                                width: 90,
                                height: 90,
                                objectFit: "contain",
                            }}
                        />
                        <div style={{ 
                            fontFamily: BRAND.fonts.heading, 
                            fontSize: 10, 
                            fontWeight: 800, 
                            color: "#fff", 
                            letterSpacing: "4px", 
                            marginTop: 20,
                            textTransform: "uppercase"
                        }}>
                            {BRAND.companyShort}
                        </div>
                    </div>

                    {/* QR Code Container */}
                    <div
                        style={{
                            padding: 8,
                            background: "#ffffff",
                            borderRadius: 6,
                            position: "relative",
                            zIndex: 1,
                            boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                        }}
                    >
                        <QRCodeSVG value={BRAND.websiteUrl} size={64} bgColor="#ffffff" fgColor="#000000" />
                    </div>
                </div>

                {/* Top accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: BRAND.colors.yellow }} />

                {/* Vertical accent */}
                <div style={{ position: "absolute", bottom: 0, left: 72, width: 200, height: 2, background: `linear-gradient(90deg, ${BRAND.colors.yellow}, transparent)` }} />
            </div>
        );
    }
);
BusinessCardFront.displayName = "BusinessCardFront";

/** Reusable contact row */
function ContactRow({ label, value, small }: { label: string; value: string; small?: boolean }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
                style={{
                    width: 22,
                    height: 22,
                    borderRadius: 4,
                    border: "1px solid rgba(217,222,0,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#D9DE00",
                    fontFamily: "Montserrat, sans-serif",
                    flexShrink: 0,
                }}
            >
                {label}
            </div>
            <span
                style={{
                    fontSize: small ? 13 : 15,
                    color: small ? "#888888" : "#cccccc",
                    letterSpacing: "0.3px",
                    wordSpacing: "0px",
                }}
            >
                {value}
            </span>
        </div>
    );
}

/**
 * Back side — brand identity
 */
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
                {/* Subtle radial glow */}
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(217,222,0,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

                {/* Top accent */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: BRAND.colors.yellow }} />

                {/* Corner accents - refined */}
                <div style={{ position: "absolute", bottom: 40, left: 40, width: 60, height: 2, background: BRAND.colors.yellow }} />
                <div style={{ position: "absolute", bottom: 40, left: 40, width: 2, height: 60, background: BRAND.colors.yellow }} />
                <div style={{ position: "absolute", bottom: 40, right: 40, width: 60, height: 2, background: BRAND.colors.yellow }} />
                <div style={{ position: "absolute", bottom: 40, right: 40, width: 2, height: 60, background: BRAND.colors.yellow }} />

                {/* Logo Section */}
                <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                    <img
                        src={BRAND.logo}
                        alt="Matrix Logo"
                        crossOrigin="anonymous"
                        style={{ width: 160, height: 160, objectFit: "contain" }}
                    />

                    {/* Company name */}
                    <div
                        style={{
                            fontSize: 28,
                            fontWeight: 900,
                            color: "#ffffff",
                            letterSpacing: "8px",
                            marginTop: 32,
                            textTransform: "uppercase"
                        }}
                    >
                        {BRAND.companyShort}
                    </div>

                    {/* Tagline */}
                    <div
                        style={{
                            fontFamily: BRAND.fonts.body,
                            fontSize: 14,
                            color: BRAND.colors.yellow,
                            letterSpacing: "5px",
                            fontWeight: 700,
                            marginTop: 12,
                            textTransform: "uppercase"
                        }}
                    >
                        {BRAND.tagline}
                    </div>
                </div>

                {/* Minimalist divider */}
                <div style={{ position: "absolute", bottom: 60, width: 40, height: 3, background: BRAND.colors.yellow }} />
            </div>
        );
    }
);
BusinessCardBack.displayName = "BusinessCardBack";

// Default export for backwards compat
const BusinessCardTemplate = BusinessCardFront;
export default BusinessCardTemplate;
