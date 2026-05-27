"use client";

import { useState, useRef, useMemo } from "react";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import LetterheadTemplate from "./LetterheadTemplate";
import AiWritingAssistant from "../AiWritingAssistant";
import { usePdfDownload } from "../usePdfDownload";
import { paginateLetterContent } from "./paginateLetterContent";
import { BRAND } from "../brandConstants";

// Body content area of LetterheadTemplate (px). Page = 620x877.
// Header (~196) + footer (~88) = ~284 used → ~593 available.
// Body padding-x = 50 each side → width = 520.
const BODY_MAX_HEIGHT = 588;
const BODY_WIDTH = 520;

interface LetterheadProps {
    onBack: () => void;
}

const DEFAULT_CONTENT = `12th April, 2026

The Managing Director
[Company Name]
[Address]

Dear Sir/Madam,

RE: [SUBJECT LINE]

[Your letter content here]

Yours faithfully,


Ernest Opoku
Chief Executive Officer
Matrix MultiTech Ltd`;

export default function Letterhead({ onBack }: LetterheadProps) {
    const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { downloadMultiPagePdf, isGenerating } = usePdfDownload();
    const [data, setData] = useState({
        content: DEFAULT_CONTENT,
        showWatermark: true,
    });
    const pages = useMemo(
        () =>
            paginateLetterContent(
                data.content,
                BODY_MAX_HEIGHT,
                BODY_WIDTH,
                BRAND.fonts.body,
                12,
                1.85,
            ),
        [data.content],
    );

    const handleDownloadPdf = () => {
        // Only first `pages.length` slots are valid this render
        const els = pageRefs.current.slice(0, pages.length);
        downloadMultiPagePdf(els, {
            orientation: "portrait",
            widthInches: 8.27,
            heightInches: 11.69,
            scale: 3,
            filename: "matrix-letterhead.pdf",
        });
    };

    const handleAiApply = (text: string) => {
        setData((prev) => ({ ...prev, content: text }));
    };

    return (
        <div className="p-6 md:p-8">
            <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-[#D9DE00] transition-colors mb-6 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold tracking-[2px] font-raleway">BRANDING HUB / STATIONERY</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-bold font-montserrat tracking-wider mb-8">
                LETTER<span className="text-[#D9DE00]">HEAD</span>
            </h1>

            <div className="flex flex-col xl:flex-row gap-6">
                {/* Left: Preview + Text Editor */}
                <div className="flex-1 space-y-5">
                    {/* Preview */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 flex justify-between items-center border-b border-white/[0.06]">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] tracking-[2px] font-bold text-white/30">LIVE PREVIEW</span>
                                <span className="text-[10px] tracking-[1px] font-bold text-[#D9DE00]/80">
                                    {pages.length} {pages.length === 1 ? "PAGE" : "PAGES"}
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <label className="flex items-center gap-2 text-[10px] text-white/30 cursor-pointer mr-3">
                                    <input
                                        type="checkbox"
                                        checked={data.showWatermark}
                                        onChange={(e) => setData({ ...data, showWatermark: e.target.checked })}
                                        className="accent-[#D9DE00]"
                                    />
                                    Watermark
                                </label>
                                <button
                                    onClick={handleDownloadPdf}
                                    disabled={isGenerating}
                                    className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-red-500/15 text-red-500 hover:bg-red-500/25 transition-colors disabled:opacity-50"
                                >
                                    {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                                    PDF
                                </button>
                            </div>
                        </div>
                        <div className="p-3 md:p-6 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d] overflow-auto">
                            <div className="transform scale-[0.42] sm:scale-[0.55] md:scale-[0.75] origin-top">
                                <div className="flex flex-col gap-8">
                                    {pages.map((pageContent, i) => (
                                        <LetterheadTemplate
                                            key={i}
                                            ref={(el) => {
                                                pageRefs.current[i] = el;
                                            }}
                                            data={{ ...data, content: pageContent }}
                                            pageIndex={i}
                                            totalPages={pages.length}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text Editor */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 flex justify-between items-center border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">LETTER CONTENT</span>
                            <span className="text-[10px] tracking-[1px] font-bold text-[#D9DE00]">✦ AI-ENHANCED</span>
                        </div>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData({ ...data, content: e.target.value })}
                            className="w-full bg-transparent p-5 text-[13px] text-white/70 font-raleway leading-relaxed resize-none focus:outline-none min-h-[250px]"
                            placeholder="Type your letter content here..."
                        />
                    </div>

                    <button
                        onClick={handleDownloadPdf}
                        disabled={isGenerating}
                        className="w-full flex items-center justify-center gap-2 bg-[#D9DE00] text-black font-bold py-3 rounded-lg text-sm tracking-wider font-montserrat hover:bg-[#e5ea2a] transition-colors disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                        DOWNLOAD PRINT-READY PDF
                    </button>
                </div>

                {/* Right: AI Panel */}
                <div className="xl:w-[380px] min-h-[400px] md:min-h-[600px]">
                    <AiWritingAssistant materialType="letterhead" onApply={handleAiApply} />
                </div>
            </div>
        </div>
    );
}
