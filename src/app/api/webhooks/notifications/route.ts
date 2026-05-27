import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Environment setup
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
const ADMIN_PHONE = process.env.ADMIN_PHONE || '';
const ARKESEL_API_KEY = process.env.ARKESEL_API_KEY || '';
const ARKESEL_SENDER_ID = process.env.ARKESEL_SENDER_ID || 'MatrixProp';

/**
 * Sends an SMS using the Arkesel v2 API
 */
async function sendArkeselSMS(recipient: string, message: string) {
    if (!ARKESEL_API_KEY || !recipient) return false;

    try {
        const response = await fetch('https://sms.arkesel.com/api/v2/sms/send', {
            method: 'POST',
            headers: {
                'api-key': ARKESEL_API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: ARKESEL_SENDER_ID,
                message: message,
                recipients: [recipient]
            })
        });

        const data = await response.json();
        console.log("Arkesel SMS Response:", data);
        return response.ok;
    } catch (error) {
        console.error("Arkesel SMS Error:", error);
        return false;
    }
}

export async function POST(req: Request) {
    try {
        // Parse the webhook payload from Supabase
        const body = await req.json();

        // Supabase sends the new row in the `record` object for INSERT events
        const appointment = body.record;

        if (!appointment) {
            return NextResponse.json({ error: 'No record found in webhook payload' }, { status: 400 });
        }

        const { name, email, phone, preferred_date, message, source } = appointment;

        // Determine if it was online or voice AI to format the notification nicely
        const isVoiceAI = message?.startsWith('[Voice AI]');
        const bookingSource = isVoiceAI ? "Voice AI Agent" : "Website Form";
        const dateString = preferred_date ? new Date(preferred_date).toLocaleString('en-GB') : 'Not specified';

        // ---------------------------------------------------------------------------
        // 1. ADMIN NOTIFICATIONS (To You)
        // ---------------------------------------------------------------------------

        // Admin Email
        if (ADMIN_EMAIL && process.env.RESEND_API_KEY) {
            try {
                await resend.emails.send({
                    from: 'Matrix Property Bookings <info@bookings.matrixmultitech.net>',
                    to: ADMIN_EMAIL,
                    subject: `🚨 New Appointment Request: ${name}`,
                    html: `
                        <h2>New Booking Received!</h2>
                        <p><strong>Source:</strong> ${bookingSource}</p>
                        <p><strong>Client Name:</strong> ${name}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
                        <p><strong>Preferred Date:</strong> ${dateString}</p>
                        <p><strong>Message/Notes:</strong> ${message || 'None'}</p>
                    `
                });
            } catch (err) {
                console.error("Admin Email Failed:", err);
            }
        }

        // Admin SMS via Arkesel
        if (ADMIN_PHONE) {
            try {
                const adminSmsText = `New Matrix Booking! ${name} requested an appointment for ${dateString}. Phone: ${phone}. Source: ${bookingSource}.`;
                await sendArkeselSMS(ADMIN_PHONE, adminSmsText);
            } catch (err) {
                console.error("Admin SMS Failed:", err);
            }
        }

        // ---------------------------------------------------------------------------
        // 2. CLIENT NOTIFICATIONS (To The Caller/User)
        // ---------------------------------------------------------------------------

        // Client Email (Only if they gave an email)
        if (email && process.env.RESEND_API_KEY) {
            try {
                await resend.emails.send({
                    from: 'Matrix Property Bookings <info@bookings.matrixmultitech.net>',
                    to: email,
                    subject: `Your Matrix Property Appointment is Confirmed`,
                    html: `
                        <h2>Thank you for booking with Matrix Property, ${name}!</h2>
                        <p>We have successfully received your appointment request for <strong>${dateString}</strong>.</p>
                        <p>One of our agents will contact you shortly to finalize the details.</p>
                        <br/>
                        <p>Best regards,</p>
                        <p><strong>The Matrix Multi-Tech Team</strong></p>
                    `
                });
            } catch (err) {
                console.error("Client Email Failed:", err);
            }
        }

        // Client SMS via Arkesel (Only if they gave a phone number)
        if (phone) {
            try {
                const clientSmsText = `Hi ${name}, your Matrix Property appointment request for ${dateString} is confirmed. We will contact you shortly!`;
                await sendArkeselSMS(phone, clientSmsText);
            } catch (err) {
                console.error("Client SMS Failed:", err);
            }
        }

        return NextResponse.json({ success: true, message: 'Notifications dispatched successfully.' });

    } catch (error: any) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
