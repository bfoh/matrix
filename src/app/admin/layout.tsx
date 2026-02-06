"use client";

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
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold font-montserrat tracking-wider">
                        MATRIX <span className="text-[#D9DE00]">ADMIN</span>
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/admin/dashboard"
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
                        className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${pathname === "/admin/appointments"
                            ? "bg-[#D9DE00] text-black font-bold"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <Calendar size={20} />
                        <span className="text-sm tracking-wide font-raleway font-semibold">APPOINTMENTS</span>
                    </Link>

                    <Link
                        href="/admin/properties/new"
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
            <main className="flex-1 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
}
