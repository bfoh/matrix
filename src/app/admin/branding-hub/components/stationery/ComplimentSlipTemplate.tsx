"use client";

import { forwardRef } from "react";
import { BRAND } from "../brandConstants";

interface ComplimentSlipData {
    message: string;
}

const ComplimentSlipTemplate = forwardRef<HTMLDivElement, { data: ComplimentSlipData }>(
    ({ data }, ref) => {
        return (
            <div
                ref={ref}
                style={{
                    width: 650,
                    height: 250,
                    background: "#ffffff",
                    fontFamily: BRAND.fonts.body,
                    padding: "32px 40px",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Subtle watermark */}
                <div style={{ position: "absolute", top: "50%", left: "80%", transform: "translate(-50%, -50%)", opacity: 0.015, pointerEvents: "none" }}>
                    <img src={BRAND.logoTransparent} alt="" crossOrigin="anonymous" style={{ width: 220, height: 220, objectFit: "contain" }} />
                </div>

                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                        <img
                            src={BRAND.logo}
                            alt="Matrix Logo"
                            crossOrigin="anonymous"
                            style={{ width: 44, height: 44, objectFit: "contain" }}
                        />
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div style={{ 
                            fontFamily: BRAND.fonts.heading, 
                            fontSize: 14, 
                            fontWeight: 900, 
                            color: "#000", 
                            textTransform: "uppercase" 
                        }}>
                            {BRAND.companyShort}
                        </div>
                        <div style={{ 
                            fontFamily: BRAND.fonts.body, 
                            fontSize: 8, 
                            color: BRAND.colors.yellowDark, 
                            fontWeight: 700, 
                            marginTop: 3,
                            textTransform: "uppercase"
                        }}>
                            {BRAND.tagline}
                        </div>
                    </div>
                </div>

                {/* Accent Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                    <div style={{ height: 3, width: 24, background: BRAND.colors.yellow }} />
                    <div style={{ height: 1, flex: 1, background: "rgba(0,0,0,0.06)" }} />
                </div>

                {/* Content Section */}
                <div style={{ flex: 1 }}>
                    <div style={{
                        fontFamily: BRAND.fonts.heading,
                        fontSize: 14,
                        fontWeight: 800,
                        color: "#bbb",
                        textTransform: "uppercase",
                        marginBottom: 12,
                    }}>
                        WITH COMPLIMENTS
                    </div>

                    <div style={{
                        fontFamily: BRAND.fonts.body,
                        fontSize: 11,
                        color: "#444",
                        lineHeight: 1.6,
                        whiteSpace: "pre-wrap",
                        fontStyle: "italic",
                    }}>
                        {data.message || "Insert your message here..."}
                    </div>
                </div>

                {/* Minimal Footer */}
                <div style={{ marginTop: 24, borderTop: "1px solid rgba(0,0,0,0.04)", paddingTop: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 8, color: "#aaa", fontWeight: 600 }}>
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

ComplimentSlipTemplate.displayName = "ComplimentSlipTemplate";
export default ComplimentSlipTemplate;
