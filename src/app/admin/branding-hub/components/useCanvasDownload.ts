"use client";

import { useState, RefObject } from "react";
import { toPng, toCanvas } from "html-to-image";
import { ensureFontsForCapture } from "./loadFontsForCapture";

/**
 * Temporarily strips CSS transforms from ancestor elements so that
 * html-to-image measures the element at its actual pixel dimensions
 * instead of the scaled-down preview size.
 */
function stripAncestorTransforms(el: HTMLElement): Array<{ element: HTMLElement; original: string }> {
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
    return saved;
}

function restoreTransforms(saved: Array<{ element: HTMLElement; original: string }>) {
    saved.forEach(({ element, original }) => {
        element.style.transform = original;
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

            // Temporarily remove ancestor transforms
            const saved = stripAncestorTransforms(ref.current);

            const dataUrl = await toPng(ref.current, {
                pixelRatio: scale,
                cacheBust: true,
                includeQueryParams: true,
            });

            // Restore transforms immediately
            restoreTransforms(saved);

            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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

        const saved = stripAncestorTransforms(ref.current);
        const canvas = await toCanvas(ref.current, {
            pixelRatio: scale,
            cacheBust: true,
            includeQueryParams: true,
        });
        restoreTransforms(saved);
        return canvas;
    };

    return { downloadPng, getCanvas, isGenerating };
}
