"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const supabase = createClient();
        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        router.push("/admin/dashboard");
        router.refresh(); // Refresh to ensure checking auth state if using middleware
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md bg-[#111] border border-white/10 p-8 rounded-lg shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold font-montserrat tracking-wider text-white">
                        MATRIX <span className="text-[#D9DE00]">ADMIN</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-2 font-raleway">Sign in to manage your properties</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold font-raleway uppercase tracking-wider text-gray-500 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full bg-black border border-white/20 rounded p-3 text-white focus:outline-none focus:border-[#D9DE00] transition-colors"
                            placeholder="admin@matrix.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold font-raleway uppercase tracking-wider text-gray-500 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full bg-black border border-white/20 rounded p-3 text-white focus:outline-none focus:border-[#D9DE00] transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#D9DE00] text-black font-bold font-raleway uppercase tracking-wider py-4 rounded hover:bg-[#b0b300] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
