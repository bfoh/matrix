"use client";

import { forwardRef } from "react";
import { BRAND } from "../brandConstants";

const EnvelopeTemplate = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div
            ref={ref}
            style={{
                width: 866,
                height: 433,
                background: "linear-gradient(180deg, #fafaf5, #f0f0eb)",
                fontFamily: BRAND.fonts.body,
                padding: "36px 44px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Return address */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
                <img
                    src={BRAND.logo}
                    alt="Matrix Logo"
                    crossOrigin="anonymous"
                    style={{ width: 40, height: 40, objectFit: "contain" }}
                />
                <div>
                    <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 14, fontWeight: 800, color: "#111", letterSpacing: "2px" }}>
                        MATRIX MULTITECH LTD
                    </div>
                    <div style={{ fontSize: 9, color: BRAND.colors.yellow, fontWeight: 600, letterSpacing: "1.5px", marginTop: 2 }}>
                        {BRAND.tagline}
                    </div>
                </div>
            </div>
            <div style={{ fontSize: 10, color: "#777", lineHeight: 1.8, marginLeft: 54 }}>
                {BRAND.location}<br />
                GPS: {BRAND.gps}<br />
                {BRAND.phone}
            </div>

            {/* Stamp area */}
            <div style={{
                position: "absolute",
                top: 32,
                right: 40,
                width: 60,
                height: 70,
                border: "1.5px solid #ccc",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                color: "#bbb",
                letterSpacing: "1px",
            }}>
                STAMP
            </div>

            {/* Recipient area (center) */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-30%, -20%)",
            }}>
                <div style={{ fontSize: 12, color: "#aaa", lineHeight: 2, fontStyle: "italic" }}>
                    Recipient Name<br />
                    Company / Address<br />
                    City, Country
                </div>
            </div>

            {/* Bottom accent bar */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 5,
                background: `linear-gradient(90deg, ${BRAND.colors.yellow}, ${BRAND.colors.yellow}22)`,
            }} />
        </div>
    );
});

EnvelopeTemplate.displayName = "EnvelopeTemplate";
export default EnvelopeTemplate;
