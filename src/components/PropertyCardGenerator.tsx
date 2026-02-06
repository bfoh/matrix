"use client";

import { useRef, useState } from "react";
import { Download, Loader2, Film } from "lucide-react";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";
import * as Mp4Muxer from "mp4-muxer";

interface PropertyCardGeneratorProps {
    property: {
        id: string;
        title: string;
        address: string;
        price: string;
        image: string;
        images?: string[];
        bedrooms?: number;
        bathrooms?: number;
        area_sqm?: number;
        status?: string;
    };
}

export default function PropertyCardGenerator({ property }: PropertyCardGeneratorProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatingProgress, setGeneratingProgress] = useState("");
    const [slideshowImage, setSlideshowImage] = useState<string | null>(null);

    // Construct property URL for QR code
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.matrixmultitech.net";
    const propertyUrl = `${baseUrl}/properties/${property.id}`;

    const generateCard = async () => {
        if (!cardRef.current) return;

        setIsGenerating(true);
        setGeneratingProgress("Generating Image...");

        try {
            const canvas = await html2canvas(cardRef.current, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: "#000000",
                logging: false,
            });

            canvas.toBlob((blob) => {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `${property.title.replace(/\s+/g, "-").toLowerCase()}-property-card.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, "image/png", 1.0);
        } catch (error) {
            console.error("Error generating card:", error);
            alert("Error generating card. Please try again.");
        } finally {
            setIsGenerating(false);
            setGeneratingProgress("");
        }
    };

    const generateSlideshow = async () => {
        if (!cardRef.current) return;

        // Use property images or just single image if that's all we have
        const imagesToUse = property.images && property.images.length > 0
            ? property.images
            : [property.image];

        if (imagesToUse.length === 0) return;

        setIsGenerating(true);

        try {
            // Configuration
            const width = 1080; // High quality
            const height = 1080;
            const fps = 15; // Optimized for speed (was 30)
            const durationPerSlide = 3; // Seconds per slide
            const framesPerSlide = fps * durationPerSlide;

            const muxer = new Mp4Muxer.Muxer({
                target: new Mp4Muxer.ArrayBufferTarget(),
                video: {
                    codec: 'avc',
                    width,
                    height,
                },
                fastStart: 'in-memory',
            });

            const videoEncoder = new VideoEncoder({
                output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
                error: (e) => console.error(e),
            });

            videoEncoder.configure({
                codec: 'avc1.4d002a', // H.264 Main Profile Level 4.2
                width,
                height,
                bitrate: 2_500_000, // Reduced bitrate for faster processing (was 5M)
                framerate: fps,
                latencyMode: 'realtime', // Optimize encoding speed
            });

            // Preload all images first to ensure smooth generation
            setGeneratingProgress("Preloading images...");
            await Promise.all(imagesToUse.map(src => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = resolve; // Continue even if one fails
                });
            }));

            // Loop through each image
            for (let i = 0; i < imagesToUse.length; i++) {
                const imgUrl = imagesToUse[i];
                setGeneratingProgress(`Processing slide ${i + 1}/${imagesToUse.length}`);

                // Set the image on the card
                setSlideshowImage(imgUrl);

                // Wait for image to load/render
                // Reduced wait time significantly (800ms -> 200ms)
                await new Promise(resolve => setTimeout(resolve, 200));

                // Capture the card
                const canvas = await html2canvas(cardRef.current, {
                    scale: width / 600, // Scale to match target video size (card is 600px)
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: "#000000",
                    logging: false,
                });

                // Add frames for this slide
                for (let f = 0; f < framesPerSlide; f++) {
                    const timestamp = (i * durationPerSlide * 1000000) + (f * (1000000 / fps));

                    const frame = new VideoFrame(canvas, {
                        timestamp: timestamp,
                        duration: 1000000 / fps, // microseconds
                        alpha: 'discard'
                    });

                    // Force keyframe on the first frame of each new slide for better seeking/quality
                    const keyFrame = f === 0;

                    videoEncoder.encode(frame, { keyFrame });
                    frame.close();
                }
            }

            setGeneratingProgress("Finalizing Video...");

            // Flush encoder to ensure all frames are processed
            await videoEncoder.flush();

            // Finish muxing
            muxer.finalize();

            const { buffer } = muxer.target;
            const blob = new Blob([buffer], { type: 'video/mp4' });

            // Download
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${property.title.replace(/\s+/g, "-").toLowerCase()}-slideshow.mp4`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Error generating slideshow:", error);
            const msg = error instanceof Error ? error.message : "Unknown error";
            alert(`Error generating slideshow: ${msg}. Note: This feature requires a modern browser (Chrome 94+, Edge 94+, Firefox 123+, Safari 16.4+).`);
        } finally {
            setIsGenerating(false);
            setGeneratingProgress("");
            setSlideshowImage(null); // Reset to default
        }
    };

    const displayedImage = slideshowImage || property.images?.[0] || property.image;

    // Helper to format area - ensure it doesn't show 0 if not set
    const formattedArea = property.area_sqm && property.area_sqm > 0 ? `${property.area_sqm} m²` : null;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Control Buttons Area */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {/* Download Image Button */}
                <button
                    onClick={generateCard}
                    disabled={isGenerating}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        background: "linear-gradient(135deg, #333 0%, #000 100%)",
                        color: "#fff",
                        padding: "14px 28px",
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "bold",
                        fontSize: "13px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        border: "1px solid #333",
                        cursor: isGenerating ? "not-allowed" : "pointer",
                        opacity: isGenerating ? 0.6 : 1,
                        borderRadius: "4px",
                        flex: 1,
                        justifyContent: "center",
                        minWidth: "200px"
                    }}
                >
                    {isGenerating && generatingProgress.includes("Image") ? (
                        <>
                            <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Download size={18} />
                            Download Card
                        </>
                    )}
                </button>

                {/* Generate Slideshow Button */}
                <button
                    onClick={generateSlideshow}
                    disabled={isGenerating}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        background: "linear-gradient(135deg, #D9DE00 0%, #c4c900 100%)",
                        color: "#000000",
                        padding: "14px 28px",
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "bold",
                        fontSize: "13px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        border: "none",
                        cursor: isGenerating ? "not-allowed" : "pointer",
                        opacity: isGenerating ? 0.6 : 1,
                        borderRadius: "4px",
                        boxShadow: "0 4px 15px rgba(217, 222, 0, 0.3)",
                        flex: 1,
                        justifyContent: "center",
                        minWidth: "200px"
                    }}
                >
                    {isGenerating && !generatingProgress.includes("Image") ? (
                        <>
                            <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                            {generatingProgress || "Generating..."}
                        </>
                    ) : (
                        <>
                            <Film size={18} />
                            Download Slideshow
                        </>
                    )}
                </button>
            </div>

            {/* Premium Property Card Template */}
            <div
                ref={cardRef}
                style={{
                    width: "600px",
                    height: "600px",
                    backgroundColor: "#0a0a0a",
                    position: "relative",
                    overflow: "hidden",
                    fontFamily: "Arial, Helvetica, sans-serif",
                }}
            >
                {/* Background Image with Premium Overlay */}
                <img
                    src={displayedImage}
                    alt={property.title}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "60%",
                        objectFit: "cover",
                        transition: "opacity 0.3s ease-in-out" // Smooth transition for preview
                    }}
                    crossOrigin="anonymous"
                />

                {/* Sophisticated Gradient Overlay */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "60%",
                        background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)",
                    }}
                />

                {/* Top Bar with Logo and Status */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        padding: "24px 28px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {/* Company Logo & Text */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img
                            src="/images/matrix-logo.png"
                            alt="Matrix Logo"
                            style={{
                                height: "36px",
                                width: "auto",
                                objectFit: "contain",
                                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
                            }}
                            crossOrigin="anonymous"
                        />
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            lineHeight: 1
                        }}>
                            <span style={{
                                fontSize: "16px",
                                fontWeight: "900",
                                color: "#ffffff",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                textShadow: "1px 1px 0 #000, 2px 2px 2px rgba(0,0,0,0.8)" // 3D effect
                            }}>
                                Matrix
                            </span>
                            <span style={{
                                fontSize: "10px",
                                fontWeight: "700",
                                color: "#D9DE00",
                                textTransform: "uppercase",
                                letterSpacing: "2px",
                                marginTop: "2px",
                                textShadow: "1px 1px 2px rgba(0,0,0,0.8)"
                            }}>
                                MultiTech Ltd
                            </span>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div
                        style={{
                            backgroundColor: property.status === "FOR RENT" ? "#00b4d8" : "#D9DE00",
                            color: "#000000",
                            fontSize: "12px",
                            fontWeight: "800",
                            padding: "8px 16px",
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                            borderRadius: "2px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
                        }}
                    >
                        {property.status || "FOR SALE"}
                    </div>
                </div>

                {/* Bottom Content Section */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "40%",
                        backgroundColor: "#0a0a0a",
                        padding: "24px 32px 24px 32px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Decorative Top Border */}
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: "32px",
                        width: "60px",
                        height: "4px",
                        backgroundColor: "#D9DE00"
                    }} />

                    {/* Main Content Area: Split Details and QR Code */}
                    <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingTop: "16px" }}>

                        {/* Left Side: Property Details */}
                        <div style={{ maxWidth: "60%", display: "flex", flexDirection: "column", height: "100%" }}>
                            <div
                                style={{
                                    fontSize: "32px",
                                    fontWeight: "800",
                                    color: "#D9DE00",
                                    letterSpacing: "0.5px",
                                    marginBottom: "4px",
                                    textShadow: "0 0 20px rgba(217, 222, 0, 0.2)"
                                }}
                            >
                                {property.price}
                            </div>

                            <h2
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                    color: "#ffffff",
                                    margin: 0,
                                    marginBottom: "8px",
                                    lineHeight: "1.2",
                                }}
                            >
                                {property.title}
                            </h2>

                            <p
                                style={{
                                    fontSize: "13px",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                    color: "#9ca3af",
                                    margin: 0,
                                    marginBottom: "16px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px"
                                }}
                            >
                                <span style={{ color: "#D9DE00" }}>📍</span> {property.address}
                            </p>

                            {/* Stats Section - Moved here as requested */}
                            <div
                                style={{
                                    marginTop: "auto",
                                    paddingTop: "12px",
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "12px",
                                }}
                            >
                                {property.bedrooms && (property.bedrooms > 0) && (
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                        <div style={{
                                            background: "rgba(255,255,255,0.1)",
                                            padding: "6px",
                                            borderRadius: "4px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <span style={{ fontSize: "16px" }}>🛏️</span>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ fontSize: "14px", fontWeight: "bold", color: "#fff" }}>{property.bedrooms}</span>
                                            <span style={{ fontSize: "9px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px" }}>Beds</span>
                                        </div>
                                    </div>
                                )}

                                {property.bathrooms && (property.bathrooms > 0) && (
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                        <div style={{
                                            background: "rgba(255,255,255,0.1)",
                                            padding: "6px",
                                            borderRadius: "4px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <span style={{ fontSize: "16px" }}>🚿</span>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ fontSize: "14px", fontWeight: "bold", color: "#fff" }}>{property.bathrooms}</span>
                                            <span style={{ fontSize: "9px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px" }}>Baths</span>
                                        </div>
                                    </div>
                                )}

                                {formattedArea && (
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", gridColumn: "span 2" }}>
                                        <div style={{
                                            background: "rgba(255,255,255,0.1)",
                                            padding: "6px",
                                            borderRadius: "4px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <span style={{ fontSize: "16px" }}>📐</span>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ fontSize: "14px", fontWeight: "bold", color: "#fff" }}>{formattedArea}</span>
                                            <span style={{ fontSize: "9px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px" }}>Area</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Side: QR Code Area */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "8px",
                            padding: "12px",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            borderRadius: "8px",
                            border: "1px solid rgba(255,255,255,0.1)"
                        }}>
                            <div style={{
                                background: "white",
                                padding: "8px",
                                borderRadius: "4px"
                            }}>
                                <QRCodeSVG
                                    value={propertyUrl}
                                    size={100}
                                    level="M"
                                    bgColor="#FFFFFF"
                                    fgColor="#000000"
                                />
                            </div>
                            <span style={{
                                fontSize: "10px",
                                color: "#D9DE00",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                letterSpacing: "1px"
                            }}>
                                Scan Me
                            </span>
                        </div>
                    </div>

                    {/* Bottom Row: Contact Info */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "16px",
                            paddingTop: "16px",
                            borderTop: "1px solid rgba(255,255,255,0.1)"
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                            <div style={{
                                fontSize: "16px",
                                color: "#ffffff",
                                fontWeight: "bold",
                                letterSpacing: "1px"
                            }}>
                                +233 26 767 1110
                            </div>
                            <div style={{
                                fontSize: "13px",
                                color: "#D9DE00",
                                letterSpacing: "1px",
                                fontWeight: "500"
                            }}>
                                www.matrixmultitech.net
                            </div>
                        </div>
                        <div style={{
                            fontSize: "10px",
                            color: "#9ca3af",
                            letterSpacing: "2px",
                            textTransform: "uppercase"
                        }}>
                            Contact Us
                        </div>
                    </div>
                </div>
            </div>

            <p style={{ fontSize: "14px", color: "#6b7280", fontFamily: "Arial, sans-serif", maxWidth: "600px" }}>
                📱 <strong>New!</strong> Click "Download Slideshow" to instantly generate a branded video of all property photos for WhatsApp Status, TikTok, or Instagram Reels.
            </p>

            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
