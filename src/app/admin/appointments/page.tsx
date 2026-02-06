"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Calendar, Mail, MessageSquare, Phone, User, Loader2 } from "lucide-react";

interface Appointment {
    id: string;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    preferred_date: string | null;
    message: string | null;
    status: string;
}

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
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
            // alert("Failed to load appointments");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center text-white">
                <Loader2 size={32} className="animate-spin text-[#D9DE00]" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-montserrat font-bold text-white mb-2">
                        APPOINTMENTS
                    </h1>
                    <p className="text-gray-400 font-raleway text-sm">
                        View and manage booking requests.
                    </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                    <span className="text-[#D9DE00] font-bold text-lg">{appointments.length}</span>
                    <span className="text-gray-400 text-sm ml-2">Total Request(s)</span>
                </div>
            </header>

            {appointments.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10 dashed">
                    <Calendar size={48} className="text-gray-600 mx-auto mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">No Appointments Yet</h3>
                    <p className="text-gray-400 text-sm">Booking requests will appear here.</p>
                </div>
            ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black/40 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider font-raleway">
                                    <th className="p-4 font-semibold">Client Details</th>
                                    <th className="p-4 font-semibold">Contact Info</th>
                                    <th className="p-4 font-semibold">Preferred Date</th>
                                    <th className="p-4 font-semibold">Message</th>
                                    <th className="p-4 font-semibold">Submitted</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {appointments.map((apt) => (
                                    <tr key={apt.id} className="hover:bg-white/5 transition-colors">
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
                                            <div className="flex items-center gap-2 text-gray-300 text-sm font-raleway">
                                                <Mail size={12} className="text-gray-500" />
                                                {apt.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-300 text-sm font-raleway">
                                                <Phone size={12} className="text-gray-500" />
                                                {apt.phone}
                                            </div>
                                        </td>
                                        <td className="p-4 align-top">
                                            {apt.preferred_date ? (
                                                <div className="flex items-center gap-2 text-[#D9DE00] text-sm font-mono bg-[#D9DE00]/10 px-2 py-1 rounded w-fit">
                                                    <Calendar size={12} />
                                                    {new Date(apt.preferred_date).toLocaleDateString()}
                                                    <span className="text-white/50">|</span>
                                                    {new Date(apt.preferred_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            ) : (
                                                <span className="text-gray-500 text-xs italic">Not specified</span>
                                            )}
                                        </td>
                                        <td className="p-4 align-top">
                                            {apt.message ? (
                                                <div className="flex gap-2 max-w-xs">
                                                    <MessageSquare size={12} className="text-gray-500 mt-1 flex-shrink-0" />
                                                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 hover:line-clamp-none transition-all cursor-pointer" title={apt.message}>
                                                        {apt.message}
                                                    </p>
                                                </div>
                                            ) : (
                                                <span className="text-gray-500 text-xs italic">No message</span>
                                            )}
                                        </td>
                                        <td className="p-4 align-top text-gray-500 text-xs font-mono">
                                            {new Date(apt.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
