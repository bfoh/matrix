"use client";

import { usePathname } from "next/navigation";
import VoiceWidget from "@/components/VoiceWidget";
import MobileStickyCTA from "@/components/MobileStickyCTA";

export default function SiteWidgets() {
    const pathname = usePathname() || "";

    if (pathname.startsWith("/admin")) return null;

    return (
        <>
            <MobileStickyCTA />
            <VoiceWidget />
        </>
    );
}
