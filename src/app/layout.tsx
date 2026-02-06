import type { Metadata } from "next";
import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { OrganizationSchema, WebsiteSchema } from "@/components/StructuredData";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matrix MultiTech Ltd | Real Estate",
  description: "Premier Real Estate and Construction Firm in Ghana",
  keywords: ["real estate", "property", "Ghana", "Accra", "houses for sale", "apartments", "land for sale"],
  authors: [{ name: "Matrix MultiTech Ltd" }],
  openGraph: {
    title: "Matrix MultiTech Ltd | Real Estate",
    description: "Premier Real Estate and Construction Firm in Ghana",
    type: "website",
    locale: "en_GH",
    siteName: "Matrix MultiTech Ltd",
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
      </body>
    </html>
  );
}
