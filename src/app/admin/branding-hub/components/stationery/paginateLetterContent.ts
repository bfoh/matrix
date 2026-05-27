"use client";

/**
 * Measure-based pagination for letterhead body content.
 * Splits a multi-line string into pages whose rendered height fits
 * the available body area of an A4 letterhead.
 */
export function paginateLetterContent(
    content: string,
    maxHeightPx: number,
    widthPx: number,
    fontFamily: string,
    fontSizePx = 12,
    lineHeight = 1.85,
): string[] {
    if (typeof document === "undefined" || !content) return [content || ""];

    const measurer = document.createElement("div");
    Object.assign(measurer.style, {
        position: "absolute",
        visibility: "hidden",
        left: "-10000px",
        top: "0",
        width: `${widthPx}px`,
        fontFamily,
        fontSize: `${fontSizePx}px`,
        lineHeight: String(lineHeight),
        whiteSpace: "pre-wrap",
        wordBreak: "normal",
        padding: "0",
        margin: "0",
        boxSizing: "border-box",
    });
    document.body.appendChild(measurer);

    const fits = (text: string) => {
        measurer.textContent = text;
        return measurer.offsetHeight <= maxHeightPx;
    };

    const lines = content.split("\n");
    const pages: string[] = [];
    let buf: string[] = [];

    for (const line of lines) {
        const trial = [...buf, line].join("\n");
        if (fits(trial)) {
            buf.push(line);
            continue;
        }
        if (buf.length === 0) {
            // Single line exceeds page — split by words as last resort
            const words = line.split(" ");
            let wbuf: string[] = [];
            for (const w of words) {
                const wTrial = [...wbuf, w].join(" ");
                if (fits(wTrial)) {
                    wbuf.push(w);
                } else {
                    if (wbuf.length > 0) pages.push(wbuf.join(" "));
                    wbuf = [w];
                }
            }
            if (wbuf.length > 0) buf = [wbuf.join(" ")];
            continue;
        }
        pages.push(buf.join("\n"));
        buf = [line];
    }
    if (buf.length > 0) pages.push(buf.join("\n"));

    document.body.removeChild(measurer);
    return pages.length > 0 ? pages : [content];
}
