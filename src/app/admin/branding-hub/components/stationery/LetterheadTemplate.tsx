"use client";

import { forwardRef } from "react";
import { BRAND } from "../brandConstants";

interface LetterheadData {
    content: string;
    showWatermark: boolean;
}

/**
 * Premium A4 Letterhead Template
 * 
 * Design system:
 * - Left accent bar (4px neon yellow) anchors the brand identity
 * - Logo + company name sit at top-left for authority
 * - Contact details structured in the right side of the header
 * - Footer carries address, registration info, and a brand color strip
 * - Generous whitespace signals luxury and confidence
 */
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
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* ═══════════════════════════════════════════════
                    LEFT ACCENT BAR — runs the full height of the page
                    Inspired by premium law firm & real estate stationery
                    ═══════════════════════════════════════════════ */}
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 5,
                    height: "100%",
                    background: `linear-gradient(180deg, ${BRAND.colors.yellow} 0%, ${BRAND.colors.yellow} 60%, transparent 100%)`,
                    zIndex: 2,
                }} />

                {/* Watermark — ultra-subtle, dead center */}
                {data.showWatermark && (
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            opacity: 0.018,
                            pointerEvents: "none",
                            zIndex: 0,
                        }}
                    >
                        <img
                            src={BRAND.logoTransparent}
                            alt=""
                            crossOrigin="anonymous"
                            style={{ width: 380, height: 380, objectFit: "contain" }}
                        />
                    </div>
                )}

                {/* ═══════════════════════════════════════════════
                    HEADER SECTION
                    ═══════════════════════════════════════════════ */}
                <div style={{
                    position: "relative",
                    zIndex: 1,
                    padding: "40px 50px 0 50px",
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    }}>
                        {/* Left: Logo + Identity */}
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <img
                                src={BRAND.logo}
                                alt="Matrix Logo"
                                crossOrigin="anonymous"
                                style={{ width: 56, height: 56, objectFit: "contain" }}
                            />
                            <div>
                                <div style={{
                                    fontFamily: BRAND.fonts.heading,
                                    fontSize: 17,
                                    fontWeight: 900,
                                    color: "#0a0a0a",
                                    textTransform: "uppercase",
                                    lineHeight: 1.1,
                                }}>
                                    Matrix MultiTech
                                </div>
                                <div style={{
                                    fontFamily: BRAND.fonts.heading,
                                    fontSize: 8,
                                    fontWeight: 800,
                                    color: BRAND.colors.yellowDark,
                                    textTransform: "uppercase",
                                    marginTop: 5,
                                }}>
                                    Telecom  |  Real Estate
                                </div>
                            </div>
                        </div>

                        {/* Right: Contact details stacked */}
                        <div style={{ textAlign: "right" }}>
                            <div style={{
                                fontSize: 8,
                                color: "#555",
                                lineHeight: 1.9,
                                fontWeight: 500,
                            }}>
                                <div>{BRAND.phone}</div>
                                <div>{BRAND.email}</div>
                                <div>{BRAND.website}</div>
                                <div>GPS: {BRAND.gps}</div>
                            </div>
                        </div>
                    </div>

                    {/* Separator — thin line with brand accent */}
                    <div style={{
                        marginTop: 18,
                        height: 2,
                        background: `linear-gradient(90deg, ${BRAND.colors.yellow} 0%, ${BRAND.colors.yellow} 80px, #e8e8e8 80px, #e8e8e8 100%)`,
                    }} />
                </div>

                {/* ═══════════════════════════════════════════════
                    BODY — Letter content area
                    ═══════════════════════════════════════════════ */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        flex: 1,
                        padding: "36px 50px 0 50px",
                        fontFamily: BRAND.fonts.body,
                        fontSize: 12,
                        color: "#1a1a1a",
                        lineHeight: 1.85,
                        whiteSpace: "pre-wrap",
                        textAlign: "left",
                    }}
                >
                    {data.content || "Your letter content will appear here..."}
                </div>

                {/* ═══════════════════════════════════════════════
                    FOOTER SECTION — Premium two-tier footer
                    ═══════════════════════════════════════════════ */}
                <div style={{
                    position: "relative",
                    zIndex: 1,
                    padding: "0 50px",
                    marginTop: 24,
                }}>
                    {/* Upper footer: company name + address */}
                    <div style={{
                        borderTop: "1px solid #e0e0e0",
                        paddingTop: 14,
                        paddingBottom: 10,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    }}>
                        <div>
                            <div style={{
                                fontFamily: BRAND.fonts.heading,
                                fontSize: 8,
                                fontWeight: 900,
                                color: "#111",
                                textTransform: "uppercase",
                                marginBottom: 3,
                            }}>
                                {BRAND.company}
                            </div>
                            <div style={{
                                fontSize: 7,
                                color: "#888",
                                fontWeight: 500,
                            }}>
                                {BRAND.location}
                            </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{
                                fontSize: 7,
                                color: "#888",
                                fontWeight: 500,
                            }}>
                                www.{BRAND.website}
                            </div>
                            <div style={{
                                fontSize: 7,
                                color: "#aaa",
                                fontWeight: 500,
                                marginTop: 2,
                            }}>
                                {BRAND.email}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom brand strip — the signature accent */}
                <div style={{
                    height: 4,
                    background: `linear-gradient(90deg, ${BRAND.colors.yellow} 0%, ${BRAND.colors.yellow}66 40%, transparent 100%)`,
                }} />
            </div>
        );
    }
);

LetterheadTemplate.displayName = "LetterheadTemplate";
export default LetterheadTemplate;
