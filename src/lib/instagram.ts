// Instagram Graph API Library for Reels Publishing
// Documentation: https://developers.facebook.com/docs/instagram-api/guides/content-publishing

const FB_API_VERSION = 'v19.0';
const FB_BASE_URL = `https://graph.facebook.com/${FB_API_VERSION}`;

export interface InstagramTokens {
    access_token: string;
    expires_in: number;
    token_type: string;
}

export interface InstagramAccount {
    id: string; // Instagram Business Account ID
    username: string;
    profile_picture_url?: string;
    name?: string;
    fb_page_id: string; // Connected Facebook Page ID
}

export interface PublishContainerResponse {
    id: string; // Container ID
}

export interface PublishStatusResponse {
    id: string;
    status_code: 'EXPIRED' | 'IN_PROGRESS' | 'PUBLISHED' | 'FINISHED';
    status: string;
}

/**
 * Generate the Facebook Login OAuth URL
 */
export function getAuthorizationUrl(): string {
    const appId = process.env.FACEBOOK_APP_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/facebook/callback`;
    const state = 'instagram_reels_connect'; // Can be randomized for security

    const params = new URLSearchParams({
        client_id: appId || '',
        redirect_uri: redirectUri,
        state: state,
        response_type: 'code',
        // 'instagram_basic' and 'instagram_content_publish' are key for Reels
        // 'pages_show_list' and 'pages_read_engagement' needed for discovery
        scope: 'instagram_basic,instagram_content_publish,pages_show_list,pages_read_engagement'
    });

    return `https://www.facebook.com/${FB_API_VERSION}/dialog/oauth?${params.toString()}`;
}

/**
 * Exchange authorization code for short-lived user access token
 */
export async function exchangeCodeForToken(code: string): Promise<InstagramTokens> {
    const appId = process.env.FACEBOOK_APP_ID;
    const appSecret = process.env.FACEBOOK_APP_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/facebook/callback`;

    const response = await fetch(`${FB_BASE_URL}/oauth/access_token`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // Parameters sent as query string for GET
    } as RequestInit); // Casting to allow adding query params to URL below

    // Clean way to append params
    const url = new URL(`${FB_BASE_URL}/oauth/access_token`);
    url.searchParams.append('client_id', appId || '');
    url.searchParams.append('client_secret', appSecret || '');
    url.searchParams.append('redirect_uri', redirectUri);
    url.searchParams.append('code', code);

    const res = await fetch(url.toString());
    const data = await res.json();

    if (data.error) {
        throw new Error(`Facebook OAuth error: ${data.error.message}`);
    }

    return data;
}

/**
 * Exchange short-lived token for long-lived user token (60 days)
 */
export async function getLongLivedUserToken(shortLivedToken: string): Promise<InstagramTokens> {
    const appId = process.env.FACEBOOK_APP_ID;
    const appSecret = process.env.FACEBOOK_APP_SECRET;

    const url = new URL(`${FB_BASE_URL}/oauth/access_token`);
    url.searchParams.append('grant_type', 'fb_exchange_token');
    url.searchParams.append('client_id', appId || '');
    url.searchParams.append('client_secret', appSecret || '');
    url.searchParams.append('fb_exchange_token', shortLivedToken);

    const res = await fetch(url.toString());
    const data = await res.json();

    if (data.error) {
        throw new Error(`Token exchange error: ${data.error.message}`);
    }

    return data;
}

/**
 * Get User's Facebook Pages and connected Instagram Business Accounts
 * Takes a USER Access Token
 */
export async function getConnectedAccounts(userAccessToken: string): Promise<InstagramAccount[]> {
    // 1. Get User's Pages
    const url = new URL(`${FB_BASE_URL}/me/accounts`);
    url.searchParams.append('access_token', userAccessToken);
    // Request the connected instagram_business_account field
    url.searchParams.append('fields', 'id,name,access_token,instagram_business_account{id,username,profile_picture_url,name}');

    const res = await fetch(url.toString());
    const data = await res.json();

    if (data.error) {
        throw new Error(`Failed to fetch pages: ${data.error.message}`);
    }

    const validAccounts: InstagramAccount[] = [];

    // 2. Filter for pages with connected IG accounts
    if (data.data && Array.isArray(data.data)) {
        for (const page of data.data) {
            if (page.instagram_business_account) {
                validAccounts.push({
                    id: page.instagram_business_account.id,
                    username: page.instagram_business_account.username,
                    name: page.instagram_business_account.name,
                    profile_picture_url: page.instagram_business_account.profile_picture_url,
                    fb_page_id: page.id
                });
            }
        }
    }

    return validAccounts;
}

/**
 * Step 1: Create a specialized Reel Media Container
 * Video MUST be hosted on a public URL (Supabase)
 */
export async function createReelsContainer(
    igUserId: string,
    accessToken: string,
    videoUrl: string,
    caption: string = ''
): Promise<string> {
    const url = new URL(`${FB_BASE_URL}/${igUserId}/media`);
    url.searchParams.append('access_token', accessToken);
    url.searchParams.append('media_type', 'REELS');
    url.searchParams.append('video_url', videoUrl);
    url.searchParams.append('caption', caption);
    // Optional: Add cover_url if we generate a thumbnail later

    const res = await fetch(url.toString(), { method: 'POST' });
    const data = await res.json();

    if (data.error) {
        throw new Error(`Failed to create Reels container: ${data.error.message}`);
    }

    return data.id;
}

/**
 * Step 2: Publish the Container
 */
export async function publishReelsContainer(
    igUserId: string,
    accessToken: string,
    creationId: string
): Promise<string> {
    const url = new URL(`${FB_BASE_URL}/${igUserId}/media_publish`);
    url.searchParams.append('access_token', accessToken);
    url.searchParams.append('creation_id', creationId);

    const res = await fetch(url.toString(), { method: 'POST' });
    const data = await res.json();

    if (data.error) {
        throw new Error(`Failed to publish Reel: ${data.error.message}`);
    }

    return data.id; // Media ID of published reel
}

/**
 * Check status of the container (needed because upload is async)
 */
export async function getContainerStatus(
    containerId: string,
    accessToken: string
): Promise<PublishStatusResponse> {
    const url = new URL(`${FB_BASE_URL}/${containerId}`);
    url.searchParams.append('access_token', accessToken);
    url.searchParams.append('fields', 'status_code,status');

    const res = await fetch(url.toString());
    const data = await res.json();

    if (data.error) {
        throw new Error(`Failed to check status: ${data.error.message}`);
    }

    return data;
}
