"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, LogOut, Home, Calendar } from "lucide-react";


import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    const isLoginPage = pathname === "/admin/login";

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    if (isLoginPage) {
        return <div className="min-h-screen bg-black text-white">{children}</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black z-20 sticky top-0">
                <h1 className="text-lg font-bold font-montserrat tracking-wider">
                    MATRIX <span className="text-[#D9DE00]">ADMIN</span>
                </h1>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-400 hover:text-white"
                >
                    {isMobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    )}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-40 w-64 bg-black border-r border-white/10 
                transform transition-transform duration-300 ease-in-out md:transform-none
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                flex flex-col h-full
            `}>
                <div className="p-6 border-b border-white/10 hidden md:block">
                    <h1 className="text-xl font-bold font-montserrat tracking-wider">
                        MATRIX <span className="text-[#D9DE00]">ADMIN</span>
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <Link
                        href="/admin/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${pathname === "/admin/dashboard"
                            ? "bg-[#D9DE00] text-black font-bold"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <LayoutDashboard size={20} />
                        <span className="text-sm tracking-wide font-raleway font-semibold">DASHBOARD</span>
                    </Link>

                    <Link
                        href="/admin/appointments"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${pathname === "/admin/appointments"
                            ? "bg-[#D9DE00] text-black font-bold"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <Calendar size={20} />
                        <span className="text-sm tracking-wide font-raleway font-semibold">APPOINTMENTS</span>
                    </Link>

                    <Link
                        href="/admin/share-cards"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${pathname === "/admin/share-cards"
                            ? "bg-[#D9DE00] text-black font-bold"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share-2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>
                        <span className="text-sm tracking-wide font-raleway font-semibold">SHARE CARDS</span>
                    </Link>

                    <Link
                        href="/admin/social-settings"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${pathname === "/admin/social-settings"
                            ? "bg-[#D9DE00] text-black font-bold"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                        <span className="text-sm tracking-wide font-raleway font-semibold">SETTINGS</span>
                    </Link>

                    <Link
                        href="/admin/properties/new"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${pathname === "/admin/properties/new"
                            ? "bg-[#D9DE00] text-black font-bold"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <PlusCircle size={20} />
                        <span className="text-sm tracking-wide font-raleway font-semibold">ADD PROPERTY</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/10 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                    >
                        <Home size={20} />
                        <span className="text-sm tracking-wide font-raleway font-semibold">VISIT SITE</span>
                    </Link>
                    <button
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                        onClick={handleLogout}
                    >
                        <LogOut size={20} />
                        <span className="text-sm tracking-wide font-raleway font-semibold">LOGOUT</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] md:h-screen">
                {children}
            </main>
        </div>
    );
}
