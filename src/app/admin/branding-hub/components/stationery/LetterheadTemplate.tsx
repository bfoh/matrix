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
                    background: "#fafaf5",
                    fontFamily: BRAND.fonts.body,
                    padding: "32px 40px",
                    position: "relative",
                    overflow: "hidden",
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
                            opacity: 0.04,
                            pointerEvents: "none",
                        }}
                    >
                        <img
                            src={BRAND.logoTransparent}
                            alt=""
                            crossOrigin="anonymous"
                            style={{ width: 300, height: 300, objectFit: "contain" }}
                        />
                    </div>
                )}

                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <img
                        src={BRAND.logo}
                        alt="Matrix Logo"
                        crossOrigin="anonymous"
                        style={{ width: 60, height: 60, objectFit: "contain" }}
                    />
                    <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 13, fontWeight: 800, color: "#111", letterSpacing: "2px" }}>
                            MATRIX MULTITECH LTD
                        </div>
                        <div style={{ fontFamily: BRAND.fonts.body, fontSize: 9, color: BRAND.colors.yellow, fontWeight: 600, letterSpacing: "1.5px", marginTop: 3 }}>
                            {BRAND.tagline}
                        </div>
                    </div>
                </div>

                {/* Yellow line */}
                <div style={{ height: 2, background: `linear-gradient(90deg, ${BRAND.colors.yellow}, ${BRAND.colors.yellow}33)`, marginBottom: 28 }} />

                {/* Letter content */}
                <div
                    style={{
                        fontFamily: BRAND.fonts.body,
                        fontSize: 11,
                        color: "#333",
                        lineHeight: 1.9,
                        whiteSpace: "pre-wrap",
                        minHeight: 600,
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {data.content || "Your letter content will appear here..."}
                </div>

                {/* Footer */}
                <div style={{ position: "absolute", bottom: 24, left: 40, right: 40 }}>
                    <div style={{ height: 1.5, background: `linear-gradient(90deg, ${BRAND.colors.yellow}, ${BRAND.colors.yellow}33)`, marginBottom: 6 }} />
                    <div style={{ fontFamily: BRAND.fonts.body, fontSize: 7, color: "#999", textAlign: "center", letterSpacing: "0.5px" }}>
                        {BRAND.location} • {BRAND.phone} • {BRAND.email} • {BRAND.website} • GPS: {BRAND.gps}
                    </div>
                </div>
            </div>
        );
    }
);

LetterheadTemplate.displayName = "LetterheadTemplate";
export default LetterheadTemplate;
