import type { Metadata } from "next";
import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { OrganizationSchema, WebsiteSchema } from "@/components/StructuredData";
import VoiceWidget from "@/components/VoiceWidget";
import MobileStickyCTA from "@/components/MobileStickyCTA";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matrix MultiTech Ltd | Luxury Real Estate & Construction in Ghana",
  description: "Premier Real Estate, Architectural Design, and Construction Firm in Ghana. Specializing in luxury homes, land sales, and property management in Accra.",
  keywords: ["real estate Ghana", "property management Accra", "construction firm Ghana", "luxury houses for sale Accra", "apartments in East Legon", "land for sale Cantonments", "Matrix MultiTech Ltd"],
  authors: [{ name: "Matrix MultiTech Ltd", url: "https://matrixmultitech.com" }],
  creator: "Matrix MultiTech Ltd",
  icons: {
    icon: "/images/matrix-logo.png",
    apple: "/images/matrix-logo.png",
  },
  openGraph: {
    title: "Matrix MultiTech Ltd | Luxury Real Estate & Construction",
    description: "Premier Real Estate and Construction Firm in Ghana. Specializing in luxury properties.",
    url: "https://matrixmultitech.com",
    siteName: "Matrix MultiTech Ltd",
    images: [
      {
        url: "/images/matrix-logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matrix MultiTech Ltd | Real Estate",
    description: "Premier Real Estate and Construction Firm in Ghana.",
    images: ["/images/matrix-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${raleway.variable} antialiased font-sans`}
      >
        <GoogleAnalytics />
        <OrganizationSchema />
        <WebsiteSchema />
        {children}
        <MobileStickyCTA />
        <VoiceWidget />
      </body>
    </html>
  );
}
