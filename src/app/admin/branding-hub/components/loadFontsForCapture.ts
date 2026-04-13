"use client";

/**
 * next/font/google loads Montserrat and Raleway with hashed names
 * (e.g. __Montserrat_abc123) and maps them to CSS variables.
 *
 * html2canvas renders text by looking up font-family names directly.
 * The templates use fontFamily: "Montserrat, sans-serif" which doesn't
 * match the hashed names, so html2canvas falls back to sans-serif.
 *
 * This module injects @font-face rules that register "Montserrat" and
 * "Raleway" as font-family names pointing to Google Fonts CDN,
 * making them available to html2canvas's rendering engine.
 */

const FONT_CSS_URL =
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Raleway:wght@400;500;600;700;800&display=swap";

let fontsLoaded = false;
let loadPromise: Promise<void> | null = null;

export async function ensureFontsForCapture(): Promise<void> {
    if (fontsLoaded) return;
    if (loadPromise) return loadPromise;

    loadPromise = (async () => {
        // Check if the link is already in the document
        const existing = document.querySelector(`link[href="${FONT_CSS_URL}"]`);
        if (!existing) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = FONT_CSS_URL;
            document.head.appendChild(link);

            // Wait for the stylesheet to load
            await new Promise<void>((resolve, reject) => {
                link.onload = () => resolve();
                link.onerror = () => reject(new Error("Failed to load font CSS"));
                // Timeout fallback - increased to 5 seconds
                setTimeout(resolve, 5000);
            });
        }

        // Wait for all font faces to finish loading
        if (document.fonts?.ready) {
            await document.fonts.ready;
        }

        // Explicitly load the specific weights we use - added more critical weights
        const fontLoads = [
            '400 16px "Raleway"',
            '500 16px "Raleway"',
            '600 16px "Raleway"',
            '700 16px "Raleway"',
            '400 16px "Montserrat"',
            '600 16px "Montserrat"',
            '700 16px "Montserrat"',
            '800 16px "Montserrat"',
            '900 16px "Montserrat"',
        ].map((font) =>
            document.fonts.load(font).catch(() => {
                /* ignore individual failures */
            })
        );
        
        await Promise.all(fontLoads);
        
        // Final safety delay for browser to propagate fonts to canvas engine
        await new Promise(resolve => setTimeout(resolve, 500));

        fontsLoaded = true;
    })();

    return loadPromise;
}
