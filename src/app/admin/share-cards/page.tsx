"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Image as ImageIcon, Share2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import PropertyCardGenerator from "@/components/PropertyCardGenerator";

interface Property {
    id: string;
    title: string;
    address: string;
    price: string;
    status: string;
    image: string;
    images: string[];
    bedrooms: number;
    bathrooms: number;
    area_sqm: number;
}

export default function ShareCardsPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("properties")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching properties:", error);
        } else {
            setProperties(data || []);
        }
        setLoading(false);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/dashboard"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Share Cards</h1>
                    <p className="text-gray-600">Generate downloadable property cards for social media</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Property Selection */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <ImageIcon size={20} />
                        Select Property
                    </h2>

                    {loading ? (
                        <div className="text-center py-8 text-gray-500">
                            Loading properties...
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-[500px] overflow-y-auto">
                            {properties.map((property) => (
                                <button
                                    key={property.id}
                                    onClick={() => setSelectedProperty(property)}
                                    className={`w-full flex items-center gap-4 p-3 rounded-lg border transition-all text-left ${selectedProperty?.id === property.id
                                            ? "border-yellow-400 bg-yellow-50"
                                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    <img
                                        src={property.images?.[0] || property.image}
                                        alt={property.title}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-900 truncate">
                                            {property.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 truncate">
                                            {property.address}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {property.price}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-2 py-1 text-xs font-medium rounded ${property.status === "FOR SALE"
                                                ? "bg-green-100 text-green-800"
                                                : property.status === "FOR RENT"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {property.status}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Card Preview & Download */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Share2 size={20} />
                        Generate Share Card
                    </h2>

                    {selectedProperty ? (
                        <div>
                            <PropertyCardGenerator property={selectedProperty} />
                        </div>
                    ) : (
                        <div className="text-center py-16 text-gray-500">
                            <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Select a property from the list to generate a share card</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-3">📢 Marketing Tips</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ Share cards are optimized for Instagram (1080x1080) and WhatsApp</li>
                    <li>✅ Download and post to Facebook, Instagram Stories, and Twitter</li>
                    <li>✅ Use as property signage or print for flyers</li>
                    <li>✅ Cards include your contact info and branding</li>
                </ul>
            </div>
        </div>
    );
}
