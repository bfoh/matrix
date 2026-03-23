import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}));

        // --- Extract the toolCallId so Vapi can match the response ---
        let toolCallId = '';
        let args: any = {};

        // Vapi Custom Tool format: message.toolCallList[].arguments
        if (body?.message?.toolCallList?.[0]) {
            toolCallId = body.message.toolCallList[0].id || '';
            args = body.message.toolCallList[0].arguments || {};
        }
        // Vapi alternative: message.toolWithToolCallList[].toolCall.function.parameters
        else if (body?.message?.toolWithToolCallList?.[0]?.toolCall) {
            const tc = body.message.toolWithToolCallList[0].toolCall;
            toolCallId = tc.id || '';
            args = tc.function?.parameters || tc.function?.arguments || {};
        }
        // Fallback: direct body params (e.g. from a curl test)
        else {
            args = body;
        }

        // Parse args if stringified
        if (typeof args === 'string') {
            try { args = JSON.parse(args); } catch (e) { args = {}; }
        }

        const location = args.location;
        const bedrooms = args.bedrooms;

        let query = supabase
            .from('properties')
            .select('id, title, address, price, bedrooms, bathrooms, area_sqm')
            .order('created_at', { ascending: false });

        if (location) {
            query = query.or(`title.ilike.%${location}%,address.ilike.%${location}%`);
        }

        if (bedrooms) {
            query = query.gte('bedrooms', parseInt(bedrooms));
        }

        const { data, error } = await query;

        if (error) {
            console.error("Supabase Error:", error);
            // Return in Vapi's expected format even on error
            return NextResponse.json({
                results: [{ toolCallId, result: "Sorry, I was unable to fetch properties from the database right now." }]
            });
        }

        // Format the data as a readable string for the AI to speak
        let resultText = '';
        if (!data || data.length === 0) {
            resultText = 'No properties were found matching your criteria.';
        } else {
            resultText = `I found ${data.length} properties:\n` +
                data.map((p: any, i: number) =>
                    `${i + 1}. ${p.title} at ${p.address}. Price: ${p.price}. Bedrooms: ${p.bedrooms}, Bathrooms: ${p.bathrooms}.`
                ).join('\n');
        }

        // Return in Vapi's required response format
        return NextResponse.json({
            results: [{ toolCallId, result: resultText }]
        });

    } catch (err) {
        console.error("API Error:", err);
        return NextResponse.json({
            results: [{ toolCallId: '', result: "An error occurred while fetching properties." }]
        });
    }
}
