"use client";

import { useState, RefObject } from "react";
import html2canvas from "html2canvas";

export function useCanvasDownload() {
    const [isGenerating, setIsGenerating] = useState(false);

    const downloadPng = async (
        ref: RefObject<HTMLDivElement | null>,
        filename: string,
        scale: number = 2
    ) => {
        if (!ref.current) return;
        setIsGenerating(true);

        try {
            const canvas = await html2canvas(ref.current, {
                scale,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: false,
            });

            canvas.toBlob((blob) => {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            }, "image/png", 1.0);
        } catch (error) {
            console.error("Error generating PNG:", error);
            alert("Error generating image. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const getCanvas = async (
        ref: RefObject<HTMLDivElement | null>,
        scale: number = 3
    ): Promise<HTMLCanvasElement | null> => {
        if (!ref.current) return null;

        return html2canvas(ref.current, {
            scale,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            logging: false,
        });
    };

    return { downloadPng, getCanvas, isGenerating };
}
