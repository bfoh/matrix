"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { X, Calendar, User, Mail, Phone, MessageSquare, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        message: "",
    });

    const supabase = createClient();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from("appointments")
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        preferred_date: formData.date ? new Date(formData.date).toISOString() : null,
                        message: formData.message,
                    },
                ]);

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setFormData({ name: "", email: "", phone: "", date: "", message: "" });
                onClose();
            }, 3000);
        } catch (error) {
            console.error("Error submitting appointment:", error);
            alert("Failed to submit appointment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-[#111] border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]">

                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#161616]">
                                <h2 className="text-xl font-montserrat font-bold text-white tracking-wide uppercase">
                                    Book Appointment
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white transition-colors p-1"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                {success ? (
                                    <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                                        <div className="w-16 h-16 bg-[#D9DE00] rounded-full flex items-center justify-center mb-2">
                                            <User className="text-black w-8 h-8" />
                                            {/* Replacing Icon with a simple Check or just reusable logic */}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white font-montserrat">Request Received!</h3>
                                        <p className="text-gray-400 font-raleway">
                                            Thank you, {formData.name}.<br />We will contact you shortly to confirm.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">

                                        {/* Name */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[#D9DE00] uppercase tracking-wider flex items-center gap-2">
                                                <User size={14} /> Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D9DE00] transition-colors font-raleway"
                                                placeholder="e.g. John Doe"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[#D9DE00] uppercase tracking-wider flex items-center gap-2">
                                                <Mail size={14} /> Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D9DE00] transition-colors font-raleway"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[#D9DE00] uppercase tracking-wider flex items-center gap-2">
                                                <Phone size={14} /> Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D9DE00] transition-colors font-raleway"
                                                placeholder="+233 20 123 4567"
                                            />
                                        </div>

                                        {/* Date */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[#D9DE00] uppercase tracking-wider flex items-center gap-2">
                                                <Calendar size={14} /> Preferred Date
                                            </label>
                                            <input
                                                type="datetime-local"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D9DE00] transition-colors font-raleway [&::-webkit-calendar-picker-indicator]:invert"
                                            />
                                        </div>

                                        {/* Message */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[#D9DE00] uppercase tracking-wider flex items-center gap-2">
                                                <MessageSquare size={14} /> Message (Optional)
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={3}
                                                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D9DE00] transition-colors font-raleway resize-none"
                                                placeholder="Any specific property or requirements?"
                                            />
                                        </div>

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-[#D9DE00] text-black font-bold py-4 rounded-lg uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 mt-4"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 size={20} className="animate-spin" /> Processing...
                                                </>
                                            ) : (
                                                "Confirm Request"
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
