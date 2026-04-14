"use client";

import { forwardRef } from "react";
import { BRAND } from "../brandConstants";

interface LetterheadData {
    content: string;
    showWatermark: boolean;
}

const LetterheadTemplate = forwardRef<HTMLDivElement, { data: LetterheadData }>(
    ({ data }, ref) => {
        return (
            <div
                ref={ref}
                style={{
                    width: 620,
                    height: 877,
                    background: "#ffffff",
                    fontFamily: BRAND.fonts.body,
                    padding: "48px 60px",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Watermark */}
                {data.showWatermark && (
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            opacity: 0.015,
                            pointerEvents: "none",
                            zIndex: 0,
                        }}
                    >
                        <img
                            src={BRAND.logoTransparent}
                            alt=""
                            crossOrigin="anonymous"
                            style={{ width: 400, height: 400, objectFit: "contain" }}
                        />
                    </div>
                )}

                {/* Header Section */}
                <div style={{ position: "relative", zIndex: 1, marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
                        <div>
                            <img
                                src={BRAND.logo}
                                alt="Matrix Logo"
                                crossOrigin="anonymous"
                                style={{ width: 70, height: 70, objectFit: "contain" }}
                            />
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ 
                                fontFamily: BRAND.fonts.heading, 
                                fontSize: 16, 
                                fontWeight: 900, 
                                color: "#000", 
                                textTransform: "uppercase" 
                            }}>
                                {BRAND.companyShort}
                            </div>
                            <div style={{ 
                                fontFamily: BRAND.fonts.body, 
                                fontSize: 10, 
                                color: BRAND.colors.yellowDark, 
                                fontWeight: 700, 
                                marginTop: 4,
                                textTransform: "uppercase"
                            }}>
                                {BRAND.tagline}
                            </div>
                        </div>
                    </div>

                    {/* Styled Separator */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
                        <div style={{ height: 3, width: 40, background: BRAND.colors.yellow }} />
                        <div style={{ height: 1, flex: 1, background: "rgba(0,0,0,0.06)" }} />
                    </div>
                </div>

                {/* Letter content container */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        flex: 1,
                        fontFamily: BRAND.fonts.body,
                        fontSize: 12,
                        color: "#222",
                        lineHeight: 1.8,
                        whiteSpace: "pre-wrap",
                        textAlign: "justify",
                    }}
                >
                    {data.content || "Your letter content will appear here..."}
                </div>

                {/* Footer Section - Removed broken tracking formatting for PDF canvas */}
                <div style={{ position: "relative", zIndex: 1, marginTop: 40, borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 16 }}>
                    <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", // Spread out elements instead of gap+tracking
                        alignItems: "center",
                        fontFamily: BRAND.fonts.body, 
                        fontSize: 8, 
                        color: "#888", 
                        fontWeight: 600
                    }}>
                        <span style={{textTransform: "uppercase"}}>{BRAND.address}</span>
                        <span style={{ color: BRAND.colors.yellow }}>•</span>
                        <span>{BRAND.phone}</span>
                        <span style={{ color: BRAND.colors.yellow }}>•</span>
                        <span style={{textTransform: "uppercase"}}>{BRAND.email}</span>
                        <span style={{ color: BRAND.colors.yellow }}>•</span>
                        <span style={{textTransform: "uppercase"}}>{BRAND.website}</span>
                    </div>
                </div>
            </div>
        );
    }
);

LetterheadTemplate.displayName = "LetterheadTemplate";
export default LetterheadTemplate;
