export interface ServiceFeature {
    title: string;
    description: string;
}

export interface ServiceProcess {
    step: string;
    title: string;
    description: string;
}

export interface ServiceData {
    slug: string;
    id: number;
    title: string;
    tagline: string;
    heroDescription: string;
    overview: string;
    keyPoints: string[];
    features: ServiceFeature[];
    process: ServiceProcess[];
    highlight: {
        stat: string;
        label: string;
    };
    cta: string;
}

export const servicesData: ServiceData[] = [
    {
        slug: "land-house-sales",
        id: 1,
        title: "Land & House Sales",
        tagline: "Secure Your Legacy in Ghana's Most Coveted Addresses",
        heroDescription: "From verified freehold land in Accra's premium neighbourhoods to fully-finished luxury homes across Greater Accra and Ashanti, we help you acquire property with confidence, clarity, and legal certainty.",
        overview: "Ghana's real estate market presents one of Africa's most compelling investment opportunities. With the Land Act 2020 standardising property rights, a growing urban middle class, and diaspora demand surging year-on-year, strategic land and house acquisitions in areas like East Legon, Cantonments, Trasacco, Airport Residential, and Adjiringanor are delivering exceptional returns. Matrix MultiTech navigates every layer of Ghana's land tenure system — family land, stool land, state land, and vested land — to ensure your title is clean, registered, and protected.",
        keyPoints: [
            "Title searches & Land Commission verification",
            "Indenture, deed, and conveyancing documentation",
            "Family and stool land negotiation",
            "Diaspora remote-purchase support",
            "Accra, Kumasi, Takoradi & emerging markets",
            "Investment-grade valuation reports",
        ],
        features: [
            {
                title: "East Legon & Airport Residential",
                description: "Accra's most prestigious addresses. Gated communities, diplomatic-grade security, and proximity to Kotoka International Airport. Ideal for high-net-worth individuals and diaspora returnees."
            },
            {
                title: "Cantonments & Labone",
                description: "Old-money prestige meets modern luxury. Embassies, international schools, and Accra's finest restaurants within minutes. Perfect for professionals and executives."
            },
            {
                title: "Tema & Sakumono",
                description: "Ghana's industrial heartland with rapid residential growth. Purpose-built communities, excellent infrastructure, and strong rental yields driven by port and industrial demand."
            },
            {
                title: "Emerging Growth Corridors",
                description: "Adjiringanor, Oyarifa, Pokuase, and Kumasi Nhyiaeso are delivering the highest capital appreciation in Ghana's current property cycle — buy before the curve."
            }
        ],
        process: [
            {
                step: "01",
                title: "Consultation & Needs Analysis",
                description: "We assess your budget, preferred location, land use intent (residential, commercial, investment), and timeline. Our team advises on areas delivering the best value in today's Ghanaian market."
            },
            {
                step: "02",
                title: "Property Search & Site Visits",
                description: "We curate a shortlist from our exclusive portfolio and partner networks. For diaspora clients, we conduct thorough video walkthroughs and remote due diligence so you can decide from anywhere in the world."
            },
            {
                step: "03",
                title: "Legal Due Diligence",
                description: "Our legal team performs exhaustive title searches at the Lands Commission, verifying ownership history, encumbrances, and planning status under Ghana's Land Administration Project framework."
            },
            {
                step: "04",
                title: "Negotiation & Agreement",
                description: "We negotiate on your behalf to achieve the best price and terms. All agreements are documented via properly executed indentures and conveyancing deeds compliant with Ghana's Land Act, 2020 (Act 1036)."
            },
            {
                step: "05",
                title: "Title Registration & Handover",
                description: "We facilitate full title registration at the Lands Commission and Ghana Revenue Authority stamp duty payment. You receive a clean, registered, fully protected property title."
            }
        ],
        highlight: {
            stat: "GHS 500M+",
            label: "in property transactions facilitated"
        },
        cta: "Find Your Property"
    },
    {
        slug: "apartment-rentals",
        id: 2,
        title: "Apartment Rentals",
        tagline: "Accra's Finest Short & Long-Stay Residences",
        heroDescription: "Whether you are a returning Ghanaian professional, an expatriate executive, or an investor seeking premium tenants, Matrix MultiTech connects you with fully-managed luxury apartments across Accra's most desirable neighbourhoods.",
        overview: "Accra's rental market is among the most dynamic in Sub-Saharan Africa. Demand from international organisations, multinational corporations, diplomats, and Ghana's growing professional class consistently outstrips quality supply. Our managed apartment portfolio spans fully-furnished serviced units in Airport Hills and Cantonments to long-term unfurnished residences in East Legon, Adenta, and Tema — all with transparent rental agreements, reliable maintenance, and full compliance with Ghana's Rent Act (Act 220) and its amendment provisions.",
        keyPoints: [
            "Fully-furnished serviced apartments for expats & diaspora",
            "Long-term unfurnished options for Ghanaian professionals",
            "Rent agreements compliant with Ghana Rent Act (Act 220)",
            "24/7 property management & maintenance",
            "Accra, Tema, Kasoa & Kumasi coverage",
            "Transparent pricing — no hidden landlord fees",
        ],
        features: [
            {
                title: "Airport Hills & Cantonments",
                description: "Premium serviced apartments minutes from Kotoka International Airport. Perfect for expatriates, UN/NGO professionals, and business travellers requiring hotel-grade facilities with the privacy of a home."
            },
            {
                title: "East Legon & Roman Ridge",
                description: "Spacious, modern apartments in Accra's embassy belt. Backup power (inverter/generator), perimeter security, and access to top international schools make these ideal for diplomatic families."
            },
            {
                title: "Tema & Sakumono Estates",
                description: "Well-priced, professionally managed apartments in Ghana's planned city. Strong tenant demand from port workers, engineers, and Tema Industrial Area professionals ensures excellent occupancy rates for investors."
            },
            {
                title: "Serviced Apartments for Diaspora",
                description: "Returning to Ghana for a project, holiday, or indefinitely? Our turnkey furnished units are move-in ready with water, electricity (plus backup), fast Wi-Fi, and cleaning services — so you land and immediately feel at home."
            }
        ],
        process: [
            {
                step: "01",
                title: "Rental Requirements Briefing",
                description: "We understand your preferred location, budget, duration, furnishing preferences, and any special requirements (generator capacity, security, pool, proximity to schools or offices)."
            },
            {
                step: "02",
                title: "Curated Property Shortlist",
                description: "We match you with available units from our managed portfolio and vetted landlord network — saving you weeks of fruitless house-hunting in Accra's opaque rental market."
            },
            {
                step: "03",
                title: "Viewings & Due Diligence",
                description: "Physical or virtual viewings arranged at your convenience. We verify landlord title, check for encumbrances, and inspect all utilities (GWCL water, ECG power, borehole) before presenting any property."
            },
            {
                step: "04",
                title: "Tenancy Agreement & Rent Advance",
                description: "We draft legally sound tenancy agreements compliant with Ghana's Rent Act. We advise on standard advance payment structures (typically 1–2 years in Ghana) and negotiate the most tenant-favourable terms."
            },
            {
                step: "05",
                title: "Ongoing Property Management",
                description: "From maintenance requests and emergency repairs to tenant relations and annual renewals — our property management team handles everything so landlords and tenants enjoy a stress-free experience."
            }
        ],
        highlight: {
            stat: "200+",
            label: "managed units across Greater Accra"
        },
        cta: "View Available Units"
    },
    {
        slug: "building-construction",
        id: 3,
        title: "Building Construction",
        tagline: "From Blueprint to Keys — Built for Ghana's Climate and Ambition",
        heroDescription: "We design and construct residential and commercial buildings that are architecturally bold, structurally sound, and engineered for Ghana's tropical climate. From East Legon mansions to Kumasi commercial plazas, every project reflects our commitment to quality without compromise.",
        overview: "Building in Ghana demands expertise that goes beyond standard construction practice. Tropical temperatures averaging 27°C, high humidity, seasonal Harmattan winds, and heavy equatorial rains require materials and design choices that many overseas-trained architects overlook. Matrix MultiTech combines deep local construction knowledge — from approved hollow-block specifications to Ghana Standards Authority (GSA) compliant materials — with contemporary architectural vision. We handle every stage from design permit approval through the Accra Metropolitan Assembly (AMA) or relevant Municipal Assembly, to structural completion and finishing.",
        keyPoints: [
            "Architectural design & planning permit submission (AMA/KMA)",
            "Structural engineering for tropical climate durability",
            "GSA-compliant materials — locally and internationally sourced",
            "Residential, commercial & mixed-use construction",
            "Diasporan build-for-me project management",
            "Transparent cost-per-square-metre pricing in GHS & USD",
        ],
        features: [
            {
                title: "Tropical Climate Engineering",
                description: "Our designs account for Accra's heat and humidity through cross-ventilation, deep roof overhangs, thermal mass walls, and strategic orientation — reducing cooling costs and ensuring year-round comfort without over-reliance on air conditioning."
            },
            {
                title: "Luxury Residential Construction",
                description: "Custom-designed homes in East Legon, Adjiringanor, Trasacco Valley, and Oyarifa built to international finishing standards — Italian tiles, German fixtures, smart home pre-wiring, and pools — at Ghana-competitive rates."
            },
            {
                title: "Commercial & Mixed-Use Buildings",
                description: "Office complexes, retail plazas, hospitality facilities, and multi-unit apartment blocks across Greater Accra and Kumasi. We handle foundation engineering for Accra's variable soil conditions including the laterite soils common north of the city."
            },
            {
                title: "Diaspora Build-For-Me Service",
                description: "Living in the UK, USA, Canada or Europe? We manage your entire Ghana construction project remotely — weekly progress reports, photo/video updates, milestone-based payments, and a dedicated project manager accountable to you at every stage."
            }
        ],
        process: [
            {
                step: "01",
                title: "Design Consultation & Concept",
                description: "Our architectural team works with you to develop a concept that balances your vision, budget, site conditions, and Ghana Building Code requirements. We produce initial floor plans and 3D renders for your approval."
            },
            {
                step: "02",
                title: "Planning Permit & Regulatory Approvals",
                description: "We prepare and submit full building plans to the relevant Municipal or Metropolitan Assembly (AMA, KMA, TMA) and Environmental Protection Agency (EPA) where required — navigating Ghana's permit process on your behalf."
            },
            {
                step: "03",
                title: "Costing & Contract Execution",
                description: "Detailed Bills of Quantities (BoQ) are prepared to international quantity surveying standards. Contracts clearly define scope, payment milestones, programme, and penalties for delays — protecting your investment."
            },
            {
                step: "04",
                title: "Construction & Quality Control",
                description: "Our site teams execute each phase — foundation, superstructure, roofing, MEP installations, and finishing — under strict quality control using GSA-approved materials. Independent structural inspections are conducted at key milestones."
            },
            {
                step: "05",
                title: "Defects Liability & Handover",
                description: "We provide a comprehensive defects liability period post-handover, ensuring any post-construction snags are resolved at no additional cost. Full as-built documentation is provided for your records and future renovations."
            }
        ],
        highlight: {
            stat: "100%",
            label: "on-time project delivery record"
        },
        cta: "Start Your Build"
    },
    {
        slug: "property-management",
        id: 4,
        title: "Property Management",
        tagline: "Your Investment, Professionally Protected — So You Never Lose Sleep",
        heroDescription: "Owning property in Ghana from abroad — or simply not having time to manage it yourself — is no longer a headache. Matrix MultiTech's end-to-end property management service keeps your asset earning, maintained, and legally compliant year-round.",
        overview: "Ghana's property market rewards patient investors, but only when assets are professionally managed. Poor tenant selection, deferred maintenance in a tropical climate, missed Property Rate (local council tax) payments, and electricity or water disconnections can rapidly erode rental yields and asset value. Our property management division serves both resident and diaspora property owners across Greater Accra, Kumasi, and Tema, handling every operational detail so your property performs like a professionally managed investment — because it is.",
        keyPoints: [
            "Tenant screening & placement (credit, employer, reference checks)",
            "Rent collection & remittance in GHS or USD",
            "Accra Metropolitan Assembly Property Rate management",
            "Preventative maintenance — AC, plumbing, electrical, generator",
            "24/7 emergency response for tenant issues",
            "Monthly performance & occupancy reports to landlords",
        ],
        features: [
            {
                title: "Tenant Acquisition & Vetting",
                description: "We market your property across our network and digital platforms, screen every applicant (employment verification, previous landlord references, ID checks), and present only qualified candidates — dramatically reducing vacancy periods and default risk."
            },
            {
                title: "Rent Collection & Financial Reporting",
                description: "Monthly rent collected and remitted to your Ghana or overseas bank account with full transaction records. We enforce advance payment terms per Ghana's Rent Act and manage arrears professionally without damaging the landlord-tenant relationship."
            },
            {
                title: "Tropical Climate Maintenance Programme",
                description: "Ghana's heat, humidity, and rainy season place heavy demands on buildings. Our scheduled maintenance programme covers AC servicing, waterproofing, generator/inverter maintenance, plumbing, and external painting — protecting your asset's value."
            },
            {
                title: "Diaspora Landlord Portal",
                description: "Log into your secure online dashboard from London, Toronto or Houston to view monthly statements, maintenance logs, tenant communication records, and property photos — full transparency without requiring you to be in Accra."
            }
        ],
        process: [
            {
                step: "01",
                title: "Property Onboarding & Inspection",
                description: "We conduct a thorough inspection of your property, documenting its condition, identifying any immediate maintenance needs, and establishing a baseline for ongoing management. We advise on improvements that maximise rental value."
            },
            {
                step: "02",
                title: "Market Analysis & Rental Pricing",
                description: "We benchmark your property against comparable units in the immediate neighbourhood and current Accra market conditions to set an optimal rental price — balancing occupancy speed with maximum rental income."
            },
            {
                step: "03",
                title: "Marketing & Tenant Placement",
                description: "Professional photography, listing on premium Ghanaian property platforms, and promotion through our extensive network of corporate relocations, expat community groups, and diaspora returnee networks."
            },
            {
                step: "04",
                title: "Ongoing Management & Maintenance",
                description: "From move-in inventories and rent collection to emergency repairs and annual inspections — we handle every operational detail, with all costs transparently approved by you before being incurred."
            },
            {
                step: "05",
                title: "Renewal, Exits & Reinvestment Advice",
                description: "At tenancy renewal or exit, we handle deposit reconciliation, condition assessments, and remediation. We also provide strategic advice on reinvestment, refinancing, or leveraging your property equity for portfolio growth in Ghana."
            }
        ],
        highlight: {
            stat: "98%",
            label: "average occupancy rate across managed portfolio"
        },
        cta: "Protect Your Investment"
    }
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
    return servicesData.find((s) => s.slug === slug);
}
