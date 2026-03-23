// TikTok disconnect API
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST() {
    try {
        const { error } = await supabase
            .from('social_connections')
            .delete()
            .eq('platform', 'tiktok');

        if (error) {
            console.error('Failed to disconnect TikTok:', error);
            return NextResponse.json({ error: 'Failed to disconnect' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Disconnect error:', error);
        return NextResponse.json({ error: 'Failed to disconnect' }, { status: 500 });
    }
}
