import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `You are a professional branding and marketing expert for Matrix MultiTech Ltd, a Telcom and Real Estate company based in Accra, Ghana.

Company Details:
- Company Name: Matrix MultiTech Ltd
- CEO: Ernest Opoku
- Services: Telecom and Real Estate
- Tagline: "Telcom | Real Estate"
- Phone: +233 26 767 1110
- Email: info@matrixmultitech.com
- Website: matrixmultitech.net
- Location: Matrix Headquarters, Accra, Ghana
- GPS: GG-001-1387

Your role is to help write professional, compelling content for the company's branding materials. You understand:
- Ghanaian business culture and professional correspondence norms
- Real estate marketing (property descriptions, investment pitches, partnership proposals)
- Telecom industry terminology and value propositions
- Formal letter writing (business letters, proposals, notices, acknowledgements)
- Marketing copywriting (headlines, CTAs, promotional flyers, catchy taglines)
- Professional document tone (invoices, proposals, compliment slips)

Guidelines:
- Write in a professional, premium tone that reflects the company's luxury brand positioning
- Use British English spelling conventions (common in Ghana)
- Be concise but impactful
- When writing letters, use proper formal letter structure
- When writing marketing copy, focus on lead generation and conversion
- When writing proposals, be thorough yet persuasive
- Always maintain brand consistency

Respond ONLY with the requested content. Do not include explanations or meta-commentary unless asked.`;

const MATERIAL_CONTEXTS: Record<string, string> = {
    letterhead: "You are writing content for a formal letterhead. Generate professional letter content that will be printed on branded A4 letterhead paper with the company logo and contact details already in the header/footer.",
    "compliment-slip": "You are writing a short message for a compliment slip. Keep it brief (1-3 sentences), warm yet professional. The slip already has the company branding.",
    "property-flyer": "You are writing marketing copy for a property listing flyer. Create catchy headlines, compelling property descriptions, and strong calls-to-action that will attract potential buyers/renters.",
    invoice: "You are writing notes for an invoice document. This could be payment terms, thank-you messages, or late payment notices. Keep it professional and clear.",
    "branded-proposal": "You are writing content for a branded business proposal. Create compelling executive summaries, scope descriptions, deliverables, pricing justifications, and timelines that will win clients.",
};

const TONE_INSTRUCTIONS: Record<string, string> = {
    formal: "Use a formal, professional tone appropriate for official business correspondence.",
    persuasive: "Use a persuasive, compelling tone that emphasises benefits and creates urgency.",
    friendly: "Use a warm, approachable yet professional tone that builds rapport.",
    urgent: "Use a direct, urgent tone that conveys time-sensitivity and importance.",
};

export async function POST(request: NextRequest) {
    try {
        const { prompt, materialType, tone = "formal", action = "generate" } = await request.json();

        if (!prompt) {
            return Response.json({ error: "Prompt is required" }, { status: 400 });
        }

        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
            return Response.json(
                { error: "AI service not configured. Please add ANTHROPIC_API_KEY to environment variables." },
                { status: 500 }
            );
        }

        const client = new Anthropic({ apiKey });

        let userPrompt = prompt;

        if (action === "refine") {
            userPrompt = `Please refine and improve the following text, making it more polished and professional while keeping the same meaning:\n\n${prompt}`;
        } else if (action === "shorten") {
            userPrompt = `Please condense the following text to be shorter and more concise while keeping all key points:\n\n${prompt}`;
        } else if (action === "change-tone") {
            userPrompt = `Please rewrite the following text with a ${tone} tone:\n\n${prompt}`;
        }

        const materialContext = MATERIAL_CONTEXTS[materialType] || "";
        const toneInstruction = TONE_INSTRUCTIONS[tone] || TONE_INSTRUCTIONS.formal;
        const systemContent = `${SYSTEM_PROMPT}\n\n${materialContext}\n\n${toneInstruction}`;

        const message = await client.messages.create({
            model: "claude-sonnet-4-20250514",
            max_tokens: 2048,
            system: systemContent,
            messages: [{ role: "user", content: userPrompt }],
        });

        const text = message.content
            .filter((block): block is Anthropic.TextBlock => block.type === "text")
            .map((block) => block.text)
            .join("");

        return Response.json({ text });
    } catch (error: unknown) {
        console.error("AI generation error:", error);
        const message = error instanceof Error ? error.message : "Failed to generate content";
        return Response.json({ error: message }, { status: 500 });
    }
}
