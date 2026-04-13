"use client";

import { useState, useCallback } from "react";

export interface AiMessage {
    role: "user" | "assistant";
    content: string;
}

export type AiAction = "generate" | "refine" | "shorten" | "change-tone";
export type AiTone = "formal" | "persuasive" | "friendly" | "urgent";

export function useAiWriter(materialType: string) {
    const [messages, setMessages] = useState<AiMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastGenerated, setLastGenerated] = useState<string>("");

    const generate = useCallback(
        async (prompt: string, action: AiAction = "generate", tone: AiTone = "formal") => {
            setIsLoading(true);
            setMessages((prev) => [
                ...prev,
                { role: "user", content: prompt },
                { role: "assistant", content: "" },
            ]);

            let fullText = "";

            try {
                const response = await fetch("/api/ai/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt, materialType, tone, action }),
                });

                if (!response.ok) {
                    let errMsg = "Failed to generate";
                    try {
                        const err = await response.json();
                        errMsg = err.error || errMsg;
                    } catch {
                        errMsg = `Server error (${response.status})`;
                    }
                    throw new Error(errMsg);
                }

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                fullText = data.text || "";
                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                        role: "assistant",
                        content: fullText,
                    };
                    return updated;
                });
                setLastGenerated(fullText);
            } catch (error) {
                const errMsg = error instanceof Error ? error.message : "An error occurred";
                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                        role: "assistant",
                        content: `Error: ${errMsg}`,
                    };
                    return updated;
                });
            } finally {
                setIsLoading(false);
            }

            return fullText;
        },
        [materialType]
    );

    const clearMessages = useCallback(() => {
        setMessages([]);
        setLastGenerated("");
    }, []);

    return { messages, generate, isLoading, lastGenerated, clearMessages };
}
