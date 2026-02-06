
"use client";

import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Filter, Globe, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

// Define the interface for a Property
interface Property {
    id: string;
    title: string;
    address: string;
    price: string;
    status: "FOR SALE" | "FOR RENT" | "PENDING" | "SOLD";
    image: string; // matches 'image' column in DB
    published: boolean;
}

export default function AdminDashboard() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching properties:', error);
        } else {
            setProperties((data as unknown as Property[]) || []);
        }
        setLoading(false);
    };

    const handlePublish = async (id: string, currentStatus: boolean) => {
        const { error } = await supabase
            .from('properties')
            .update({ published: !currentStatus })
            .eq('id', id);

        if (error) {
            alert("Error updating status: " + error.message);
        } else {
            fetchProperties(); // Refresh list to show new status
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this property?")) return;

        const { error } = await supabase
            .from('properties')
            .delete()
            .eq('id', id);

        if (error) {
            alert("Error deleting property: " + error.message);
        } else {
            fetchProperties(); // Refresh list
        }
    };

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-montserrat font-bold text-white mb-2">DASHBOARD</h1>
                    <p className="text-gray-400 font-raleway text-sm">Manage your property listings</p>
                </div>

                <div className="flex gap-3">
                    <Link href="/admin/share-cards">
                        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded font-bold font-raleway tracking-wider uppercase hover:bg-gray-200 transition-colors">
                            <Share2 size={18} />
                            <span>Share Cards</span>
                        </button>
                    </Link>
                    <Link href="/admin/properties/new">
                        <button className="flex items-center gap-2 bg-[#D9DE00] text-black px-6 py-3 rounded font-bold font-raleway tracking-wider uppercase hover:bg-[#b0b300] transition-colors">
                            <Plus size={18} />
                            <span>Add Property</span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Filters & Search Bar */}
            <div className="bg-[#111] border border-white/10 p-4 rounded-lg mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search properties..."
                        className="w-full bg-black border border-white/20 rounded pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#D9DE00]"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded text-gray-300 hover:text-white hover:border-white/40 transition-colors text-sm font-raleway">
                        <Filter size={16} />
                        Filter Status
                    </button>
                </div>
            </div>

            {/* Properties Table (Desktop) */}
            <div className="hidden md:block bg-[#111] border border-white/10 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black text-gray-400 text-xs font-bold font-raleway uppercase tracking-wider border-b border-white/10">
                                <th className="p-4">Property</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Location</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">Loading properties...</td>
                                </tr>
                            ) : properties.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">No properties found. Add your first one!</td>
                                </tr>
                            ) : (
                                properties.map((property) => (
                                    <tr key={property.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                                                    {property.image ? (
                                                        <img
                                                            src={property.image}
                                                            alt={property.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No Img</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-bold font-montserrat text-sm">{property.title}</h3>
                                                    <p className="text-gray-500 text-xs font-raleway truncate max-w-[200px]">{property.address}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${property.status === "FOR SALE" ? "bg-green-500/20 text-green-500" :
                                                property.status === "FOR RENT" ? "bg-blue-500/20 text-blue-500" :
                                                    property.status === "PENDING" ? "bg-yellow-500/20 text-yellow-500" :
                                                        "bg-red-500/20 text-red-500"
                                                }`}>
                                                {property.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-white font-raleway text-sm">
                                            {property.price}
                                        </td>
                                        <td className="p-4 text-gray-400 font-raleway text-sm">
                                            {property.address.split(',').pop()?.trim() || "Ghana"}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 transition-opacity">
                                                <button
                                                    className={`p-2 rounded transition-colors ${property.published ? "text-green-500 hover:bg-green-500/10" : "text-gray-500 hover:bg-white/10"}`}
                                                    title={property.published ? "Unpublish" : "Publish"}
                                                    onClick={() => handlePublish(property.id, property.published)}
                                                >
                                                    <Globe size={18} />
                                                </button>
                                                <Link href={`/admin/properties/${property.id}/edit`}>
                                                    <button className="p-2 text-blue-400 hover:bg-blue-400/10 rounded transition-colors" title="Edit">
                                                        <Pencil size={18} />
                                                    </button>
                                                </Link>
                                                <button
                                                    className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                                                    title="Delete"
                                                    onClick={() => handleDelete(property.id)}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Properties List (Mobile Cards) */}
            <div className="md:hidden space-y-4">
                {loading ? (
                    <div className="text-center text-gray-500 p-8">Loading properties...</div>
                ) : properties.length === 0 ? (
                    <div className="text-center text-gray-500 p-8">No properties found.</div>
                ) : (
                    properties.map((property) => (
                        <div key={property.id} className="bg-[#111] border border-white/10 rounded-lg overflow-hidden p-4">
                            <div className="flex gap-4">
                                <div className="w-24 h-24 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                                    {property.image ? (
                                        <img
                                            src={property.image}
                                            alt={property.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No Img</div>
                                    )}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-white font-bold font-montserrat text-sm truncate pr-2">{property.title}</h3>
                                        <span className={`inline-block px-2 py-0.5 rounded-full text-[8px] font-bold tracking-wide uppercase flex-shrink-0 ${property.status === "FOR SALE" ? "bg-green-500/20 text-green-500" :
                                            property.status === "FOR RENT" ? "bg-blue-500/20 text-blue-500" :
                                                property.status === "PENDING" ? "bg-yellow-500/20 text-yellow-500" :
                                                    "bg-red-500/20 text-red-500"
                                            }`}>
                                            {property.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-xs font-raleway truncate mb-2">{property.address}</p>
                                    <p className="text-[#D9DE00] font-bold font-montserrat text-sm mb-3">{property.price}</p>

                                    <div className="flex justify-between items-center border-t border-white/10 pt-3 mt-1">
                                        <div className="text-[10px] text-gray-600 font-raleway uppercase tracking-wider">
                                            {property.published ? "Published" : "Draft"}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                className={`p-1.5 rounded transition-colors ${property.published ? "text-green-500 bg-green-500/10" : "text-gray-500 bg-white/5"}`}
                                                onClick={() => handlePublish(property.id, property.published)}
                                            >
                                                <Globe size={14} />
                                            </button>
                                            <Link href={`/admin/properties/${property.id}/edit`}>
                                                <button className="p-1.5 text-blue-400 bg-blue-400/10 rounded transition-colors">
                                                    <Pencil size={14} />
                                                </button>
                                            </Link>
                                            <button
                                                className="p-1.5 text-red-400 bg-red-400/10 rounded transition-colors"
                                                onClick={() => handleDelete(property.id)}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
