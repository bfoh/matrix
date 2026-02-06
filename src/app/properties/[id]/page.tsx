import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import PropertyPageClient from "./PropertyPageClient";

// Create a Supabase client for server-side
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;

    // Fetch property data for metadata
    const { data: property } = await supabase
        .from("properties")
        .select("title, price, address, image, description")
        .eq("id", id)
        .single();

    if (!property) {
        return {
            title: "Property Not Found | Matrix MultiTech Ltd",
            description: "The requested property could not be found.",
        };
    }

    const description = Array.isArray(property.description)
        ? property.description[0]?.substring(0, 160)
        : property.description?.substring(0, 160) || "View this property listing";

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.matrixmultitech.net";
    const propertyUrl = `${siteUrl}/properties/${id}`;

    return {
        title: `${property.title} | Matrix MultiTech Ltd`,
        description: `${property.price} - ${property.address}. ${description}`,
        openGraph: {
            title: property.title,
            description: `${property.price} - ${property.address}`,
            url: propertyUrl,
            siteName: "Matrix MultiTech Ltd",
            images: property.image ? [
                {
                    url: property.image,
                    width: 1200,
                    height: 630,
                    alt: property.title,
                }
            ] : [],
            locale: "en_GH",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: property.title,
            description: `${property.price} - ${property.address}`,
            images: property.image ? [property.image] : [],
        },
    };
}

export default function PropertyPage() {
    return <PropertyPageClient />;
}
