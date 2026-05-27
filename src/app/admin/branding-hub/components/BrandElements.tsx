"use client";

import { BRAND } from "./brandConstants";

/** Shared logo + company name header for templates (inline styles for html2canvas) */
export function BrandHeader({ scale = 1 }: { scale?: number }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <img
                src={BRAND.logo}
                alt="Matrix Logo"
                crossOrigin="anonymous"
                style={{ width: 48 * scale, height: 48 * scale, objectFit: "contain" }}
            />
            <div style={{ textAlign: "right" }}>
                <div style={{
                    fontFamily: BRAND.fonts.heading,
                    fontSize: 11 * scale,
                    fontWeight: 800,
                    color: "#111",
                    letterSpacing: "2px",
                }}>
                    MATRIX MULTI-TECH LTD.
                </div>
                <div style={{
                    fontFamily: BRAND.fonts.body,
                    fontSize: 8 * scale,
                    color: BRAND.colors.yellow,
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    marginTop: 2 * scale,
                }}>
                    {BRAND.tagline}
                </div>
            </div>
        </div>
    );
}

/** Yellow accent line for templates */
export function BrandLine({ color = BRAND.colors.yellow }: { color?: string }) {
    return (
        <div style={{
            height: 2,
            background: `linear-gradient(90deg, ${color}, ${color}33)`,
        }} />
    );
}

/** Contact footer bar for templates */
export function BrandFooter({ scale = 1, dark = false }: { scale?: number; dark?: boolean }) {
    const textColor = dark ? "rgba(255,255,255,0.5)" : "#999";
    return (
        <div>
            <BrandLine />
            <div style={{
                fontFamily: BRAND.fonts.body,
                fontSize: 6 * scale,
                color: textColor,
                textAlign: "center",
                marginTop: 4 * scale,
                letterSpacing: "0.5px",
            }}>
                {BRAND.location} • {BRAND.phone} • {BRAND.email} • {BRAND.website}
            </div>
        </div>
    );
}
