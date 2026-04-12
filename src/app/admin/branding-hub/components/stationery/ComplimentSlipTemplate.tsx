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
                    background: "linear-gradient(180deg, #fafaf5, #f0f0eb)",
                    fontFamily: BRAND.fonts.body,
                    padding: "24px 32px",
                    position: "relative",
                }}
            >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <img
                        src={BRAND.logo}
                        alt="Matrix Logo"
                        crossOrigin="anonymous"
                        style={{ width: 36, height: 36, objectFit: "contain" }}
                    />
                    <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 10, fontWeight: 800, color: "#111", letterSpacing: "2px" }}>
                            MATRIX MULTITECH LTD
                        </div>
                        <div style={{ fontSize: 7, color: BRAND.colors.yellow, fontWeight: 600, letterSpacing: "1.5px", marginTop: 2 }}>
                            {BRAND.tagline}
                        </div>
                    </div>
                </div>

                {/* Yellow line */}
                <div style={{ height: 1.5, background: `linear-gradient(90deg, ${BRAND.colors.yellow}, ${BRAND.colors.yellow}22)`, marginBottom: 18 }} />

                {/* Title */}
                <div style={{
                    fontFamily: BRAND.fonts.heading,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#888",
                    fontStyle: "italic",
                    letterSpacing: "1px",
                    marginBottom: 10,
                }}>
                    With Compliments
                </div>

                {/* Message */}
                <div style={{
                    fontFamily: BRAND.fonts.body,
                    fontSize: 10,
                    color: "#555",
                    lineHeight: 1.8,
                    whiteSpace: "pre-wrap",
                }}>
                    {data.message}
                </div>

                {/* Footer */}
                <div style={{ position: "absolute", bottom: 16, left: 32, right: 32 }}>
                    <div style={{ height: 1, background: `linear-gradient(90deg, ${BRAND.colors.yellow}, ${BRAND.colors.yellow}22)`, marginBottom: 5 }} />
                    <div style={{ fontSize: 6, color: "#bbb", textAlign: "center", letterSpacing: "0.5px" }}>
                        {BRAND.phone} • {BRAND.email} • {BRAND.website}
                    </div>
                </div>
            </div>
        );
    }
);

ComplimentSlipTemplate.displayName = "ComplimentSlipTemplate";
export default ComplimentSlipTemplate;
