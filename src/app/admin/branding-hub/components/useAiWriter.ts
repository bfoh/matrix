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
            setMessages((prev) => [...prev, { role: "user", content: prompt }]);

            let fullText = "";

            try {
                const response = await fetch("/api/ai/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt, materialType, tone, action }),
                });

                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.error || "Failed to generate");
                }

                const reader = response.body?.getReader();
                if (!reader) throw new Error("No response stream");

                const decoder = new TextDecoder();

                // Add a placeholder assistant message that we'll update
                setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

                    for (const line of lines) {
                        const data = line.slice(6);
                        if (data === "[DONE]") break;

                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.text) {
                                fullText += parsed.text;
                                // Update the last message with streaming content
                                setMessages((prev) => {
                                    const updated = [...prev];
                                    updated[updated.length - 1] = {
                                        role: "assistant",
                                        content: fullText,
                                    };
                                    return updated;
                                });
                            }
                        } catch {
                            // skip malformed chunks
                        }
                    }
                }

                setLastGenerated(fullText);
            } catch (error) {
                const errMsg = error instanceof Error ? error.message : "An error occurred";
                setMessages((prev) => {
                    // Replace or add the assistant message with error
                    const updated = [...prev];
                    if (updated.length > 0 && updated[updated.length - 1].role === "assistant" && updated[updated.length - 1].content === "") {
                        updated[updated.length - 1] = { role: "assistant", content: `Error: ${errMsg}` };
                    } else {
                        updated.push({ role: "assistant", content: `Error: ${errMsg}` });
                    }
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
