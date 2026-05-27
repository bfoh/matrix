"use client";

import { useState, RefObject } from "react";
import { toJpeg } from "html-to-image";
import { jsPDF } from "jspdf";
import { ensureFontsForCapture } from "./loadFontsForCapture";

interface PdfOptions {
    orientation?: "portrait" | "landscape";
    widthInches: number;
    heightInches: number;
    scale?: number;
    filename: string;
    /** JPEG quality 0-1. Default 0.92 — visually lossless for text/UI. */
    quality?: number;
}

const DEFAULT_QUALITY = 0.92;
const JPEG_BG = "#ffffff";

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
            const { orientation = "portrait", widthInches, heightInches, scale = 3, filename, quality = DEFAULT_QUALITY } = options;

            await ensureFontsForCapture();

            // Temporarily remove ancestor transforms so pixel dimensions are accurate
            const saved = stripAncestorTransforms(ref.current);

            const imgData = await toJpeg(ref.current, {
                pixelRatio: scale,
                quality,
                backgroundColor: JPEG_BG,
                cacheBust: true,
                includeQueryParams: true,
            });

            // Restore transforms immediately
            restoreTransforms(saved);

            const pdf = new jsPDF({
                orientation,
                unit: "in",
                format: [widthInches, heightInches],
                compress: true,
            });

            pdf.addImage(imgData, "JPEG", 0, 0, widthInches, heightInches, undefined, "FAST");
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
            const { orientation = "portrait", widthInches, heightInches, scale = 3, filename, quality = DEFAULT_QUALITY } = options;
            await ensureFontsForCapture();

            const pdf = new jsPDF({
                orientation,
                unit: "in",
                format: [widthInches, heightInches],
                compress: true,
            });

            for (let i = 0; i < valid.length; i++) {
                const el = valid[i];
                const saved = stripAncestorTransforms(el);
                const imgData = await toJpeg(el, {
                    pixelRatio: scale,
                    quality,
                    backgroundColor: JPEG_BG,
                    cacheBust: true,
                    includeQueryParams: true,
                });
                restoreTransforms(saved);

                if (i > 0) pdf.addPage([widthInches, heightInches], orientation);
                pdf.addImage(imgData, "JPEG", 0, 0, widthInches, heightInches, undefined, "FAST");
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
