"use client";

import { useRef, useState, useEffect } from "react";
import { Download, Loader2, Film, Send, Bed, Bath, Ruler } from "lucide-react";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";
import * as Mp4Muxer from "mp4-muxer";
import { createClient } from "@/lib/supabase";

interface TikTokConnection {
    connected: boolean;
    user?: { display_name: string };
}

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
    const [tiktokConnection, setTiktokConnection] = useState<TikTokConnection>({ connected: false });
    const [isPostingToTiktok, setIsPostingToTiktok] = useState(false);
    const [lastVideoBlob, setLastVideoBlob] = useState<Blob | null>(null);
    const supabase = createClient();

    // Construct property URL for QR code
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.matrixmultitech.net";
    const propertyUrl = `${baseUrl}/properties/${property.id}`;

    // Check TikTok connection on mount
    useEffect(() => {
        fetch('/api/social/tiktok')
            .then(res => res.json())
            .then(data => setTiktokConnection(data))
            .catch(() => setTiktokConnection({ connected: false }));
    }, []);

    // Post to TikTok function
    const postToTiktok = async (videoBlob: Blob) => {
        if (!tiktokConnection.connected) {
            alert('Please connect your TikTok account first in Social Settings.');
            return;
        }

        setIsPostingToTiktok(true);
        setGeneratingProgress("Posting to TikTok...");

        try {
            const formData = new FormData();
            formData.append('video', videoBlob, 'property-slideshow.mp4');
            formData.append('title', `🏠 ${property.title} - ${property.price} | Property Tour`);

            const response = await fetch('/api/social/tiktok', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to post to TikTok');
            }

            alert('✅ Video posted to TikTok successfully!');
        } catch (error) {
            console.error('TikTok posting error:', error);
            alert(`Failed to post to TikTok: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsPostingToTiktok(false);
            setGeneratingProgress("");
        }
    };

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

                // Delay revocation to allow download to start on iOS Safari
                setTimeout(() => {
                    URL.revokeObjectURL(url);
                }, 1000);
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
            // Configuration - High Quality
            const width = 1080;
            const height = 1080;
            const fps = 24;
            const durationPerSlide = 3;
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
                codec: 'avc1.4d002a',
                width,
                height,
                bitrate: 3_500_000, // Increased to 3.5Mbps for better quality
                framerate: fps,
                latencyMode: 'realtime',
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

                    // Force keyframe on the first frame of each new slide
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

            // Store blob for TikTok posting
            setLastVideoBlob(blob);

            // Upload to Supabase for reliable download
            setGeneratingProgress("Preparing Download...");
            const fileName = `${property.title.replace(/\s+/g, "-").toLowerCase()}-slideshow-${Date.now()}.mp4`;
            const filePath = `generated/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('property-images') // Using existing bucket
                .upload(filePath, blob, {
                    contentType: 'video/mp4',
                    upsert: true
                });

            if (uploadError) {
                console.error("Upload failed, falling back to blob download", uploadError);
                // Fallback to Blob download if upload fails
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            } else {
                // Download using public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('property-images')
                    .getPublicUrl(filePath);

                // Force download by creating a link
                // For iOS, opening in new tab is often safer if download attribute is ignored for cross-origin
                const link = document.createElement("a");
                link.href = publicUrl;
                link.download = fileName; // Hint filename
                link.target = "_blank"; // Safer for iOS
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                        padding: "14px 20px",
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "bold",
                        fontSize: "12px",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        border: "1px solid #333",
                        cursor: isGenerating ? "not-allowed" : "pointer",
                        opacity: isGenerating ? 0.6 : 1,
                        borderRadius: "4px",
                        width: "100%",
                        justifyContent: "center",
                        minHeight: "48px"
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
                        padding: "14px 20px",
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "bold",
                        fontSize: "12px",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        border: "none",
                        cursor: isGenerating ? "not-allowed" : "pointer",
                        opacity: isGenerating ? 0.6 : 1,
                        borderRadius: "4px",
                        boxShadow: "0 4px 15px rgba(217, 222, 0, 0.3)",
                        width: "100%",
                        justifyContent: "center",
                        minHeight: "48px"
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

                {/* Post to TikTok Button */}
                <button
                    onClick={() => lastVideoBlob && postToTiktok(lastVideoBlob)}
                    disabled={!lastVideoBlob || isPostingToTiktok || !tiktokConnection.connected}
                    title={!tiktokConnection.connected ? "Connect TikTok in Social Settings first" : !lastVideoBlob ? "Generate a slideshow first" : "Post to TikTok"}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        background: tiktokConnection.connected
                            ? "linear-gradient(135deg, #ff0050 0%, #00f2ea 100%)"
                            : "linear-gradient(135deg, #666 0%, #444 100%)",
                        color: "#fff",
                        padding: "14px 20px",
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "bold",
                        fontSize: "12px",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        border: "none",
                        cursor: (!lastVideoBlob || isPostingToTiktok || !tiktokConnection.connected) ? "not-allowed" : "pointer",
                        opacity: (!lastVideoBlob || isPostingToTiktok) ? 0.6 : 1,
                        borderRadius: "4px",
                        boxShadow: tiktokConnection.connected ? "0 4px 15px rgba(255, 0, 80, 0.3)" : "none",
                        width: "100%",
                        justifyContent: "center",
                        minHeight: "48px"
                    }}
                >
                    {isPostingToTiktok ? (
                        <>
                            <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                            Posting...
                        </>
                    ) : (
                        <>
                            <Send size={18} />
                            {tiktokConnection.connected ? "Post to TikTok" : "Connect TikTok"}
                        </>
                    )}
                </button>
            </div>

            {/* Premium Property Card Template - Scrollable Wrapper */}
            <div style={{ width: "100%", overflowX: "auto", paddingBottom: "20px", borderRadius: "8px" }}>
                <div
                    ref={cardRef}
                    style={{
                        width: "600px",
                        height: "600px",
                        backgroundColor: "#0a0a0a",
                        position: "relative",
                        overflow: "hidden",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        flexShrink: 0, // Prevent shrinking
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
                                                <Bed size={16} color="white" />
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
                                                <Bath size={16} color="white" />
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
                                                <Ruler size={16} color="white" />
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

                                <a
                                    href={propertyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        fontSize: "7px",
                                        color: "#ffffff",
                                        textDecoration: "none",
                                        marginTop: "6px",
                                        opacity: 0.8,
                                        width: "100%",
                                        wordBreak: "break-all",
                                        textAlign: "center",
                                        display: "block",
                                        lineHeight: "1.2"
                                    }}
                                >
                                    {baseUrl.replace(/^https?:\/\//, '')}/properties/{property.id}
                                </a>
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
            </div>

            <p style={{ fontSize: "14px", color: "#6b7280", fontFamily: "Arial, sans-serif", maxWidth: "100%" }}>
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
