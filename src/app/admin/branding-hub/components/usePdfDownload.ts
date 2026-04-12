"use client";

import { useState, RefObject } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface PdfOptions {
    orientation?: "portrait" | "landscape";
    widthInches: number;
    heightInches: number;
    scale?: number;
    filename: string;
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

            const canvas = await html2canvas(ref.current, {
                scale,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: false,
            });

            const imgData = canvas.toDataURL("image/png", 1.0);

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

    return { downloadPdf, isGenerating };
}
