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

const BusinessCardTemplate = forwardRef<HTMLDivElement, { data: BusinessCardData }>(
    ({ data }, ref) => {
        return (
            <div
                ref={ref}
                style={{
                    width: 1050,
                    height: 600,
                    display: "flex",
                    fontFamily: BRAND.fonts.body,
                    overflow: "hidden",
                    borderRadius: 8,
                    background: BRAND.colors.black,
                    position: "relative",
                }}
            >
                {/* Left Panel — Logo + Company */}
                <div
                    style={{
                        width: "40%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRight: `3px solid ${BRAND.colors.yellow}`,
                        background: "linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
                        padding: "30px 20px",
                    }}
                >
                    <img
                        src={BRAND.logo}
                        alt="Matrix Logo"
                        crossOrigin="anonymous"
                        style={{ width: 140, height: 140, objectFit: "contain" }}
                    />
                    <div
                        style={{
                            fontFamily: BRAND.fonts.heading,
                            fontSize: 16,
                            fontWeight: 800,
                            color: BRAND.colors.white,
                            letterSpacing: "3px",
                            marginTop: 16,
                            textAlign: "center",
                        }}
                    >
                        MATRIX
                    </div>
                    <div
                        style={{
                            fontFamily: BRAND.fonts.heading,
                            fontSize: 16,
                            fontWeight: 800,
                            color: BRAND.colors.white,
                            letterSpacing: "3px",
                            textAlign: "center",
                        }}
                    >
                        MULTITECH LTD
                    </div>
                    <div
                        style={{
                            fontFamily: BRAND.fonts.body,
                            fontSize: 11,
                            color: BRAND.colors.yellow,
                            letterSpacing: "2px",
                            fontWeight: 600,
                            marginTop: 8,
                            textAlign: "center",
                        }}
                    >
                        {BRAND.tagline}
                    </div>
                </div>

                {/* Right Panel — Contact Details */}
                <div
                    style={{
                        width: "60%",
                        padding: "50px 40px 40px 44px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    {/* Name */}
                    <div
                        style={{
                            fontFamily: BRAND.fonts.heading,
                            fontSize: 28,
                            fontWeight: 800,
                            color: BRAND.colors.white,
                            letterSpacing: "2px",
                        }}
                    >
                        {data.name.toUpperCase()}
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontFamily: BRAND.fonts.body,
                            fontSize: 16,
                            color: BRAND.colors.yellow,
                            letterSpacing: "3px",
                            fontWeight: 600,
                            marginTop: 6,
                        }}
                    >
                        {data.title.toUpperCase()}
                    </div>

                    {/* Divider */}
                    <div
                        style={{
                            width: 60,
                            height: 2,
                            background: BRAND.colors.yellow,
                            marginTop: 20,
                            marginBottom: 24,
                        }}
                    />

                    {/* Contact details */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRAND.colors.lightGray} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <span style={{ fontFamily: BRAND.fonts.body, fontSize: 14, color: "#ccc", letterSpacing: "0.5px" }}>
                                {data.phone}
                            </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRAND.colors.lightGray} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            <span style={{ fontFamily: BRAND.fonts.body, fontSize: 14, color: "#ccc", letterSpacing: "0.5px" }}>
                                {data.email}
                            </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRAND.colors.lightGray} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                            <span style={{ fontFamily: BRAND.fonts.body, fontSize: 14, color: "#ccc", letterSpacing: "0.5px" }}>
                                {BRAND.website}
                            </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRAND.colors.lightGray} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span style={{ fontFamily: BRAND.fonts.body, fontSize: 13, color: "#999", letterSpacing: "0.5px" }}>
                                {BRAND.address} • GPS: {BRAND.gps}
                            </span>
                        </div>
                    </div>

                    {/* QR Code */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 32,
                            right: 36,
                            padding: 6,
                            background: BRAND.colors.white,
                            borderRadius: 4,
                        }}
                    >
                        <QRCodeSVG
                            value={BRAND.websiteUrl}
                            size={64}
                            bgColor={BRAND.colors.white}
                            fgColor={BRAND.colors.black}
                        />
                    </div>
                </div>
            </div>
        );
    }
);

BusinessCardTemplate.displayName = "BusinessCardTemplate";
export default BusinessCardTemplate;
