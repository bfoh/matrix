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

        // Vapi Custom Tool format: message.toolCallList[0]
        if (body?.message?.toolCallList?.[0]) {
            const tc = body.message.toolCallList[0];
            toolCallId = tc.id || '';
            // Arguments can be nested inside `function.arguments` or directly on the tool call
            args = tc.function?.arguments || tc.function?.parameters || tc.arguments || tc.parameters || {};
        }
        // Vapi alternative: message.toolWithToolCallList[0].toolCall
        else if (body?.message?.toolWithToolCallList?.[0]?.toolCall) {
            const tc = body.message.toolWithToolCallList[0].toolCall;
            toolCallId = tc.id || '';
            args = tc.function?.arguments || tc.function?.parameters || tc.arguments || tc.parameters || {};
        }
        // Fallback: direct body params (e.g. from a curl test)
        else {
            args = body;
        }

        // Parse args if stringified
        if (typeof args === 'string') {
            try { args = JSON.parse(args); } catch (e) { args = {}; }
        }

        // --- Extract caller info from multiple possible locations ---
        // 1. From the tool call arguments (if AI collected them)
        let name = args.name || args.client_name || args.customer_name || args.caller_name || args.full_name;
        let phone = args.phone || args.phone_number || args.contact || args.mobile || args.telephone;
        let email = args.email || args.email_address || '';

        // 2. From the Vapi call/customer metadata (always present in the payload)
        if (!name && body?.message?.call?.customer?.name) {
            name = body.message.call.customer.name;
        }
        if (!phone && body?.message?.call?.customer?.number) {
            phone = body.message.call.customer.number;
        }

        // 3. Try to extract from conversation transcript if still missing
        if (!name || !phone || !email) {
            const messages = body?.message?.artifact?.messages || [];
            const transcript = messages
                .filter((m: any) => m.role === 'user' || m.role === 'assistant')
                .map((m: any) => m.content || '')
                .join(' ');

            // Try to extract a phone number from the transcript
            if (!phone) {
                const phoneMatch = transcript.match(/(\+?\d[\d\s\-()]{7,}\d)/);
                if (phoneMatch) phone = phoneMatch[1].trim();
            }

            // Try to extract an email from the transcript
            if (!email) {
                const emailMatch = transcript.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
                if (emailMatch) email = emailMatch[1].trim();
            }
        }

        // Final fallbacks
        name = name || 'Voice AI Caller';
        phone = phone || 'Not provided';

        const date = args.date || args.preferred_date || args.appointment_date;
        const time = args.time || args.preferred_time || args.appointment_time;
        const notes = args.notes || args.reason || args.message;

        // Build a preferred_date ISO string from the date and time the AI collected
        let preferredDate: string | null = null;
        if (date) {
            try {
                // If time has AM/PM, it parses better if we just pass the string.
                // Enforce CET (+01:00) parsing so it correctly translates to the DB's UTC storage
                const dateString = time ? `${date} ${time} +0100` : `${date} +0100`;
                const parsedDate = new Date(dateString);

                // --- Fix AI hallucinating past years (e.g., 2024 instead of current year) ---
                if (!isNaN(parsedDate.getTime())) {
                    const currentYear = new Date().getFullYear();

                    if (parsedDate.getFullYear() < currentYear) {
                        parsedDate.setFullYear(currentYear);

                        // If moving to the current year puts the appointment in the past by more than a day,
                        // it means they are booking for a month that already passed this year, so it must be for next year.
                        const yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);

                        if (parsedDate < yesterday) {
                            parsedDate.setFullYear(currentYear + 1);
                        }
                    }
                    preferredDate = parsedDate.toISOString();
                } else {
                    preferredDate = new Date().toISOString();
                }
            } catch {
                preferredDate = new Date().toISOString();
            }
        } else {
            preferredDate = new Date().toISOString();
        }

        // Prefix the message so it's clear it came from the voice agent
        const message = `[Voice AI] ${notes || 'Booked via Voice AI Assistant'}`;

        const { data, error } = await supabase
            .from('appointments')
            .insert([
                {
                    name,
                    email,
                    phone,
                    preferred_date: preferredDate,
                    message,
                    status: 'pending'
                }
            ])
            .select();

        if (error) {
            console.error("Supabase Appointment Insert Error:", error);
            return NextResponse.json({
                results: [{ toolCallId, result: "Sorry, I was unable to save the appointment. Please try again." }]
            });
        }

        return NextResponse.json({
            results: [{ toolCallId, result: `Appointment successfully booked for ${name} on ${date || 'today'} at ${time || 'a convenient time'}. Phone: ${phone}.` }]
        });

    } catch (err) {
        console.error("API Error:", err);
        return NextResponse.json({
            results: [{ toolCallId: '', result: "An error occurred while booking the appointment." }]
        });
    }
}
