"use client";

import Link from "next/link";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function EditProperty() {
    const router = useRouter();
    const params = useParams();
    const supabase = createClient();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Image State
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [newPreviewUrls, setNewPreviewUrls] = useState<string[]>([]);

    // Video State
    const [video, setVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [existingVideo, setExistingVideo] = useState<string | null>(null);

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

    useEffect(() => {
        fetchProperty();
    }, []);

    const fetchProperty = async () => {
        if (!params.id) return;

        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .eq('id', params.id)
            .single();

        if (error) {
            console.error(error);
            alert("Error fetching property");
            router.push("/admin/dashboard");
            return;
        }

        if (data) {
            setTitle(data.title || "");
            setPrice(data.price || "");
            setStatus(data.status || "FOR SALE");
            setAddress(data.address || "");
            setBeds(data.bedrooms?.toString() || "");
            setBaths(data.bathrooms?.toString() || "");
            setArea(data.area_sqm?.toString() || "");
            setPlots(data.plot_size || "");
            setExistingVideo(data.video_url || null);

            // Description is stored as array in DB based on previous findings
            if (Array.isArray(data.description)) {
                setDescription(data.description.join('\n\n'));
            } else {
                setDescription(data.description || "");
            }

            // Handle images
            if (data.images && Array.isArray(data.images) && data.images.length > 0) {
                setExistingImages(data.images);
            } else if (data.image) {
                setExistingImages([data.image]);
            }
        }
        setLoading(false);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setNewImages(prev => [...prev, ...files]);

            // Create previews
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setNewPreviewUrls(prev => [...prev, ...newPreviews]);
        }
    };

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setVideo(file);
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    const removeNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
        setNewPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeVideo = () => {
        setVideo(null);
        setVideoPreview(null);
    };

    const removeExistingVideo = () => {
        setExistingVideo(null);
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
            setSaving(true);

            // 1. Upload NEW Images
            const uploadedUrls = [];
            for (const image of newImages) {
                const url = await uploadImage(image);
                uploadedUrls.push(url);
            }

            // 2. Combine with existing images
            const finalImages = [...existingImages, ...uploadedUrls];
            const mainImage = finalImages.length > 0 ? finalImages[0] : null;

            // 3. Upload Video if new one selected
            let videoUrl = existingVideo;
            if (video) {
                videoUrl = await uploadImage(video);
            } else if (existingVideo === null && videoPreview === null) {
                // Explicitly set to null if removed and no new one added
                videoUrl = null;
            }

            // 3. Update Data
            const { error } = await supabase
                .from('properties')
                .update({
                    title,
                    price,
                    status,
                    address,
                    bedrooms: parseInt(beds) || 0,
                    bathrooms: parseFloat(baths) || 0,
                    area_sqm: parseInt(area) || 0,
                    plot_size: plots,
                    description: description.split('\n\n').filter(p => p.trim() !== ""), // Split back into paragraphs
                    image: mainImage,
                    images: finalImages,
                    video_url: videoUrl
                })
                .eq('id', params.id);

            if (error) throw error;

            alert("Property updated successfully!");
            router.push("/admin/dashboard");

        } catch (error: any) {
            console.error(error);
            alert("Error updating property: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-10 text-center text-white">Loading property details...</div>;
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors font-raleway text-sm">
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <h1 className="text-3xl font-montserrat font-bold text-white mb-8">EDIT PROPERTY</h1>

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
                            <p className="text-xs text-gray-500 mb-2">Separate paragraphs with a blank line.</p>
                            <textarea
                                rows={8}
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
                            <p className="text-gray-400 text-sm font-raleway">Drag & drop or click to add images</p>
                        </div>

                        {/* Existing Images */}
                        {existingImages.length > 0 && (
                            <div className="mt-6 space-y-2">
                                <h3 className="text-xs text-gray-500 font-bold">EXISTING IMAGES</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {existingImages.map((src, idx) => (
                                        <div key={`existing-${idx}`} className="relative aspect-square rounded overflow-hidden group">
                                            <img src={src} alt="Existing" className="w-full h-full object-cover" />
                                            <button
                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => removeExistingImage(idx)}
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* New Images */}
                        {newPreviewUrls.length > 0 && (
                            <div className="mt-6 space-y-2">
                                <h3 className="text-xs text-green-500 font-bold">NEW IMAGES TO UPLOAD</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {newPreviewUrls.map((src, idx) => (
                                        <div key={`new-${idx}`} className="relative aspect-square rounded overflow-hidden group">
                                            <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => removeNewImage(idx)}
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Video Upload Section */}
                        <div className="mt-8 border-t border-white/10 pt-6">
                            <h3 className="text-xs font-bold font-raleway uppercase tracking-wider text-gray-500 mb-4">Property Video</h3>

                            {/* Existing Video */}
                            {existingVideo && !videoPreview && (
                                <div className="relative rounded overflow-hidden mt-2 mb-4 group">
                                    <h4 className="text-[10px] text-gray-500 mb-1">CURRENT VIDEO</h4>
                                    <video src={existingVideo} className="w-full h-auto rounded" controls />
                                    <button
                                        className="absolute top-8 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={removeExistingVideo}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}

                            {!videoPreview ? (
                                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#D9DE00] hover:bg-white/5 transition-all group relative">
                                    <input
                                        type="file"
                                        accept="video/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleVideoUpload}
                                    />
                                    <Upload className="text-gray-500 group-hover:text-[#D9DE00] mb-2 transition-colors" size={24} />
                                    <p className="text-gray-400 text-xs font-raleway">
                                        {existingVideo ? "Click to replace video" : "Click to upload video"}
                                    </p>
                                </div>
                            ) : (
                                <div className="relative rounded overflow-hidden mt-2 group">
                                    <h4 className="text-[10px] text-green-500 mb-1">NEW VIDEO</h4>
                                    <video src={videoPreview} className="w-full h-auto rounded" controls />
                                    <button
                                        className="absolute top-8 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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
                        disabled={saving}
                    >
                        {saving ? "UPDATING..." : "UPDATE PROPERTY"}
                    </button>
                </div>
            </div>
        </div>
    );
}
