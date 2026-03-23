// TikTok Content Posting API Library
// Documentation: https://developers.tiktok.com/doc/content-posting-api-get-started

const TIKTOK_AUTH_URL = 'https://www.tiktok.com/v2/auth/authorize/';
const TIKTOK_TOKEN_URL = 'https://open.tiktokapis.com/v2/oauth/token/';
const TIKTOK_API_URL = 'https://open.tiktokapis.com/v2';

export interface TikTokTokens {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    open_id: string;
    scope: string;
    token_type: string;
}

export interface TikTokUserInfo {
    open_id: string;
    display_name: string;
    avatar_url: string;
}

export interface UploadInitResponse {
    publish_id: string;
    upload_url: string;
}

/**
 * Generate the TikTok OAuth authorization URL
 */
export function getAuthorizationUrl(): string {
    const clientKey = process.env.TIKTOK_CLIENT_KEY;
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/tiktok/callback`;

    const params = new URLSearchParams({
        client_key: clientKey || '',
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'user.info.basic,video.publish',
    });

    return `${TIKTOK_AUTH_URL}?${params.toString()}`;
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(code: string): Promise<TikTokTokens> {
    const clientKey = process.env.TIKTOK_CLIENT_KEY;
    const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/tiktok/callback`;

    const response = await fetch(TIKTOK_TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_key: clientKey || '',
            client_secret: clientSecret || '',
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
        }),
    });

    const data = await response.json();

    if (data.error) {
        throw new Error(`TikTok OAuth error: ${data.error_description || data.error}`);
    }

    return data;
}

/**
 * Refresh an expired access token
 */
export async function refreshAccessToken(refreshToken: string): Promise<TikTokTokens> {
    const clientKey = process.env.TIKTOK_CLIENT_KEY;
    const clientSecret = process.env.TIKTOK_CLIENT_SECRET;

    const response = await fetch(TIKTOK_TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_key: clientKey || '',
            client_secret: clientSecret || '',
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
        }),
    });

    const data = await response.json();

    if (data.error) {
        throw new Error(`Token refresh error: ${data.error_description || data.error}`);
    }

    return data;
}

/**
 * Get user info from TikTok
 */
export async function getUserInfo(accessToken: string): Promise<TikTokUserInfo> {
    const response = await fetch(`${TIKTOK_API_URL}/user/info/?fields=open_id,display_name,avatar_url`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    const data = await response.json();

    if (data.error?.code !== 'ok') {
        throw new Error(`Failed to get user info: ${data.error?.message || 'Unknown error'}`);
    }

    return data.data.user;
}

/**
 * Initialize video upload to TikTok using FILE_UPLOAD method
 * This is the "Direct Post" method for publishing directly
 */
export async function initVideoUpload(
    accessToken: string,
    videoSize: number,
    chunkSize: number = 10 * 1024 * 1024 // 10MB chunks
): Promise<UploadInitResponse> {
    const response = await fetch(`${TIKTOK_API_URL}/post/publish/video/init/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            post_info: {
                title: '', // Will be set later
                privacy_level: 'SELF_ONLY', // Start as private, user can change on TikTok
                disable_duet: false,
                disable_comment: false,
                disable_stitch: false,
            },
            source_info: {
                source: 'FILE_UPLOAD',
                video_size: videoSize,
                chunk_size: chunkSize,
                total_chunk_count: Math.ceil(videoSize / chunkSize),
            },
        }),
    });

    const data = await response.json();

    if (data.error?.code !== 'ok') {
        throw new Error(`Failed to init upload: ${data.error?.message || 'Unknown error'}`);
    }

    return {
        publish_id: data.data.publish_id,
        upload_url: data.data.upload_url,
    };
}

/**
 * Upload a video chunk to TikTok
 */
export async function uploadVideoChunk(
    uploadUrl: string,
    chunk: ArrayBuffer,
    chunkIndex: number,
    totalChunks: number,
    totalFileSize: number
): Promise<void> {
    const startByte = chunkIndex * chunk.byteLength;
    const endByte = startByte + chunk.byteLength - 1;

    const response = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'video/mp4',
            'Content-Length': chunk.byteLength.toString(),
            'Content-Range': `bytes ${startByte}-${endByte}/${totalFileSize}`,
        },
        body: chunk,
    });

    if (!response.ok) {
        throw new Error(`Failed to upload chunk ${chunkIndex + 1}/${totalChunks}: ${response.statusText}`);
    }
}

/**
 * Check the status of a video upload/publish
 */
export async function getPublishStatus(
    accessToken: string,
    publishId: string
): Promise<{ status: string; fail_reason?: string }> {
    const response = await fetch(`${TIKTOK_API_URL}/post/publish/status/fetch/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            publish_id: publishId,
        }),
    });

    const data = await response.json();

    if (data.error?.code !== 'ok') {
        throw new Error(`Failed to get publish status: ${data.error?.message || 'Unknown error'}`);
    }

    return {
        status: data.data.status,
        fail_reason: data.data.fail_reason,
    };
}

/**
 * Full flow: Upload and publish a video to TikTok
 * Returns the publish_id for status tracking
 */
export async function uploadAndPublishVideo(
    accessToken: string,
    videoBuffer: ArrayBuffer,
    title: string
): Promise<string> {
    const videoSize = videoBuffer.byteLength;
    const chunkSize = 10 * 1024 * 1024; // 10MB chunks

    // Initialize upload
    const { publish_id, upload_url } = await initVideoUpload(accessToken, videoSize, chunkSize);

    // Upload in chunks
    const totalChunks = Math.ceil(videoSize / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, videoSize);
        const chunk = videoBuffer.slice(start, end);

        await uploadVideoChunk(upload_url, chunk, i, totalChunks, videoSize);
    }

    return publish_id;
}
