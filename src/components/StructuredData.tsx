"use client";

import Script from "next/script";

interface PropertySchemaProps {
    property: {
        id: string;
        title: string;
        address: string;
        price: string;
        description?: string[] | string;
        bedrooms?: number;
        bathrooms?: number;
        area_sqm?: number;
        image?: string;
        images?: string[];
        status?: string;
    };
    url: string;
}

export default function PropertySchema({ property, url }: PropertySchemaProps) {
    // Parse the price to extract numeric value
    const priceMatch = property.price.match(/[\d,]+/);
    const priceValue = priceMatch ? parseInt(priceMatch[0].replace(/,/g, "")) : undefined;

    // Determine currency based on price string
    const currency = property.price.toLowerCase().includes("ghc") ? "GHS" : "USD";

    // Get the description as a single string
    const description = Array.isArray(property.description)
        ? property.description.join(" ")
        : property.description || "";

    // Determine listing type based on status
    const isForRent = property.status?.toLowerCase().includes("rent");

    // Build the schema
    const schema = {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": property.title,
        "description": description.substring(0, 500),
        "url": url,
        "image": property.images || (property.image ? [property.image] : []),
        "datePosted": new Date().toISOString().split('T')[0],
        "offers": {
            "@type": "Offer",
            "price": priceValue,
            "priceCurrency": currency,
            "availability": "https://schema.org/InStock",
            "businessFunction": isForRent
                ? "https://schema.org/LeaseOut"
                : "https://schema.org/Sell"
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": property.address,
            "addressCountry": "GH"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "addressCountry": "Ghana"
        },
        ...(property.bedrooms && {
            "numberOfBedrooms": property.bedrooms
        }),
        ...(property.bathrooms && {
            "numberOfBathroomsTotal": property.bathrooms
        }),
        ...(property.area_sqm && {
            "floorSize": {
                "@type": "QuantitativeValue",
                "value": property.area_sqm,
                "unitCode": "MTK" // Square meters
            }
        }),
        "additionalType": isForRent ? "Rental" : "ForSale",
        "seller": {
            "@type": "RealEstateAgent",
            "name": "Matrix MultiTech Ltd",
            "telephone": "+233267671110",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "GH"
            }
        }
    };

    return (
        <Script
            id={`property-schema-${property.id}`}
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
            }}
        />
    );
}

// Additional schema for the organization (to be used on homepage)
export function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Matrix MultiTech Ltd",
        "description": "Premier Real Estate and Construction Firm in Ghana",
        "url": "https://www.matrixmultitech.net",
        "telephone": "+233267671110",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "GH"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Ghana"
        },
        "sameAs": [
            "https://www.facebook.com/matrixmultitech",
            "https://www.instagram.com/matrixmultitech"
        ]
    };

    return (
        <Script
            id="organization-schema"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
            }}
        />
    );
}

// WebSite schema for search engines
export function WebsiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Matrix MultiTech Ltd",
        "url": "https://www.matrixmultitech.net",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.matrixmultitech.net/properties?search={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <Script
            id="website-schema"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
            }}
        />
    );
}
