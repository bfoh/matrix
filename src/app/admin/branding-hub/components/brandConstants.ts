export const BRAND = {
    company: "Matrix MultiTech Ltd",
    companyShort: "MATRIX MULTITECH",
    tagline: "Telcom | Real Estate",
    ceo: "Ernest Opoku",
    ceoTitle: "CEO",
    phone: "+233 26 767 1110",
    email: "info@matrixmultitech.com",
    website: "matrixmultitech.net",
    websiteUrl: "https://www.matrixmultitech.net",
    location: "Matrix Headquarters, Accra, Ghana",
    address: "Accra, Ghana",
    gps: "GG-001-1387",
    logo: "/images/matrix-logo.png",
    logoTransparent: "/matrix-logo-transparent.png",
    colors: {
        black: "#000000",
        yellow: "#D9DE00",
        yellowDark: "#b8bd00",
        darkGray: "#0a0a0a",
        mediumGray: "#1a1a1a",
        lightGray: "#9ca3af",
        red: "#C0392B",
        white: "#ffffff",
    },
    fonts: {
        heading: "Montserrat, sans-serif",
        body: "Raleway, sans-serif",
    },
} as const;

export type MaterialType =
    | "business-card"
    | "letterhead"
    | "envelope"
    | "compliment-slip"
    | "email-signature"
    | "social-media-kit"
    | "watermark"
    | "id-badge"
    | "invoice"
    | "presentation-cover"
    | "property-flyer"
    | "signage-banner"
    | "branded-proposal";

export interface MaterialInfo {
    id: MaterialType;
    name: string;
    description: string;
    category: "stationery" | "digital" | "marketing";
    formats: ("png" | "pdf" | "html")[];
    aiEnabled: boolean;
}

export const MATERIALS: MaterialInfo[] = [
    // Stationery
    { id: "business-card", name: "Business Card", description: "CEO complimentary card with QR code", category: "stationery", formats: ["png", "pdf"], aiEnabled: false },
    { id: "letterhead", name: "Letterhead", description: "A4 branded letterhead with logo header", category: "stationery", formats: ["pdf"], aiEnabled: true },
    { id: "envelope", name: "Envelope", description: "Standard branded envelope with return address", category: "stationery", formats: ["pdf"], aiEnabled: false },
    { id: "compliment-slip", name: "Compliment Slip", description: "Elegant branded note slip", category: "stationery", formats: ["pdf"], aiEnabled: true },
    // Digital
    { id: "email-signature", name: "Email Signature", description: "Professional email signature with logo", category: "digital", formats: ["png", "html"], aiEnabled: false },
    { id: "social-media-kit", name: "Social Media Kit", description: "Profile pics, covers & story templates", category: "digital", formats: ["png"], aiEnabled: false },
    { id: "watermark", name: "Watermark Generator", description: "Overlay branded watermark on photos", category: "digital", formats: ["png"], aiEnabled: false },
    // Marketing
    { id: "id-badge", name: "ID Badge", description: "Employee identification badge", category: "marketing", formats: ["png", "pdf"], aiEnabled: false },
    { id: "invoice", name: "Invoice Template", description: "Professional branded invoice", category: "marketing", formats: ["pdf"], aiEnabled: true },
    { id: "presentation-cover", name: "Presentation Cover", description: "16:9 slide cover page", category: "marketing", formats: ["png"], aiEnabled: false },
    { id: "property-flyer", name: "Property Flyer", description: "Listing flyer with property details", category: "marketing", formats: ["png", "pdf"], aiEnabled: true },
    { id: "signage-banner", name: "Signage / Banner", description: "FOR SALE, FOR RENT & SOLD signs", category: "marketing", formats: ["png"], aiEnabled: false },
    { id: "branded-proposal", name: "Branded Proposal", description: "Multi-page branded proposal document", category: "marketing", formats: ["pdf"], aiEnabled: true },
];
