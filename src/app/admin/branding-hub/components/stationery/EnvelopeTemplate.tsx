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
                background: "#ffffff",
                fontFamily: BRAND.fonts.body,
                padding: "48px 60px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div style={{ position: "absolute", top: "60%", left: "75%", transform: "translate(-50%, -50%)", opacity: 0.015, pointerEvents: "none" }}>
                <img src={BRAND.logoTransparent} alt="" crossOrigin="anonymous" style={{ width: 300, height: 300, objectFit: "contain" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                    <img
                        src={BRAND.logo}
                        alt="Matrix Logo"
                        crossOrigin="anonymous"
                        style={{ width: 44, height: 44, objectFit: "contain" }}
                    />
                    <div>
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
                <div style={{ fontSize: 10, color: "#666", lineHeight: 1.8, marginLeft: 60, borderLeft: "1px solid rgba(0,0,0,0.06)", paddingLeft: 16 }}>
                    <span style={{textTransform: "uppercase", fontWeight: 600}}>{BRAND.location}</span><br />
                    T: {BRAND.phone}<br />
                    E: <span style={{textTransform: "uppercase", fontWeight: 600}}>{BRAND.email}</span>
                </div>
            </div>

            {/* Stamp area */}
            <div style={{
                position: "absolute",
                top: 48,
                right: 60,
                width: 60,
                height: 70,
                border: "1px dashed #ddd",
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                color: "#ccc",
                fontWeight: 700,
            }}>
                <div style={{ fontSize: 16, marginBottom: 4 }}>▧</div>
                STAMP
            </div>

            {/* Recipient area */}
            <div style={{
                position: "absolute",
                top: "60%",
                left: "45%",
                transform: "translate(-20%, -20%)",
                width: "45%",
            }}>
                <div style={{ width: 40, height: 3, background: BRAND.colors.yellow, marginBottom: 16 }} />
                <div style={{ fontSize: 14, color: "#aaa", lineHeight: 2, fontStyle: "italic" }}>
                    Recipient Full Name<br />
                    Organization Name<br />
                    P.O. Box / Street Address<br />
                    City, Country
                </div>
            </div>

            {/* Bottom accent bar */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(90deg, ${BRAND.colors.yellow}, rgba(217,222,0,0.1))`,
            }} />
        </div>
    );
});

EnvelopeTemplate.displayName = "EnvelopeTemplate";
export default EnvelopeTemplate;
