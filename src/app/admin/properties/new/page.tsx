"use client";

import Link from "next/link";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function NewProperty() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [video, setVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);

    // Form States
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("FOR SALE");
    const [address, setAddress] = useState("");
    const [beds, setBeds] = useState("");
    const [baths, setBaths] = useState("");
    const [area, setArea] = useState("");
    const [plots, setPlots] = useState("");
    const [description, setDescription] = useState("");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setImages(prev => [...prev, ...files]);

            // Create previews
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviewUrls(prev => [...prev, ...newPreviews]);
        }
    };

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setVideo(file);
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    const removeVideo = () => {
        setVideo(null);
        setVideoPreview(null);
    };

    const uploadImage = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('property-images')
            .upload(filePath, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage.from('property-images').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            // 1. Upload Images
            const uploadedUrls = [];
            for (const image of images) {
                const url = await uploadImage(image);
                uploadedUrls.push(url);
            }

            const mainImage = uploadedUrls.length > 0 ? uploadedUrls[0] : null;

            // 2. Upload Video (if exists)
            let videoUrl = null;
            if (video) {
                videoUrl = await uploadImage(video); // Reusing uploadImage logic as it works for any file
            }

            // 3. Insert Data
            const { error } = await supabase.from('properties').insert({
                title,
                price,
                status,
                address,
                bedrooms: parseInt(beds) || 0,
                bathrooms: parseFloat(baths) || 0,
                area_sqm: parseInt(area) || 0,
                plot_size: plots,
                description: [description], // Storing as array to match schema
                image: mainImage,
                images: uploadedUrls,
                video_url: videoUrl
            });

            if (error) throw error;

            alert("Property created successfully!");
            router.push("/admin/dashboard");

        } catch (error: any) {
            console.error(error);
            alert("Error creating property: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors font-raleway text-sm">
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <h1 className="text-3xl font-montserrat font-bold text-white mb-8">ADD NEW PROPERTY</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#111] border border-white/10 p-6 rounded-lg space-y-4">
                        <h2 className="text-lg font-bold font-montserrat text-[#D9DE00] mb-4">BASIC INFORMATION</h2>

                        <div>
                            <label className="block text-xs font-bold font-raleway uppercase tracking-wider text-gray-500 mb-2">Title</label>
                            <input
                                type="text"
                                className="w-full bg-black border border-white/20 rounded p-3 text-white focus:border-[#D9DE00] focus:outline-none"
                                placeholder="e.g. East Legon Luxury Villa"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold font-raleway uppercase tracking-wider text-gray-500 mb-2">Price</label>
                                <input
                                    type="text"
                                    className="w-full bg-black border border-white/20 rounded p-3 text-white focus:border-[#D9DE00] focus:outline-none"
                                    placeholder="e.g. $850,000"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold font-raleway uppercase tracking-wider text-gray-500 mb-2">Status</label>
                                <select
                                    className="w-full bg-black border border-white/20 rounded p-3 text-white focus:border-[#D9DE00] focus:outline-none"
                                    value={status}
                                    onChange={e => setStatus(e.target.value)}
                                >
                                    <option value="FOR SALE">FOR SALE</option>
                                    <option value="FOR RENT">FOR RENT</option>
                                    <option value="PENDING">PENDING</option>
                                    <option value="SOLD">SOLD</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold font-raleway uppercase tracking-wider text-gray-500 mb-2">Address</label>
                            <input
                                type="text"
                                className="w-full bg-black border border-white/20 rounded p-3 text-white focus:border-[#D9DE00] focus:outline-none"
                                placeholder="Full Address"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="bg-[#111] border border-white/10 p-6 rounded-lg space-y-4">
                        <h2 className="text-lg font-bold font-montserrat text-[#D9DE00] mb-4">DETAILS & DESCRIPTION</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-bold font-raleway uppercase tracking-wider text-gray-500 mb-2">Beds</label>
                                <input
                                    type="number"
                                    className="w-full bg-black border border-white/20 rounded p-3 text-white focus:border-[#D9DE00] focus:outline-none"
                                    value={beds}
                                    onChange={e => setBeds(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold font-raleway uppercase tracking-wider text-gray-500 mb-2">Baths</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    className="w-full bg-black border border-white/20 rounded p-3 text-white focus:border-[#D9DE00] focus:outline-none"
                                    value={baths}
                                    onChange={e => setBaths(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold font-raleway uppercase tracking-wider text-gray-500 mb-2">Area (SQ M)</label>
                                <input
                                    type="number"
                                    className="w-full bg-black border border-white/20 rounded p-3 text-white focus:border-[#D9DE00] focus:outline-none"
                                    value={area}
                                    onChange={e => setArea(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold font-raleway uppercase tracking-wider text-gray-500 mb-2">Plots/Acres</label>
                                <input
                                    type="text"
                                    className="w-full bg-black border border-white/20 rounded p-3 text-white focus:border-[#D9DE00] focus:outline-none"
                                    value={plots}
                                    onChange={e => setPlots(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold font-raleway uppercase tracking-wider text-gray-500 mb-2">Description</label>
                            <textarea
                                rows={6}
                                className="w-full bg-black border border-white/20 rounded p-4 text-white focus:border-[#D9DE00] focus:outline-none text-base"
                                placeholder="Enter detailed description..."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Media Section */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#111] border border-white/10 p-6 rounded-lg">
                        <h2 className="text-lg font-bold font-montserrat text-[#D9DE00] mb-4">MEDIA</h2>

                        <div className="border-2 border-dashed border-white/20 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#D9DE00] hover:bg-white/5 transition-all group relative">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleImageUpload}
                            />
                            <Upload className="text-gray-500 group-hover:text-[#D9DE00] mb-4 transition-colors" size={32} />
                            <p className="text-gray-400 text-sm font-raleway">Drag & drop or click to upload images</p>
                        </div>

                        {/* Image Preview Grid */}
                        {previewUrls.length > 0 && (
                            <div className="mt-6 grid grid-cols-2 gap-2">
                                <h3 className="col-span-2 text-xs text-gray-500 font-bold mb-2">IMAGES</h3>
                                {previewUrls.map((src, idx) => (
                                    <div key={idx} className="relative aspect-square rounded overflow-hidden group">
                                        <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => removeImage(idx)}
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Video Upload Section */}
                        <div className="mt-8 border-t border-white/10 pt-6">
                            <h3 className="text-xs font-bold font-raleway uppercase tracking-wider text-gray-500 mb-4">Property Video</h3>

                            {!videoPreview ? (
                                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#D9DE00] hover:bg-white/5 transition-all group relative">
                                    <input
                                        type="file"
                                        accept="video/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleVideoUpload}
                                    />
                                    {/* Using Upload icon as fallback if PlayCircle not imported */}
                                    <Upload className="text-gray-500 group-hover:text-[#D9DE00] mb-2 transition-colors" size={24} />
                                    <p className="text-gray-400 text-xs font-raleway">Click to upload video</p>
                                </div>
                            ) : (
                                <div className="relative rounded overflow-hidden mt-2 group">
                                    <video src={videoPreview} className="w-full h-auto rounded" controls />
                                    <button
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={removeVideo}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        className="w-full bg-[#D9DE00] text-black font-bold font-raleway uppercase tracking-wider py-4 md:py-5 rounded hover:bg-[#b0b300] transition-colors shadow-lg disabled:opacity-50 text-base"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "SAVING..." : "SAVE PROPERTY"}
                    </button>
                </div>
            </div>
        </div>
    );
}
