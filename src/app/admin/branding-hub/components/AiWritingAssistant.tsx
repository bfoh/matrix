"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, Send, Trash2 } from "lucide-react";
import { useAiWriter, AiTone, AiAction } from "./useAiWriter";

interface AiWritingAssistantProps {
    materialType: string;
    onApply: (text: string) => void;
}

const QUICK_ACTIONS: { label: string; icon: string; action: AiAction; promptPrefix?: string }[] = [
    { label: "Write Letter", icon: "✉", action: "generate", promptPrefix: "Write a professional letter: " },
    { label: "Marketing Copy", icon: "🎯", action: "generate", promptPrefix: "Write catchy marketing copy: " },
    { label: "Proposal", icon: "📋", action: "generate", promptPrefix: "Write a business proposal section: " },
    { label: "Refine Text", icon: "✏️", action: "refine" },
    { label: "Make Shorter", icon: "✂️", action: "shorten" },
];

const TONES: { key: AiTone; label: string }[] = [
    { key: "formal", label: "Formal" },
    { key: "persuasive", label: "Persuasive" },
    { key: "friendly", label: "Friendly" },
    { key: "urgent", label: "Urgent" },
];

export default function AiWritingAssistant({ materialType, onApply }: AiWritingAssistantProps) {
    const { messages, generate, isLoading, lastGenerated, clearMessages } = useAiWriter(materialType);
    const [input, setInput] = useState("");
    const [tone, setTone] = useState<AiTone>("formal");
    const [activeAction, setActiveAction] = useState<AiAction>("generate");
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Auto-apply AI-generated text to the editor when generation completes
    useEffect(() => {
        if (!isLoading && lastGenerated) {
            onApply(cleanAiResponse(lastGenerated));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, lastGenerated]);

    const cleanAiResponse = (text: string) => {
        // Remove common AI preambles and postambles
        let cleaned = text.trim();
        
        // Remove leading conversational fillers
        cleaned = cleaned.replace(/^(Certainly!|Here's|Here is|Sure,|Absolutely!|I've generated|I can help with that|Below is|I have written).*/i, "").trim();
        
        // If the above regex removed too much (like the first sentence), we might need a more surgical approach
        // But usually, AI says "Certainly! Here is your letter: \n\n Dear..."
        // So we look for the first occurrence of "Dear", "Subject", "Title", or double newlines after common phrases
        
        const preambles = [
            /certainly[!\.]?/i,
            /here (is|are) your[a-z\s]+[!\.\:]?/i,
            /sure[!\.]?/i,
            /absolutely[!\.]?/i,
            /i('ve| have) generated[a-z\s]+[!\.\:]/i,
            /i('ve| have) (written|drafted)[a-z\s]+[!\.\:]/i,
            /i can (help|assist) with that[!\.]?/i,
            /below is (the|a)[a-z\s]+[!\.\:]?/i
        ];

        let lines = cleaned.split("\n");
        let startIdx = 0;

        // Skip the first few lines if they match preambles and are followed by an empty line or a formal start
        for (let i = 0; i < Math.min(lines.length, 3); i++) {
            if (preambles.some(regex => regex.test(lines[i]))) {
                startIdx = i + 1;
                // If the next line is empty, skip it too
                if (lines[startIdx] === "") startIdx++;
            } else {
                break;
            }
        }

        return lines.slice(startIdx).join("\n").trim();
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        const prompt = input.trim();
        setInput("");
        await generate(prompt, activeAction, tone);
    };

    const handleApply = (text: string) => {
        onApply(cleanAiResponse(text));
    };

    const handleQuickAction = (action: typeof QUICK_ACTIONS[number]) => {
        setActiveAction(action.action);
        if (action.promptPrefix) {
            setInput(action.promptPrefix);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="rounded-xl border border-[#D9DE00]/12 bg-gradient-to-b from-[#D9DE00]/[0.03] to-black/90 flex flex-col h-full min-h-[400px] md:min-h-0 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#D9DE00]/10 bg-gradient-to-r from-[#D9DE00]/[0.06] to-transparent">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#D9DE00] to-[#b8bd00] flex items-center justify-center text-[12px] text-black font-black">
                            ✦
                        </div>
                        <span className="font-montserrat text-[13px] font-extrabold tracking-[2px] text-[#D9DE00]">
                            AI ASSISTANT
                        </span>
                    </div>
                    {messages.length > 0 && (
                        <button
                            onClick={clearMessages}
                            className="text-white/20 hover:text-white/50 transition-colors"
                            title="Clear chat"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                </div>
                <p className="text-[11px] text-white/30 mt-1.5 leading-relaxed">
                    Powered by Claude — expert in real estate marketing & professional correspondence
                </p>
            </div>

            {/* Quick Actions */}
            <div className="px-5 py-3 border-b border-white/[0.05]">
                <div className="text-[9px] tracking-[2px] font-bold text-white/20 mb-2">QUICK ACTIONS</div>
                <div className="flex flex-wrap gap-1.5">
                    {QUICK_ACTIONS.map((action) => (
                        <button
                            key={action.label}
                            onClick={() => handleQuickAction(action)}
                            className={`text-[10px] font-semibold px-3 py-1.5 rounded-md border transition-all ${
                                activeAction === action.action
                                    ? "border-[#D9DE00]/30 text-[#D9DE00] bg-[#D9DE00]/[0.06]"
                                    : "border-white/[0.08] text-white/40 bg-white/[0.02] hover:border-[#D9DE00]/20 hover:text-[#D9DE00]"
                            }`}
                        >
                            {action.icon} {action.label}
                        </button>
                    ))}
                </div>
                <div className="flex gap-1.5 mt-2.5">
                    {TONES.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTone(t.key)}
                            className={`text-[9px] font-semibold tracking-[1px] px-2.5 py-1 rounded-full border transition-all ${
                                tone === t.key
                                    ? "border-[#D9DE00]/30 text-[#D9DE00] bg-[#D9DE00]/[0.06]"
                                    : "border-white/[0.08] text-white/25 hover:text-white/40"
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 min-h-0">
                {messages.length === 0 && (
                    <div className="text-center py-8">
                        <div className="text-[24px] mb-3">✦</div>
                        <p className="text-[12px] text-white/25 font-raleway leading-relaxed max-w-[250px] mx-auto">
                            Describe what you want to write and I&apos;ll generate professional content for your {materialType.replace("-", " ")}.
                        </p>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div key={i} className={`relative ${msg.role === "user" ? "ml-5" : ""}`}>
                        {msg.role === "assistant" && (
                            <span className="absolute -left-4 top-3 text-[10px] text-[#D9DE00]">✦</span>
                        )}
                        <div
                            className={`px-4 py-3 rounded-lg text-[12px] leading-relaxed ${
                                msg.role === "user"
                                    ? "bg-white/[0.04] border border-white/[0.08] text-white/60"
                                    : "bg-[#D9DE00]/[0.04] border border-[#D9DE00]/[0.08] text-white/70"
                            }`}
                        >
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                            {msg.role === "assistant" && msg.content && !isLoading && (
                                <button
                                    onClick={() => handleApply(msg.content)}
                                    className="mt-2 text-[9px] font-bold tracking-[1px] text-[#D9DE00] hover:text-[#e5ea2a] transition-colors flex items-center gap-1"
                                >
                                    → APPLY TO EDITOR
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {isLoading && messages.length > 0 && messages[messages.length - 1].content === "" && (
                    <div className="flex items-center gap-2 text-[11px] text-[#D9DE00]/50">
                        <Loader2 size={12} className="animate-spin" />
                        Generating...
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="px-5 py-4 border-t border-white/[0.06] bg-white/[0.01]">
                <div className="flex gap-2 items-end">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Describe what you want to write..."
                        rows={2}
                        className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-[12px] text-white font-raleway placeholder:text-white/20 focus:border-[#D9DE00]/30 focus:outline-none resize-none"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D9DE00] to-[#b8bd00] flex items-center justify-center flex-shrink-0 hover:shadow-[0_0_20px_rgba(217,222,0,0.2)] transition-shadow disabled:opacity-30"
                    >
                        {isLoading ? (
                            <Loader2 size={16} className="animate-spin text-black" />
                        ) : (
                            <Send size={16} className="text-black" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
