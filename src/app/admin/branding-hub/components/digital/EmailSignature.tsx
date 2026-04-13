"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Download, Copy, Loader2, Check } from "lucide-react";
import EmailSignatureTemplate, { generateSignatureHtml } from "./EmailSignatureTemplate";
import { useCanvasDownload } from "../useCanvasDownload";
import { BRAND } from "../brandConstants";

export default function EmailSignature({ onBack }: { onBack: () => void }) {
    const templateRef = useRef<HTMLDivElement>(null);
    const { downloadPng, isGenerating } = useCanvasDownload();
    const [copied, setCopied] = useState(false);

    const [data, setData] = useState<{ name: string; title: string; phone: string; email: string }>({
        name: BRAND.ceo,
        title: BRAND.ceoTitle,
        phone: BRAND.phone,
        email: BRAND.email,
    });

    const handleCopyHtml = async () => {
        const html = generateSignatureHtml(data);
        await navigator.clipboard.writeText(html);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 md:p-8">
            <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-[#D9DE00] transition-colors mb-6 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold tracking-[2px] font-raleway">BRANDING HUB / DIGITAL</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-bold font-montserrat tracking-wider mb-8">
                EMAIL <span className="text-[#D9DE00]">SIGNATURE</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 flex justify-between items-center border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">LIVE PREVIEW</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCopyHtml}
                                    className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-blue-500/15 text-blue-500 hover:bg-blue-500/25 transition-colors"
                                >
                                    {copied ? <Check size={12} /> : <Copy size={12} />}
                                    {copied ? "COPIED!" : "HTML"}
                                </button>
                                <button
                                    onClick={() => downloadPng(templateRef, "matrix-email-signature.png", 2)}
                                    disabled={isGenerating}
                                    className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-[#D9DE00]/15 text-[#D9DE00] hover:bg-[#D9DE00]/25 transition-colors disabled:opacity-50"
                                >
                                    {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                                    PNG
                                </button>
                            </div>
                        </div>
                        <div className="p-4 md:p-8 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d] overflow-x-auto">
                            <div className="transform scale-[0.5] sm:scale-[0.7] md:scale-100 origin-top">
                            <EmailSignatureTemplate ref={templateRef} data={data} />
                            </div>
                        </div>
                    </div>

                    {/* HTML Preview */}
                    <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">HTML CODE</span>
                        </div>
                        <pre className="p-5 text-[10px] text-white/40 overflow-x-auto font-mono leading-relaxed">
                            {generateSignatureHtml(data)}
                        </pre>
                    </div>
                </div>

                <div className="lg:w-[340px]">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">CUSTOMIZE</span>
                        </div>
                        <div className="p-5 space-y-5">
                            {[
                                { label: "FULL NAME", key: "name" as const },
                                { label: "TITLE", key: "title" as const },
                                { label: "PHONE", key: "phone" as const },
                                { label: "EMAIL", key: "email" as const },
                            ].map((field) => (
                                <div key={field.key}>
                                    <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">{field.label}</label>
                                    <input
                                        type="text"
                                        value={data[field.key]}
                                        onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors"
                                    />
                                </div>
                            ))}

                            <div className="pt-2 space-y-3">
                                <button
                                    onClick={handleCopyHtml}
                                    className="w-full flex items-center justify-center gap-2 bg-[#D9DE00] text-black font-bold py-3 rounded-lg text-sm tracking-wider font-montserrat hover:bg-[#e5ea2a] transition-colors"
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                    {copied ? "COPIED TO CLIPBOARD!" : "COPY HTML"}
                                </button>
                                <button
                                    onClick={() => downloadPng(templateRef, "matrix-email-signature.png", 2)}
                                    disabled={isGenerating}
                                    className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-bold py-3 rounded-lg text-sm tracking-wider font-montserrat hover:bg-white/10 transition-colors disabled:opacity-50"
                                >
                                    {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                                    DOWNLOAD PNG
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
