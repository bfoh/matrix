"use client";

import { forwardRef } from "react";
import { BRAND } from "../brandConstants";

interface EmailSignatureData {
    name: string;
    title: string;
    phone: string;
    email: string;
}

const EmailSignatureTemplate = forwardRef<HTMLDivElement, { data: EmailSignatureData }>(
    ({ data }, ref) => {
        return (
            <div
                ref={ref}
                style={{
                    width: 600,
                    height: 180,
                    background: "#ffffff",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    padding: "20px 24px",
                    display: "flex",
                    gap: 20,
                    alignItems: "center",
                }}
            >
                {/* Logo with yellow left border */}
                <div style={{ borderLeft: `4px solid ${BRAND.colors.yellow}`, paddingLeft: 16, display: "flex", alignItems: "center" }}>
                    <img
                        src={BRAND.logo}
                        alt="Matrix Logo"
                        crossOrigin="anonymous"
                        style={{ width: 64, height: 64, objectFit: "contain" }}
                    />
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 18, fontWeight: 700, color: "#111", letterSpacing: "0.5px" }}>
                        {data.name}
                    </div>
                    <div style={{ fontSize: 13, color: BRAND.colors.yellow, fontWeight: 600, letterSpacing: "1px", marginTop: 2 }}>
                        {data.title} — {BRAND.tagline}
                    </div>

                    <div style={{ height: 1, background: "#e0e0e0", margin: "10px 0" }} />

                    <div style={{ display: "flex", gap: 16, fontSize: 11, color: "#777" }}>
                        <span>{data.phone}</span>
                        <span>|</span>
                        <span>{data.email}</span>
                        <span>|</span>
                        <span>{BRAND.website}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "#aaa", marginTop: 4 }}>
                        {BRAND.location} • GPS: {BRAND.gps}
                    </div>
                </div>
            </div>
        );
    }
);

EmailSignatureTemplate.displayName = "EmailSignatureTemplate";

export function generateSignatureHtml(data: EmailSignatureData): string {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
  <tr>
    <td style="border-left:4px solid ${BRAND.colors.yellow};padding-left:16px;vertical-align:middle;">
      <img src="${BRAND.websiteUrl}/images/matrix-logo.png" alt="Matrix MultiTech" width="64" height="64" style="display:block;" />
    </td>
    <td style="padding-left:20px;vertical-align:middle;">
      <div style="font-size:18px;font-weight:bold;color:#111;">${data.name}</div>
      <div style="font-size:13px;color:${BRAND.colors.yellow};font-weight:600;margin-top:2px;">${data.title} — ${BRAND.tagline}</div>
      <div style="height:1px;background:#e0e0e0;margin:10px 0;"></div>
      <div style="font-size:11px;color:#777;">${data.phone} | ${data.email} | ${BRAND.website}</div>
      <div style="font-size:10px;color:#aaa;margin-top:4px;">${BRAND.location} • GPS: ${BRAND.gps}</div>
    </td>
  </tr>
</table>`;
}

export default EmailSignatureTemplate;
