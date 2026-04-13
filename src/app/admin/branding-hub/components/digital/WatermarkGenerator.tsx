"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Download, Upload, Loader2 } from "lucide-react";
import { useCanvasDownload } from "../useCanvasDownload";
import { BRAND } from "../brandConstants";

export default function WatermarkGenerator({ onBack }: { onBack: () => void }) {
    const canvasRef = useRef<HTMLDivElement>(null);
    const { downloadPng, isGenerating } = useCanvasDownload();
    const [image, setImage] = useState<string | null>(null);
    const [opacity, setOpacity] = useState(0.15);
    const [position, setPosition] = useState<"center" | "bottom-right">("center");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setImage(url);
    };

    return (
        <div className="p-6 md:p-8">
            <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-[#D9DE00] transition-colors mb-6 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold tracking-[2px] font-raleway">BRANDING HUB / DIGITAL</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-bold font-montserrat tracking-wider mb-8">
                WATERMARK <span className="text-[#D9DE00]">GENERATOR</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 flex justify-between items-center border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">PREVIEW</span>
                            {image && (
                                <button
                                    onClick={() => downloadPng(canvasRef, "matrix-watermarked.png", 2)}
                                    disabled={isGenerating}
                                    className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-[#D9DE00]/15 text-[#D9DE00] hover:bg-[#D9DE00]/25 transition-colors disabled:opacity-50"
                                >
                                    {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                                    PNG
                                </button>
                            )}
                        </div>
                        <div className="p-4 md:p-8 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d] min-h-[250px] md:min-h-[400px]">
                            {image ? (
                                <div ref={canvasRef} style={{ position: "relative", display: "inline-block" }}>
                                    <img
                                        src={image}
                                        alt="Upload"
                                        crossOrigin="anonymous"
                                        style={{ maxWidth: 600, maxHeight: 500, display: "block" }}
                                    />
                                    {/* Watermark overlay */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            ...(position === "center"
                                                ? { top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(-30deg)" }
                                                : { bottom: 20, right: 20 }),
                                            opacity,
                                            pointerEvents: "none",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 8,
                                        }}
                                    >
                                        <img
                                            src={BRAND.logoTransparent}
                                            alt=""
                                            crossOrigin="anonymous"
                                            style={{ width: position === "center" ? 120 : 60, height: position === "center" ? 120 : 60, objectFit: "contain" }}
                                        />
                                        <div style={{
                                            fontFamily: BRAND.fonts.heading,
                                            fontSize: position === "center" ? 18 : 10,
                                            fontWeight: 800,
                                            color: "#fff",
                                            letterSpacing: 3,
                                            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                                        }}>
                                            MATRIX MULTITECH
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center gap-4 cursor-pointer text-white/20 hover:text-white/40 transition-colors">
                                    <Upload size={48} />
                                    <span className="text-sm font-raleway">Click to upload a photo</span>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                </label>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:w-[300px]">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">CONTROLS</span>
                        </div>
                        <div className="p-5 space-y-6">
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">UPLOAD PHOTO</label>
                                <label className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-lg py-3 cursor-pointer hover:bg-white/10 transition-colors text-sm text-white/50 font-raleway">
                                    <Upload size={16} />
                                    {image ? "Change Photo" : "Choose File"}
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                </label>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">
                                    OPACITY — {Math.round(opacity * 100)}%
                                </label>
                                <input
                                    type="range"
                                    min="0.05"
                                    max="0.5"
                                    step="0.05"
                                    value={opacity}
                                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                    className="w-full accent-[#D9DE00]"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">POSITION</label>
                                <div className="flex gap-2">
                                    {[
                                        { key: "center" as const, label: "Center" },
                                        { key: "bottom-right" as const, label: "Corner" },
                                    ].map((p) => (
                                        <button
                                            key={p.key}
                                            onClick={() => setPosition(p.key)}
                                            className={`flex-1 py-2.5 rounded-lg text-xs font-bold tracking-wider border transition-all ${
                                                position === p.key
                                                    ? "bg-[#D9DE00]/10 border-[#D9DE00]/30 text-[#D9DE00]"
                                                    : "bg-white/5 border-white/10 text-white/30 hover:text-white/50"
                                            }`}
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {image && (
                                <button
                                    onClick={() => downloadPng(canvasRef, "matrix-watermarked.png", 2)}
                                    disabled={isGenerating}
                                    className="w-full flex items-center justify-center gap-2 bg-[#D9DE00] text-black font-bold py-3 rounded-lg text-sm tracking-wider font-montserrat hover:bg-[#e5ea2a] transition-colors disabled:opacity-50"
                                >
                                    {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                                    DOWNLOAD
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
