'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TikTokConnection {
    connected: boolean;
    user?: {
        display_name: string;
        avatar_url: string;
    };
    expires_at?: string;
}

export default function SocialSettingsPage() {
    const [tiktokStatus, setTiktokStatus] = useState<TikTokConnection>({ connected: false });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        // Check URL params for success/error messages
        const params = new URLSearchParams(window.location.search);
        const success = params.get('success');
        const error = params.get('error');

        if (success === 'tiktok_connected') {
            setMessage({ type: 'success', text: 'TikTok connected successfully!' });
        } else if (error) {
            setMessage({ type: 'error', text: `Connection failed: ${error}` });
        }

        // Fetch TikTok connection status
        fetchTikTokStatus();
    }, []);

    async function fetchTikTokStatus() {
        try {
            const res = await fetch('/api/social/tiktok');
            const data = await res.json();
            setTiktokStatus(data);
        } catch (error) {
            console.error('Failed to fetch TikTok status:', error);
        } finally {
            setLoading(false);
        }
    }

    async function disconnectTikTok() {
        if (!confirm('Are you sure you want to disconnect TikTok?')) return;

        try {
            const res = await fetch('/api/social/tiktok/disconnect', { method: 'POST' });
            if (res.ok) {
                setTiktokStatus({ connected: false });
                setMessage({ type: 'success', text: 'TikTok disconnected.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to disconnect.' });
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold">Social Media Settings</h1>
                    <Link
                        href="/admin/dashboard"
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>

                {/* Status Message */}
                {message && (
                    <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
                        }`}>
                        {message.text}
                    </div>
                )}

                {/* TikTok Card */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
                                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">TikTok</h2>
                            <p className="text-gray-400 text-sm">Post property videos directly to TikTok</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-gray-400">Loading...</div>
                    ) : tiktokStatus.connected ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                                {tiktokStatus.user?.avatar_url && (
                                    <img
                                        src={tiktokStatus.user.avatar_url}
                                        alt=""
                                        className="w-10 h-10 rounded-full"
                                    />
                                )}
                                <div>
                                    <div className="font-medium">{tiktokStatus.user?.display_name}</div>
                                    <div className="text-sm text-green-400 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                        Connected
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={disconnectTikTok}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors"
                            >
                                Disconnect
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-gray-400 text-sm">
                                Connect your TikTok account to post property videos directly from the admin dashboard.
                            </p>
                            <a
                                href="/api/auth/tiktok"
                                className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg font-medium transition-all"
                            >
                                Connect TikTok Account
                            </a>
                        </div>
                    )}
                </div>

                {/* Instagram (Coming Soon) */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 mt-6 opacity-60">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Instagram</h2>
                            <p className="text-gray-400 text-sm">Coming soon...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
