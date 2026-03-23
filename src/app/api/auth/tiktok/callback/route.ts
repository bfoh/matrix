// TikTok OAuth callback handler
import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken, getUserInfo } from '@/lib/tiktok';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    // Handle OAuth errors
    if (error) {
        console.error('TikTok OAuth error:', error, errorDescription);
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_SITE_URL}/admin/social-settings?error=${encodeURIComponent(errorDescription || error)}`
        );
    }

    if (!code) {
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_SITE_URL}/admin/social-settings?error=no_code`
        );
    }

    try {
        // Exchange code for tokens
        const tokens = await exchangeCodeForToken(code);

        // Get user info
        const userInfo = await getUserInfo(tokens.access_token);

        // Calculate expiry time
        const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString();

        // Store/update connection in Supabase
        const { error: dbError } = await supabase
            .from('social_connections')
            .upsert({
                platform: 'tiktok',
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                expires_at: expiresAt,
                user_info: {
                    open_id: userInfo.open_id,
                    display_name: userInfo.display_name,
                    avatar_url: userInfo.avatar_url,
                },
                updated_at: new Date().toISOString(),
            }, {
                onConflict: 'platform',
            });

        if (dbError) {
            console.error('Failed to store TikTok connection:', dbError);
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_SITE_URL}/admin/social-settings?error=db_error`
            );
        }

        // Success - redirect to social settings
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_SITE_URL}/admin/social-settings?success=tiktok_connected`
        );

    } catch (error) {
        console.error('TikTok callback error:', error);
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_SITE_URL}/admin/social-settings?error=callback_failed`
        );
    }
}
