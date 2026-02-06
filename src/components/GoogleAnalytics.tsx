"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
    measurementId?: string;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
    const GA_MEASUREMENT_ID = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    // Don't render if no measurement ID
    if (!GA_MEASUREMENT_ID) {
        return null;
    }

    return (
        <>
            {/* Google Analytics Script */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}', {
                        page_path: window.location.pathname,
                    });
                `}
            </Script>
        </>
    );
}

// Utility function to track custom events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
}

// Pre-defined events for common property actions
export const PropertyEvents = {
    viewProperty: (propertyId: string, propertyTitle: string) => {
        trackEvent("view_property", "Property", propertyTitle, undefined);
    },
    shareProperty: (propertyId: string, platform: string) => {
        trackEvent("share", "Property", `${platform}_${propertyId}`, undefined);
    },
    inquireProperty: (propertyId: string, propertyTitle: string) => {
        trackEvent("generate_lead", "Property", propertyTitle, undefined);
    },
    bookViewing: (propertyId: string, propertyTitle: string) => {
        trackEvent("schedule", "Property", propertyTitle, undefined);
    },
    copyPropertyLink: (propertyId: string) => {
        trackEvent("copy_link", "Property", propertyId, undefined);
    },
};
