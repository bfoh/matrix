// TikTok OAuth initiation
import { NextResponse } from 'next/server';
import { getAuthorizationUrl } from '@/lib/tiktok';

export async function GET() {
    try {
        const authUrl = getAuthorizationUrl();
        return NextResponse.redirect(authUrl);
    } catch (error) {
        console.error('TikTok auth error:', error);
        return NextResponse.redirect('/admin/social-settings?error=auth_failed');
    }
}
