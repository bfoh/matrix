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
                <div style={{ borderLeft: `6px solid ${BRAND.colors.yellow}`, paddingLeft: 16, display: "flex", alignItems: "center" }}>
                    <img
                        src={BRAND.logo}
                        alt="Matrix Logo"
                        crossOrigin="anonymous"
                        style={{ width: 64, height: 64, objectFit: "contain" }}
                    />
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 20, fontWeight: 800, color: "#111", textTransform: "uppercase" }}>
                        {data.name}
                    </div>
                    <div style={{ fontSize: 13, color: BRAND.colors.yellowDark, fontWeight: 700, marginTop: 4, textTransform: "uppercase" }}>
                        {data.title} — {BRAND.tagline}
                    </div>

                    <div style={{ height: 2, background: "#efefef", margin: "12px 0" }} />

                    <div style={{ display: "flex", gap: 16, fontSize: 11, color: "#777", fontWeight: 600 }}>
                        <span>{data.phone}</span>
                        <span style={{color: BRAND.colors.yellowDark}}>|</span>
                        <span style={{textTransform: "uppercase"}}>{data.email}</span>
                        <span style={{color: BRAND.colors.yellowDark}}>|</span>
                        <span style={{textTransform: "uppercase"}}>{BRAND.website}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "#aaa", marginTop: 4, fontWeight: 500, textTransform: "uppercase" }}>
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
    <td style="border-left:6px solid ${BRAND.colors.yellow};padding-left:16px;vertical-align:middle;">
      <img src="${BRAND.websiteUrl}/images/matrix-logo.png" alt="Matrix MultiTech" width="64" height="64" style="display:block;" />
    </td>
    <td style="padding-left:20px;vertical-align:middle;">
      <div style="font-size:20px;font-weight:800;color:#111;text-transform:uppercase;">${data.name}</div>
      <div style="font-size:13px;color:${BRAND.colors.yellowDark};font-weight:700;margin-top:4px;text-transform:uppercase;">${data.title} — ${BRAND.tagline}</div>
      <div style="height:2px;background:#efefef;margin:12px 0;"></div>
      <div style="font-size:11px;color:#777;font-weight:600;">${data.phone} &nbsp;<span style="color:${BRAND.colors.yellowDark}">|</span>&nbsp; <span style="text-transform:uppercase;">${data.email}</span> &nbsp;<span style="color:${BRAND.colors.yellowDark}">|</span>&nbsp; <span style="text-transform:uppercase;">${BRAND.website}</span></div>
      <div style="font-size:10px;color:#aaa;margin-top:4px;font-weight:500;text-transform:uppercase;">${BRAND.location} • GPS: ${BRAND.gps}</div>
    </td>
  </tr>
</table>`;
}

export default EmailSignatureTemplate;
