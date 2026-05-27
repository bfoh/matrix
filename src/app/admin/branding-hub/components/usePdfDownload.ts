"use client";

import { useState, RefObject } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { ensureFontsForCapture } from "./loadFontsForCapture";

interface PdfOptions {
    orientation?: "portrait" | "landscape";
    widthInches: number;
    heightInches: number;
    scale?: number;
    filename: string;
}

/**
 * Walks up the DOM tree from `el` and collects any CSS transforms
 * applied by ancestor elements so we can temporarily strip them.
 * html-to-image (and html2canvas before it) measure elements in the
 * context of the *cloned* document, so scaled previews confuse it.
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

export function usePdfDownload() {
    const [isGenerating, setIsGenerating] = useState(false);

    const downloadPdf = async (
        ref: RefObject<HTMLDivElement | null>,
        options: PdfOptions
    ) => {
        if (!ref.current) return;
        setIsGenerating(true);

        try {
            const { orientation = "portrait", widthInches, heightInches, scale = 3, filename } = options;

            await ensureFontsForCapture();

            // Temporarily remove ancestor transforms so pixel dimensions are accurate
            const saved = stripAncestorTransforms(ref.current);

            const pixelRatio = scale;
            const imgData = await toPng(ref.current, {
                pixelRatio,
                cacheBust: true,
                // Inline all font-face rules so the SVG foreignObject can use them
                includeQueryParams: true,
            });

            // Restore transforms immediately
            restoreTransforms(saved);

            const pdf = new jsPDF({
                orientation,
                unit: "in",
                format: [widthInches, heightInches],
            });

            pdf.addImage(imgData, "PNG", 0, 0, widthInches, heightInches);
            pdf.save(filename);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Error generating PDF. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadMultiPagePdf = async (
        elements: (HTMLElement | null)[],
        options: PdfOptions
    ) => {
        const valid = elements.filter((el): el is HTMLElement => !!el);
        if (valid.length === 0) return;
        setIsGenerating(true);

        try {
            const { orientation = "portrait", widthInches, heightInches, scale = 3, filename } = options;
            await ensureFontsForCapture();

            const pdf = new jsPDF({
                orientation,
                unit: "in",
                format: [widthInches, heightInches],
            });

            for (let i = 0; i < valid.length; i++) {
                const el = valid[i];
                const saved = stripAncestorTransforms(el);
                const imgData = await toPng(el, {
                    pixelRatio: scale,
                    cacheBust: true,
                    includeQueryParams: true,
                });
                restoreTransforms(saved);

                if (i > 0) pdf.addPage([widthInches, heightInches], orientation);
                pdf.addImage(imgData, "PNG", 0, 0, widthInches, heightInches);
            }

            pdf.save(filename);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Error generating PDF. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return { downloadPdf, downloadMultiPagePdf, isGenerating };
}
