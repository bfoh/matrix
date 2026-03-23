"use client";

import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import { Mic, Square, Loader2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "");

const BAR_HEIGHTS = [0.45, 0.75, 1, 0.85, 0.6, 0.9, 0.55];

export default function VoiceWidget() {
    const [status, setStatus] = useState<"idle" | "loading" | "active">("idle");
    const [volume, setVolume] = useState(0);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
            console.error("Vapi Public Key is missing from environment variables.");
        }

        const onCallStart = () => setStatus("active");
        const onCallEnd = () => setStatus("idle");
        const onVolumeLevel = (level: number) => setVolume(level);
        const onError = (e: any) => { console.error("Vapi Error:", e); setStatus("idle"); };

        vapi.on("call-start", onCallStart);
        vapi.on("call-end", onCallEnd);
        vapi.on("volume-level", onVolumeLevel);
        vapi.on("error", onError);
        return () => {
            vapi.off("call-start", onCallStart);
            vapi.off("call-end", onCallEnd);
            vapi.off("volume-level", onVolumeLevel);
            vapi.off("error", onError);
        };
    }, []);

    const toggleCall = async () => {
        if (status === "active") {
            vapi.stop();
        } else {
            setStatus("loading");
            try {
                const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
                if (assistantId) {
                    await vapi.start(assistantId);
                } else {
                    await vapi.start({
                        name: "Matrix Assistant",
                        voice: { provider: "11labs", voiceId: "cjVigY5qzO86HufZ10ce" },
                        model: {
                            provider: "openai",
                            model: "gpt-4o",
                            messages: [{
                                role: "system" as const,
                                content: "You are the primary AI assistant for Matrix MultiTech Limited, a premium luxury real estate and construction firm in Ghana. You sound professional, friendly, and very helpful. Direct users to the info they need. Give concise, conversational answers."
                            }]
                        }
                    } as any);
                }
            } catch (err) {
                console.error("Failed to start Vapi call:", err);
                setStatus("idle");
            }
        }
    };

    /* ── Collapsed mini pill ── */
    if (collapsed) {
        return (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="fixed bottom-6 right-6 z-50"
            >
                <button
                    onClick={() => setCollapsed(false)}
                    title="Open Matrix AI"
                    className="relative flex items-center gap-2.5 bg-[#0a0a0a] border border-primary/40 text-primary px-4 py-3 rounded-full shadow-xl hover:border-primary hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all duration-300"
                >
                    <motion.span
                        animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full bg-primary/20 pointer-events-none"
                    />
                    <Mic className="w-4 h-4" />
                    <span className="text-[10px] font-montserrat font-bold tracking-[0.25em] uppercase">
                        Matrix AI
                    </span>
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[260px]"
        >
            {/* Ambient glow behind the card */}
            <div
                className={`absolute -inset-4 rounded-3xl blur-2xl pointer-events-none transition-opacity duration-700 ${
                    status === "active" ? "bg-primary/20 opacity-100" : "bg-primary/8 opacity-70"
                }`}
            />

            {/* Card */}
            <div
                className={`relative rounded-2xl overflow-hidden shadow-2xl border transition-all duration-500 ${
                    status === "active"
                        ? "border-primary/60 bg-[#0c0c0c]"
                        : "border-white/10 bg-[#0a0a0a] hover:border-primary/25"
                }`}
            >
                {/* Top bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-gradient-to-r from-primary/10 to-transparent">
                    <div className="flex items-center gap-2.5">
                        <div
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                status === "active"
                                    ? "bg-primary shadow-[0_0_6px_rgba(201,168,76,0.9)] animate-pulse"
                                    : status === "loading"
                                    ? "bg-primary/60 animate-pulse"
                                    : "bg-primary/40"
                            }`}
                        />
                        <span className="text-[10px] font-montserrat font-bold tracking-[0.3em] text-primary uppercase">
                            Matrix AI
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            className={`text-[9px] font-raleway font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                                status === "active"
                                    ? "text-primary animate-pulse"
                                    : status === "loading"
                                    ? "text-white/50"
                                    : "text-white/30"
                            }`}
                        >
                            {status === "active" ? "● Listening" : status === "loading" ? "◌ Connecting" : "AI Assistant"}
                        </span>
                        <button
                            onClick={() => setCollapsed(true)}
                            aria-label="Minimise"
                            className="text-white/20 hover:text-white/60 transition-colors duration-200 ml-1"
                        >
                            <ChevronDown size={12} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="px-4 py-4 flex items-center gap-4">

                    {/* Left: label / waveform */}
                    <div className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            {status === "active" ? (
                                <motion.div
                                    key="bars"
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-end gap-[3px] h-9"
                                >
                                    {BAR_HEIGHTS.map((base, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-[5px] bg-gradient-to-t from-primary to-primary-light rounded-full"
                                            animate={{
                                                height: [
                                                    `${Math.max(6, base * 36 * (0.4 + volume))}px`,
                                                    `${Math.max(6, base * 36)}px`,
                                                ],
                                            }}
                                            transition={{
                                                duration: 0.25 + i * 0.04,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                                ease: "easeInOut",
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="label"
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className="text-white/85 text-[13px] font-montserrat font-bold leading-tight">
                                        Talk to our AI
                                    </p>
                                    <p className="text-white/35 text-[10px] font-raleway tracking-wide mt-1 leading-snug">
                                        Properties · Pricing · Viewing
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right: mic button with pulsing rings */}
                    <div className="relative flex-shrink-0">
                        {status === "idle" && (
                            <>
                                <motion.span
                                    animate={{ scale: [1, 2.1], opacity: [0.55, 0] }}
                                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                                    className="absolute inset-0 rounded-full bg-primary/30 pointer-events-none"
                                />
                                <motion.span
                                    animate={{ scale: [1, 2.7], opacity: [0.3, 0] }}
                                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                                    className="absolute inset-0 rounded-full bg-primary/20 pointer-events-none"
                                />
                            </>
                        )}

                        <button
                            onClick={toggleCall}
                            title={status === "active" ? "End call" : "Talk to Matrix AI"}
                            className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                                status === "active"
                                    ? "bg-primary text-black shadow-[0_0_24px_rgba(201,168,76,0.55)]"
                                    : status === "loading"
                                    ? "bg-[#151515] border border-primary/30 text-primary"
                                    : "bg-primary/10 border border-primary/40 text-primary hover:bg-primary/20 hover:shadow-[0_0_18px_rgba(201,168,76,0.3)]"
                            }`}
                        >
                            {status === "loading" ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : status === "active" ? (
                                <Square className="w-4 h-4 fill-current" />
                            ) : (
                                <Mic className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Bottom gold accent line */}
                <div
                    className={`h-[2px] w-full transition-all duration-500 ${
                        status === "active"
                            ? "bg-gradient-to-r from-primary via-primary-light to-primary"
                            : "bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                    }`}
                />
            </div>
        </motion.div>
    );
}
