"use client";

import { useState, RefObject } from "react";
import html2canvas from "html2canvas";
import { ensureFontsForCapture } from "./loadFontsForCapture";

function captureElement(el: HTMLElement, scale: number) {
    return html2canvas(el, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        onclone: (_clonedDoc, clonedEl) => {
            // Remove CSS transforms on ancestors so html2canvas
            // reads correct dimensions and text metrics
            let parent = clonedEl.parentElement;
            while (parent) {
                if (parent.style.transform && parent.style.transform !== "none") {
                    parent.style.transform = "none";
                }
                parent = parent.parentElement;
            }
            
            // Force geometric precision to avoid text mangling/overlapping
            clonedEl.style.textRendering = "geometricPrecision";
            const allElements = clonedEl.querySelectorAll('*') as NodeListOf<HTMLElement>;
            allElements.forEach(el => {
                el.style.textRendering = "geometricPrecision";
            });
        },
    });
}

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
            await ensureFontsForCapture();
            const canvas = await captureElement(ref.current, scale);

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
        await ensureFontsForCapture();
        return captureElement(ref.current, scale);
    };

    return { downloadPng, getCanvas, isGenerating };
}
