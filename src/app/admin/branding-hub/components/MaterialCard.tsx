"use client";

import { MaterialInfo } from "./brandConstants";

interface MaterialCardProps {
    material: MaterialInfo;
    onClick: () => void;
    thumbnail?: React.ReactNode;
}

export default function MaterialCard({ material, onClick, thumbnail }: MaterialCardProps) {
    return (
        <div
            onClick={onClick}
            className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 bg-white/[0.02] border border-white/[0.06] hover:-translate-y-1.5 hover:border-[#D9DE00]/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(217,222,0,0.06)]"
        >
            {/* Glow effect on hover */}
            <div className="absolute top-0 left-0 right-0 h-[120px] bg-gradient-to-b from-[#D9DE00]/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[1]" />

            {/* Preview area */}
            <div className="h-[180px] flex items-center justify-center p-6 relative bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]">
                {thumbnail}
                <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#D9DE00]/20 to-transparent" />
            </div>

            {/* Info */}
            <div className="p-[18px_20px_20px] relative z-[2]">
                <div className="font-montserrat text-[14px] font-bold text-white tracking-[1px]">
                    {material.name}
                </div>
                <div className="text-[11px] text-white/35 mt-1.5 leading-relaxed">
                    {material.description}
                </div>
                <div className="flex gap-1.5 mt-3">
                    {material.formats.map((fmt) => (
                        <span
                            key={fmt}
                            className={`text-[9px] font-bold tracking-[1.5px] uppercase px-2.5 py-1 rounded ${
                                fmt === "png"
                                    ? "bg-[#D9DE00]/10 text-[#D9DE00] border border-[#D9DE00]/20"
                                    : fmt === "pdf"
                                    ? "bg-red-500/10 text-red-500 border border-red-500/20"
                                    : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                            }`}
                        >
                            {fmt}
                        </span>
                    ))}
                    {material.aiEnabled && (
                        <span className="text-[9px] font-bold tracking-[1.5px] uppercase px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            AI
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
