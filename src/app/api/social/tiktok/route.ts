// TikTok video posting API
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
    refreshAccessToken,
    initVideoUpload,
    uploadVideoChunk,
    getPublishStatus
} from '@/lib/tiktok';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
    try {
        // Get TikTok connection from database
        const { data: connection, error: dbError } = await supabase
            .from('social_connections')
            .select('*')
            .eq('platform', 'tiktok')
            .single();

        if (dbError || !connection) {
            return NextResponse.json(
                { error: 'TikTok not connected. Please connect your account first.' },
                { status: 401 }
            );
        }

        // Check if token needs refresh
        let accessToken = connection.access_token;
        const expiresAt = new Date(connection.expires_at);

        if (expiresAt.getTime() < Date.now() + 5 * 60 * 1000) { // 5 min buffer
            try {
                const newTokens = await refreshAccessToken(connection.refresh_token);
                accessToken = newTokens.access_token;

                // Update tokens in database
                await supabase
                    .from('social_connections')
                    .update({
                        access_token: newTokens.access_token,
                        refresh_token: newTokens.refresh_token,
                        expires_at: new Date(Date.now() + newTokens.expires_in * 1000).toISOString(),
                        updated_at: new Date().toISOString(),
                    })
                    .eq('platform', 'tiktok');
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                return NextResponse.json(
                    { error: 'TikTok session expired. Please reconnect your account.' },
                    { status: 401 }
                );
            }
        }

        // Get video from request body
        const formData = await request.formData();
        const videoFile = formData.get('video') as File;
        const title = formData.get('title') as string || 'Property Tour';

        if (!videoFile) {
            return NextResponse.json(
                { error: 'No video file provided' },
                { status: 400 }
            );
        }

        // Convert file to ArrayBuffer
        const videoBuffer = await videoFile.arrayBuffer();
        const videoSize = videoBuffer.byteLength;
        const chunkSize = 10 * 1024 * 1024; // 10MB chunks

        // Initialize upload
        const { publish_id, upload_url } = await initVideoUpload(
            accessToken,
            videoSize,
            chunkSize
        );

        // Upload in chunks
        const totalChunks = Math.ceil(videoSize / chunkSize);

        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, videoSize);
            const chunk = videoBuffer.slice(start, end);

            await uploadVideoChunk(upload_url, chunk, i, totalChunks, videoSize);
        }

        // Check publish status
        let status = 'PROCESSING_UPLOAD';
        let attempts = 0;
        const maxAttempts = 30; // 5 minutes max wait

        while (status === 'PROCESSING_UPLOAD' && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10s
            const statusResult = await getPublishStatus(accessToken, publish_id);
            status = statusResult.status;

            if (status === 'FAILED') {
                return NextResponse.json(
                    { error: `Upload failed: ${statusResult.fail_reason}` },
                    { status: 500 }
                );
            }

            attempts++;
        }

        return NextResponse.json({
            success: true,
            publish_id,
            status,
            message: status === 'PUBLISH_COMPLETE'
                ? 'Video published successfully!'
                : 'Video uploaded. Processing on TikTok...',
        });

    } catch (error) {
        console.error('TikTok posting error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to post to TikTok' },
            { status: 500 }
        );
    }
}

// GET endpoint to check TikTok connection status
export async function GET() {
    try {
        const { data: connection, error } = await supabase
            .from('social_connections')
            .select('user_info, expires_at')
            .eq('platform', 'tiktok')
            .single();

        if (error || !connection) {
            return NextResponse.json({ connected: false });
        }

        const isExpired = new Date(connection.expires_at).getTime() < Date.now();

        return NextResponse.json({
            connected: !isExpired,
            user: connection.user_info,
            expires_at: connection.expires_at,
        });
    } catch (error) {
        return NextResponse.json({ connected: false, error: 'Failed to check status' });
    }
}
