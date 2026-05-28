"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Calendar, Mail, MessageSquare, Phone, User, Loader2, Trash2, Mic, Globe } from "lucide-react";

interface Appointment {
    id: string;
    created_at: string;
    name: string;
    email?: string;
    phone: string;
    preferred_date?: string | null;
    date?: string | null;
    time?: string | null;
    message?: string | null;
    notes?: string | null;
    status?: string;
    source?: string;
}

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("appointments")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setAppointments(data || []);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteAppointment = async (id: string) => {
        if (!confirm("Are you sure you want to delete this appointment?")) return;
        setDeleting(id);
        try {
            const res = await fetch(`/api/appointments/delete?id=${id}`, {
                method: "DELETE",
            });
            const result = await res.json();
            if (!res.ok || result.error) throw new Error(result.error || "Delete failed");
            setAppointments((prev) => prev.filter((a) => a.id !== id));
        } catch (error) {
            console.error("Error deleting appointment:", error);
            alert("Failed to delete appointment.");
        } finally {
            setDeleting(null);
        }
    };

    // Helper: determine the display date from either preferred_date or date+time fields
    const getDisplayDate = (apt: Appointment) => {
        if (apt.preferred_date) {
            return {
                date: new Date(apt.preferred_date).toLocaleDateString(),
                time: new Date(apt.preferred_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
        }
        if (apt.date) {
            return {
                date: new Date(apt.date).toLocaleDateString(),
                time: apt.time || "Not specified",
            };
        }
        return null;
    };

    // Helper: determine source
    const isVoiceAI = (apt: Appointment) => {
        return apt.message?.startsWith("[Voice AI]") || false;
    };

    // Helper: get the message or notes, stripping the Voice AI prefix for display
    const getNotesOrMessage = (apt: Appointment) => {
        if (apt.message?.startsWith("[Voice AI] ")) {
            return apt.message.replace("[Voice AI] ", "");
        }
        return apt.message || apt.notes || null;
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center text-white">
                <Loader2 size={32} className="animate-spin text-[#D9DE00]" />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            <header className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="min-w-0">
                    <h1 className="text-2xl md:text-3xl font-montserrat font-bold text-white mb-1 md:mb-2">
                        APPOINTMENTS
                    </h1>
                    <p className="text-gray-400 font-raleway text-xs md:text-sm">
                        View and manage booking requests.
                    </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg px-3 md:px-4 py-2 self-start sm:self-auto">
                    <span className="text-[#D9DE00] font-bold text-base md:text-lg">{appointments.length}</span>
                    <span className="text-gray-400 text-xs md:text-sm ml-2">Total Request(s)</span>
                </div>
            </header>

            {appointments.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10 dashed">
                    <Calendar size={48} className="text-gray-600 mx-auto mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">No Appointments Yet</h3>
                    <p className="text-gray-400 text-sm">Booking requests will appear here.</p>
                </div>
            ) : (
                <>
                {/* Mobile cards */}
                <div className="md:hidden space-y-3">
                    {appointments.map((apt) => {
                        const dateInfo = getDisplayDate(apt);
                        const voiceAI = isVoiceAI(apt);
                        const noteText = getNotesOrMessage(apt);
                        return (
                            <div key={apt.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="w-8 h-8 rounded-full bg-[#D9DE00]/20 flex items-center justify-center text-[#D9DE00] flex-shrink-0">
                                            <User size={14} />
                                        </div>
                                        <span className="text-white font-bold font-montserrat text-sm truncate">{apt.name}</span>
                                    </div>
                                    {voiceAI ? (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-accent/15 text-[#E31837] border border-accent/30 flex-shrink-0">
                                            <Mic size={10} /> Voice
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-[#D9DE00]/10 text-[#D9DE00] border border-[#D9DE00]/30 flex-shrink-0">
                                            <Globe size={10} /> Online
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-1.5 mb-3">
                                    {apt.phone && (
                                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                                            <Phone size={12} className="text-gray-500 flex-shrink-0" />
                                            <a href={`tel:${apt.phone}`} className="hover:text-[#D9DE00] truncate">{apt.phone}</a>
                                        </div>
                                    )}
                                    {apt.email && (
                                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                                            <Mail size={12} className="text-gray-500 flex-shrink-0" />
                                            <a href={`mailto:${apt.email}`} className="hover:text-[#D9DE00] truncate">{apt.email}</a>
                                        </div>
                                    )}
                                </div>

                                {dateInfo && (
                                    <div className="inline-flex items-center gap-2 text-[#D9DE00] text-xs font-mono bg-[#D9DE00]/10 px-2 py-1 rounded mb-3">
                                        <Calendar size={12} />
                                        {dateInfo.date}
                                        <span className="text-white/40">|</span>
                                        {dateInfo.time}
                                    </div>
                                )}

                                {noteText && (
                                    <div className="flex gap-2 mb-3 pb-3 border-b border-white/5">
                                        <MessageSquare size={12} className="text-gray-500 mt-1 flex-shrink-0" />
                                        <p className="text-gray-300 text-sm leading-relaxed">{noteText}</p>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 text-[10px] font-mono">
                                        {new Date(apt.created_at).toLocaleDateString()}
                                    </span>
                                    <button
                                        onClick={() => deleteAppointment(apt.id)}
                                        disabled={deleting === apt.id}
                                        className="tap-target -mr-2 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all disabled:opacity-50"
                                        aria-label="Delete appointment"
                                    >
                                        {deleting === apt.id ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <Trash2 size={16} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Desktop table */}
                <div className="hidden md:block bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black/40 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider font-raleway">
                                    <th className="p-4 font-semibold">Client Details</th>
                                    <th className="p-4 font-semibold">Contact Info</th>
                                    <th className="p-4 font-semibold">Preferred Date</th>
                                    <th className="p-4 font-semibold">Message</th>
                                    <th className="p-4 font-semibold">Source</th>
                                    <th className="p-4 font-semibold">Submitted</th>
                                    <th className="p-4 font-semibold text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {appointments.map((apt) => {
                                    const dateInfo = getDisplayDate(apt);
                                    const voiceAI = isVoiceAI(apt);
                                    const noteText = getNotesOrMessage(apt);

                                    return (
                                        <tr key={apt.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-4 align-top">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#D9DE00]/20 flex items-center justify-center text-[#D9DE00]">
                                                        <User size={14} />
                                                    </div>
                                                    <span className="text-white font-bold font-montserrat text-sm">
                                                        {apt.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-top space-y-1">
                                                {apt.email && (
                                                    <div className="flex items-center gap-2 text-gray-300 text-sm font-raleway">
                                                        <Mail size={12} className="text-gray-500" />
                                                        {apt.email}
                                                    </div>
                                                )}
                                                {apt.phone && (
                                                    <div className="flex items-center gap-2 text-gray-300 text-sm font-raleway">
                                                        <Phone size={12} className="text-gray-500" />
                                                        {apt.phone}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-4 align-top">
                                                {dateInfo ? (
                                                    <div className="flex items-center gap-2 text-[#D9DE00] text-sm font-mono bg-[#D9DE00]/10 px-2 py-1 rounded w-fit">
                                                        <Calendar size={12} />
                                                        {dateInfo.date}
                                                        <span className="text-white/50">|</span>
                                                        {dateInfo.time}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-500 text-xs italic">Not specified</span>
                                                )}
                                            </td>
                                            <td className="p-4 align-top">
                                                {noteText ? (
                                                    <div className="flex gap-2 max-w-xs">
                                                        <MessageSquare size={12} className="text-gray-500 mt-1 flex-shrink-0" />
                                                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 hover:line-clamp-none transition-all cursor-pointer" title={noteText}>
                                                            {noteText}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-500 text-xs italic">No message</span>
                                                )}
                                            </td>
                                            <td className="p-4 align-top">
                                                {voiceAI ? (
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold font-raleway uppercase tracking-wider px-3 py-1.5 rounded-full bg-accent/15 text-[#E31837] border border-accent/30">
                                                        <Mic size={11} />
                                                        Voice AI
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold font-raleway uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#D9DE00]/10 text-[#D9DE00] border border-[#D9DE00]/30">
                                                        <Globe size={11} />
                                                        Online
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 align-top text-gray-500 text-xs font-mono">
                                                {new Date(apt.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 align-top text-center">
                                                <button
                                                    onClick={() => deleteAppointment(apt.id)}
                                                    disabled={deleting === apt.id}
                                                    className="p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200 disabled:opacity-50"
                                                    title="Delete appointment"
                                                >
                                                    {deleting === apt.id ? (
                                                        <Loader2 size={16} className="animate-spin" />
                                                    ) : (
                                                        <Trash2 size={16} />
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                </>
            )}
        </div>
    );
}
