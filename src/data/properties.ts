import { Bed, Bath, Hash, Scaling } from "lucide-react";

export const properties = [
    {
        id: 1,
        title: "EAST LEGON LUXURY ESTATE",
        address: "12 MENSAH WOOD ST, EAST LEGON, ACCRA",
        price: "$850,000",
        status: "FOR SALE",
        details: "6 BD | 9 BA | 1,100 SQ M",
        image: "/images/hero-bg.png",
        images: [
            "/images/hero-bg.png",
            "/images/prop-1.png",
            "/images/guest-house.png",
            "/images/rec-room.png",
            "/images/pool.png"
        ],
        description: [
            "This extraordinary estate rests on a gated plot in the prestigious East Legon, offering both privacy and proximity to the best that Accra offers.",
            "This estate is crafted in a European Transitional style, blending timeless architecture with modern livability. This home is a love letter to architecture. The main home offers an exceptional floor plan with 3 bedrooms, 2 offices, a library, a sunroom, garden room, a scullery, a light-filled family room that captures serene views of the landscaped grounds, and several bonus rooms.",
            "The kitchen overlooks the courtyard area, has views of the gardens, has a wood burning pizza oven and is built to entertain and cook. A remarkable 5-car garage, inspired by a German barn design, includes a half bath and extensive storage, while the upper level features a recreation suite with an office, dark room, full bathroom, and an expansive entertaining space.",
            "The independent guest house provides complete living quarters with 2 bedrooms, a bunk room, full kitchen, living room, and a private 2-car garage–ideal for guests or multigenerational living. This property hugs the courtyard making you feel as if you are a part of the guest house while overlooking the private pool.",
            "Outdoors, the estate is designed for both leisure and activity with a full-size tennis court, manicured gardens, and mature landscaping that create a sense of resort living year-round. This East Legon estate is a rare opportunity to own a landmark property where architectural pedigree, privacy, and luxury meet. Main Home approx - 750 sq m, Guest Home approx 250 sq m. Home has access to Ghana Water Company supply and a private borehole."
        ],
        stats: [
            { label: "BEDS", value: "6", icon: Bed },
            { label: "BATHS", value: "9", icon: Bath },
            { label: "LIVING AREA", value: "1,100 SQ.M.", icon: Scaling },
            { label: "LOT", value: "2 PLOTS", icon: Hash },
        ],
        videoImage: "/images/video-thumb.png"
    },
    {
        id: 2,
        title: "CANTONMENTS RESIDENCE",
        address: "45 CANTONMENTS CIRCLE, ACCRA, GHANA",
        price: "$1,895,000",
        status: "PENDING",
        details: "5 BD | 4 BA | 420 SQ M",
        image: "/images/prop-2.png",
        images: [
            "/images/prop-2.png",
            "/images/guest-house.png",
        ],
        description: [
            "A beautiful modern estate located in the heart of Cantonments. Walking distance to the embassies and top restaurants.",
            "Features high ceilings, a chef's kitchen, and a spacious backyard perfect for entertaining."
        ],
        stats: [
            { label: "BEDS", value: "5", icon: Bed },
            { label: "BATHS", value: "4", icon: Bath },
            { label: "LIVING AREA", value: "420 SQ.M.", icon: Scaling },
            { label: "LOT", value: "0.5 ACRES", icon: Hash },
        ],
        videoImage: "/images/prop-2.png"
    },
    {
        id: 3,
        title: "AIRPORT RESIDENTIAL VILLA",
        address: "78 SENCHI ST, AIRPORT RESIDENTIAL, ACCRA",
        price: "$3,100,000",
        status: "SOLD",
        details: "6 BD | 5.5 BA | 550 SQ M",
        image: "/images/prop-3.png",
        images: [
            "/images/prop-3.png",
            "/images/hero-bg.png",
        ],
        description: [
            "Secluded luxury living with panoramic city views. This custom built home leaves no detail untouched.",
            "Includes a private vineyard, pool, and guest casita."
        ],
        stats: [
            { label: "BEDS", value: "6", icon: Bed },
            { label: "BATHS", value: "5.5", icon: Bath },
            { label: "LIVING AREA", value: "550 SQ.M.", icon: Scaling },
            { label: "LOT", value: "1 ACRE", icon: Hash },
        ],
        videoImage: "/images/prop-3.png"
    },
];
