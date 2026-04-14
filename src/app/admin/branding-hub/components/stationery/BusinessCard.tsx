"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { BusinessCardFront, BusinessCardBack } from "./BusinessCardTemplate";
import { useCanvasDownload } from "../useCanvasDownload";
import { BRAND } from "../brandConstants";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import { ensureFontsForCapture } from "../loadFontsForCapture";

export default function BusinessCard({ onBack }: { onBack: () => void }) {
    const frontRef = useRef<HTMLDivElement>(null);
    const backRef = useRef<HTMLDivElement>(null);
    const { downloadPng, isGenerating: isPngGenerating } = useCanvasDownload();

    const [isPdfGenerating, setIsPdfGenerating] = useState(false);
    const isGenerating = isPngGenerating || isPdfGenerating;

    const [data, setData] = useState<{ name: string; title: string; phone: string; email: string }>({
        name: BRAND.ceo,
        title: BRAND.ceoTitle,
        phone: BRAND.phone,
        email: BRAND.email,
    });

    const [activeSide, setActiveSide] = useState<"front" | "back">("front");

    /**
     * Temporarily strip CSS transforms from ancestor elements so
     * html-to-image captures at the actual element dimensions.
     */
    const captureEl = async (el: HTMLElement, scale: number): Promise<string> => {
        await ensureFontsForCapture();

        const saved: Array<{ element: HTMLElement; original: string }> = [];
        let parent = el.parentElement;
        while (parent) {
            const t = parent.style.transform;
            if (t && t !== "none") {
                saved.push({ element: parent, original: t });
                parent.style.transform = "none";
            }
            parent = parent.parentElement;
        }

        const dataUrl = await toPng(el, {
            pixelRatio: scale,
            cacheBust: true,
            includeQueryParams: true,
        });

        saved.forEach(({ element, original }) => {
            element.style.transform = original;
        });

        return dataUrl;
    };

    const handleDownloadPdf = async () => {
        if (!frontRef.current || !backRef.current) return;
        setIsPdfGenerating(true);
        try {
            const [frontImg, backImg] = await Promise.all([
                captureEl(frontRef.current, 3),
                captureEl(backRef.current, 3),
            ]);

            const pdf = new jsPDF({ orientation: "landscape", unit: "in", format: [3.5, 2] });
            pdf.addImage(frontImg, "PNG", 0, 0, 3.5, 2);
            pdf.addPage([3.5, 2], "landscape");
            pdf.addImage(backImg, "PNG", 0, 0, 3.5, 2);
            pdf.save("matrix-business-card.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Error generating PDF. Please try again.");
        } finally {
            setIsPdfGenerating(false);
        }
    };

    const handleDownloadPng = () => {
        const ref = activeSide === "front" ? frontRef : backRef;
        downloadPng(ref, `matrix-business-card-${activeSide}.png`, 3);
    };

    return (
        <div className="p-6 md:p-8">
            <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-[#D9DE00] transition-colors mb-6 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold tracking-[2px] font-raleway">BRANDING HUB / STATIONERY</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-bold font-montserrat tracking-wider mb-8">
                BUSINESS <span className="text-[#D9DE00]">CARD</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Preview */}
                <div className="flex-1">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-4 md:px-5 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-white/[0.06]">
                            <div className="flex gap-1 bg-white/[0.04] rounded-lg p-0.5">
                                <button
                                    onClick={() => setActiveSide("front")}
                                    className={`px-4 py-1.5 text-[10px] font-bold tracking-[1.5px] rounded-md transition-all ${
                                        activeSide === "front"
                                            ? "bg-[#D9DE00] text-black"
                                            : "text-white/30 hover:text-white/50"
                                    }`}
                                >
                                    FRONT
                                </button>
                                <button
                                    onClick={() => setActiveSide("back")}
                                    className={`px-4 py-1.5 text-[10px] font-bold tracking-[1.5px] rounded-md transition-all ${
                                        activeSide === "back"
                                            ? "bg-[#D9DE00] text-black"
                                            : "text-white/30 hover:text-white/50"
                                    }`}
                                >
                                    BACK
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleDownloadPng}
                                    disabled={isGenerating}
                                    className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-[#D9DE00]/15 text-[#D9DE00] hover:bg-[#D9DE00]/25 transition-colors disabled:opacity-50"
                                >
                                    {isPngGenerating ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                                    PNG
                                </button>
                                <button
                                    onClick={handleDownloadPdf}
                                    disabled={isGenerating}
                                    className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-red-500/15 text-red-500 hover:bg-red-500/25 transition-colors disabled:opacity-50"
                                >
                                    {isPdfGenerating ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                                    PDF (2-PAGE)
                                </button>
                            </div>
                        </div>
                        <div className="p-4 md:p-8 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]">
                            <div className="transform scale-[0.3] sm:scale-[0.42] md:scale-[0.6] origin-top">
                                {activeSide === "front" ? (
                                    <BusinessCardFront ref={frontRef} data={data} />
                                ) : (
                                    <BusinessCardBack ref={backRef} />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Both sides small preview */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <button
                            onClick={() => setActiveSide("front")}
                            className={`rounded-lg border p-3 transition-all ${
                                activeSide === "front"
                                    ? "border-[#D9DE00]/30 bg-[#D9DE00]/[0.04]"
                                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
                            }`}
                        >
                            <div className="text-[9px] font-bold tracking-[1.5px] text-white/30 mb-2 text-left">FRONT</div>
                            <div className="bg-black rounded overflow-hidden" style={{ aspectRatio: "1050/600" }}>
                                <div className="transform scale-[0.12] origin-top-left" style={{ width: 1050 }}>
                                    <BusinessCardFront data={data} />
                                </div>
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveSide("back")}
                            className={`rounded-lg border p-3 transition-all ${
                                activeSide === "back"
                                    ? "border-[#D9DE00]/30 bg-[#D9DE00]/[0.04]"
                                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
                            }`}
                        >
                            <div className="text-[9px] font-bold tracking-[1.5px] text-white/30 mb-2 text-left">BACK</div>
                            <div className="bg-black rounded overflow-hidden" style={{ aspectRatio: "1050/600" }}>
                                <div className="transform scale-[0.12] origin-top-left" style={{ width: 1050 }}>
                                    <BusinessCardBack />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Editor Form */}
                <div className="lg:w-[340px]">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">CUSTOMIZE</span>
                        </div>
                        <div className="p-5 space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">FULL NAME</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">TITLE</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">PHONE</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">EMAIL</label>
                                <input
                                    type="text"
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none transition-colors"
                                />
                            </div>

                            <div className="pt-2 space-y-3">
                                <button
                                    onClick={handleDownloadPng}
                                    disabled={isGenerating}
                                    className="w-full flex items-center justify-center gap-2 bg-[#D9DE00] text-black font-bold py-3 rounded-lg text-sm tracking-wider font-montserrat hover:bg-[#e5ea2a] transition-colors disabled:opacity-50"
                                >
                                    {isPngGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                                    DOWNLOAD PNG ({activeSide.toUpperCase()})
                                </button>
                                <button
                                    onClick={handleDownloadPdf}
                                    disabled={isGenerating}
                                    className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-bold py-3 rounded-lg text-sm tracking-wider font-montserrat hover:bg-white/10 transition-colors disabled:opacity-50"
                                >
                                    {isPdfGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                                    DOWNLOAD PRINT PDF (FRONT + BACK)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden render targets for capture — both sides always mounted */}
            <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }} aria-hidden="true">
                <BusinessCardFront ref={frontRef} data={data} />
                <BusinessCardBack ref={backRef} />
            </div>
        </div>
    );
}
