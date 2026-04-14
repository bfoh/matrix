# Branding Hub — Design Specification

## Context

Matrix MultiTech Ltd is a Telecom and Real Estate company based in Accra, Ghana. The CEO (Ernest Opoku) needs a centralized place in the admin portal to generate professional branding materials — business cards, letterheads, flyers, proposals, and more — without relying on external design tools. The branding hub will also include an AI writing assistant powered by Claude to help compose letters, marketing copy, and promotional content before printing.

## Company Details

| Field | Value |
|-------|-------|
| Company Name | Matrix MultiTech Ltd |
| CEO | Ernest Opoku |
| Title | CEO |
| Services Tagline | Telecom \| Real Estate |
| Phone | +233 26 767 1110 |
| Email | info@matrixmultitech.com |
| Website | matrixmultitech.net |
| Location | Matrix Headquarters, Accra, Ghana |
| GPS | GG-001-1387 |
| Logo | `/images/matrix-logo.png` (solid bg), `/matrix-logo-transparent.png` (transparent bg) |
| Brand Colors | Black (#000000), Yellow (#D9DE00), Red (from logo) |
| Fonts | Montserrat (headings), Raleway (body) |

## Technical Approach

**Client-side rendering** using existing patterns from the codebase:

- **PNG generation:** `html2canvas` (already installed) — same pattern as `PropertyCardGenerator.tsx`
- **PDF generation:** `jsPDF` (new dependency) — captures html2canvas output at high DPI, embeds in print-ready PDF
- **AI writing:** `@anthropic-ai/sdk` (new dependency) — Claude API called via Next.js API route
- **All templates use inline styles** (not Tailwind classes) for html2canvas fidelity, matching the existing PropertyCardGenerator pattern

## Page Structure

**Route:** `/admin/branding-hub`
**Nav item:** "BRANDING HUB" with `Palette` icon from Lucide, added to admin sidebar in `layout.tsx`

### Layout

Premium hero header with company branding stats, followed by a tabbed interface:

| Tab | Materials | Count |
|-----|-----------|-------|
| **Stationery** | Business Card, Letterhead, Envelope, Compliment Slip | 4 |
| **Digital** | Email Signature, Social Media Kit, Watermark Generator | 3 |
| **Marketing** | ID Badge, Invoice Template, Presentation Cover, Property Listing Flyer, Signage/Banner, Branded Proposal | 6 |

Each tab shows a card grid. Clicking a card opens a full editor view with live preview and download options.

## Materials Specification

### Stationery Tab

#### 1. Business Card
- **Dimensions:** 1050 x 600px (3.5" x 2" at 300 DPI)
- **Layout:** Left 40% — Matrix logo centered, "MATRIX MULTITECH LTD" below, **"Telecom | Real Estate"** tagline underneath. Right 60% — separated by yellow (#D9DE00) vertical divider, name (Ernest Opoku), title (CEO), phone, email, website stacked. QR code bottom-right linking to matrixmultitech.net
- **Customizable fields:** Name, Title, Phone, Email
- **Downloads:** PNG + print-ready PDF (landscape, 3.5" x 2")

#### 2. Letterhead
- **Dimensions:** 2480 x 3508px (A4 at 300 DPI), rendered at 620 x 877px, captured at scale 4
- **Layout:** Header — logo left, "MATRIX MULTITECH LTD" right, yellow horizontal rule. Body — faint watermark of transparent logo at 8% opacity. Footer — yellow rule, single line with address, phone, email, website, GPS
- **Customizable:** Watermark on/off toggle
- **AI-enabled:** Yes — write letter content
- **Downloads:** PDF

#### 3. Envelope
- **Dimensions:** Standard DL envelope (2598 x 1299px at 300 DPI)
- **Layout:** Top-left — logo + company name + return address. Bottom accent bar in yellow. Stamp placeholder top-right
- **Downloads:** PDF

#### 4. Compliment Slip
- **Dimensions:** DL size (2598 x 1000px)
- **Layout:** Header — logo left, company name right, yellow rule. Center — "With Compliments" in italic. Footer — contact details
- **AI-enabled:** Yes — personalized messages
- **Downloads:** PDF

### Digital Tab

#### 5. Email Signature
- **Dimensions:** 600 x 200px
- **Layout:** Left — logo with yellow left border accent. Right — name, title, yellow rule, contact details in a row
- **Output:** Copy HTML button (table-based, inline-styled, email-client compatible) + Download PNG
- **Customizable fields:** Name, Title, Phone, Email

#### 6. Social Media Kit
- **Sub-materials:**
  - Profile Picture: 400 x 400px — logo centered on black bg with yellow accent ring
  - Facebook Cover: 820 x 312px — company branding with tagline
  - Twitter/X Header: 1500 x 500px — company branding, wider format
  - Instagram Story: 1080 x 1920px — branded story template with logo + tagline
- **Downloads:** PNG (each individually)

#### 7. Watermark Generator
- **Flow:** Upload photo → overlay semi-transparent Matrix logo + "MATRIX MULTITECH" text → preview → download
- **Controls:** Watermark opacity slider, position (center/corner), size
- **Downloads:** PNG

### Marketing Tab

#### 8. ID Badge
- **Dimensions:** 638 x 1013px (standard CR80 portrait)
- **Layout:** Top — yellow accent bar + logo. Center — employee photo (upload). Below — name, title, department. Bottom — company name + QR code
- **Customizable fields:** Photo upload, Name, Title, Department
- **Downloads:** PNG + PDF

#### 9. Invoice Template
- **Dimensions:** A4
- **Layout:** Header — logo + company info + "INVOICE". Body — bill to, invoice number, date, line items table, subtotal/tax/total. Footer — payment terms, bank details, thank-you note
- **AI-enabled:** Yes — payment terms text, thank-you notes
- **Customizable fields:** All invoice fields (client, items, amounts, notes)
- **Downloads:** PDF

#### 10. Presentation Cover
- **Dimensions:** 1920 x 1080px (16:9)
- **Layout:** Dark background with large Matrix logo, presentation title, subtitle, date, presenter name. Yellow accent elements
- **Customizable fields:** Title, Subtitle, Presenter, Date
- **Downloads:** PNG

#### 11. Property Listing Flyer
- **Dimensions:** 1080 x 1350px (portrait)
- **Data source:** Supabase `properties` table — user selects a property from dropdown
- **Layout:** Top 60% — hero property image with gradient overlay, status badge, logo. Middle 30% — price, title, address, stats (beds/baths/area). Bottom 10% — yellow contact bar with QR code
- **AI-enabled:** Yes — catchy headlines, property descriptions, promotional taglines
- **Customizable fields:** Headline override, custom tagline
- **Downloads:** PNG + PDF

#### 12. Signage/Banner
- **Dimensions:** 1200 x 800px
- **Variants:** FOR SALE, FOR RENT, SOLD, COMING SOON
- **Layout:** Large status text, Matrix logo + company name, phone number, website. Bold yellow and black design
- **Customizable fields:** Status, Phone, Custom text
- **Downloads:** PNG

#### 13. Branded Proposal
- **Dimensions:** A4 multi-page
- **Layout:** Cover page (logo, proposal title, client name, date) + content sections
- **AI-enabled:** Yes — full proposal generation with executive summary, scope, deliverables, pricing, timeline
- **Customizable fields:** Client name, project title, all section content
- **Downloads:** PDF (multi-page)

## AI Writing Assistant

### Integration
- Built into each AI-enabled material editor as a right-side panel
- Context-aware — adapts prompts and suggestions based on the active material type
- Conversational chat interface with quick-action buttons

### Capabilities
| Material | AI Can Write |
|----------|-------------|
| Letterhead | Formal letters, proposals, notices, acknowledgements, partnership letters |
| Compliment Slip | Short personalized thank-you notes, congratulations, appreciation messages |
| Property Flyer | Catchy headlines, property descriptions, CTAs, promotional copy |
| Invoice | Payment terms, thank-you messages, late payment notices |
| Branded Proposal | Executive summary, scope of work, deliverables, pricing sections, timeline |

### Quick Actions
- **Write Letter** — generate full letter from a brief description
- **Marketing Copy** — catchy promotional content
- **Proposal** — structured proposal sections
- **Refine Text** — improve existing text
- **Change Tone** — switch between Formal, Persuasive, Friendly, Urgent
- **Make Shorter** — condense text while keeping key points

### Technical Implementation
- **API route:** `/api/ai/generate` — accepts `{ prompt, materialType, tone, action }`, returns generated text
- **Provider:** Claude API via `@anthropic-ai/sdk`
- **System prompt:** Pre-configured with Matrix MultiTech company context, real estate industry knowledge, Ghanaian business culture, and marketing best practices
- **Streaming:** Response streamed to the UI for real-time text generation feel
- **"Apply to Editor" button:** One-click to inject AI-generated content into the material's text fields

### System Prompt Context (embedded in API route)
The AI will be instructed that it is a branding and marketing expert for Matrix MultiTech Ltd, a Telecom and Real Estate company in Accra, Ghana. It knows the CEO is Ernest Opoku, the company's services, contact details, and brand voice (professional, premium, trustworthy). It tailors content for the Ghanaian real estate and telecom market.

## Component Architecture

### File Structure
```
src/app/admin/branding-hub/
  page.tsx                              # Main page with hero header + tabs
  components/
    BrandingTabs.tsx                    # Tab switcher component
    MaterialCard.tsx                    # Grid card (thumbnail + name + badges)
    MaterialEditorModal.tsx            # Editor wrapper (preview + form + AI panel)
    AiWritingAssistant.tsx             # AI chat panel component
    BrandElements.tsx                  # Shared logo header/footer sub-components
    useCanvasDownload.ts               # Hook: html2canvas PNG download
    usePdfDownload.ts                  # Hook: jsPDF PDF download
    useAiWriter.ts                     # Hook: AI generation with streaming
    brandConstants.ts                  # Company data, colors, dimensions

    stationery/
      BusinessCard.tsx + BusinessCardTemplate.tsx
      Letterhead.tsx + LetterheadTemplate.tsx
      Envelope.tsx + EnvelopeTemplate.tsx
      ComplimentSlip.tsx + ComplimentSlipTemplate.tsx

    digital/
      EmailSignature.tsx + EmailSignatureTemplate.tsx
      SocialMediaKit.tsx + SocialMediaTemplates.tsx
      WatermarkGenerator.tsx

    marketing/
      IdBadge.tsx + IdBadgeTemplate.tsx
      InvoiceTemplate.tsx + InvoiceTemplateRender.tsx
      PresentationCover.tsx + PresentationCoverTemplate.tsx
      PropertyFlyer.tsx + PropertyFlyerTemplate.tsx
      SignageBanner.tsx + SignageBannerTemplate.tsx
      BrandedProposal.tsx + BrandedProposalTemplate.tsx

src/app/api/ai/
  generate/route.ts                    # Claude API endpoint for AI writing
```

### Component Pattern (per material)
1. **Editor component** (e.g., `BusinessCard.tsx`) — manages form state, renders template + AI panel, provides download buttons
2. **Template component** (e.g., `BusinessCardTemplate.tsx`) — pure presentational, inline styles only, exposes ref for html2canvas capture
3. Editors for AI-enabled materials include `<AiWritingAssistant>` as a right-side panel

### Shared Hooks
- `useCanvasDownload(ref, filename, scale)` — extracted from PropertyCardGenerator pattern (lines 95-117), returns `{ downloadPng, isGenerating }`
- `usePdfDownload(ref, filename, dimensions, scale)` — captures via html2canvas then embeds in jsPDF page
- `useAiWriter(materialType)` — manages chat state, calls `/api/ai/generate`, handles streaming, returns `{ messages, generate, isLoading }`

## Files to Modify

- `src/app/admin/layout.tsx` — add "BRANDING HUB" nav item with `Palette` icon between SHARE CARDS and SETTINGS
- `package.json` — add `jspdf` and `@anthropic-ai/sdk` dependencies

## Reference Files (patterns to follow)
- `src/components/PropertyCardGenerator.tsx` — html2canvas capture pattern, inline-style templates, download flow
- `src/app/admin/share-cards/page.tsx` — Supabase property fetching, property selector UI
- `src/app/admin/layout.tsx` — nav item pattern, active state styling
- `src/lib/utils.ts` — `cn()` utility for editor UI components
- `src/lib/supabase.ts` — Supabase client creation

## New Dependencies
| Package | Purpose | Size |
|---------|---------|------|
| `jspdf` | Print-ready PDF generation | ~300KB |
| `@anthropic-ai/sdk` | Claude AI API for writing assistant | ~50KB |

## Environment Variables (new)
```
ANTHROPIC_API_KEY=        # Claude API key for the AI writing assistant
```

## Verification Plan

1. **Navigation:** Click "BRANDING HUB" in admin sidebar → page loads with hero header and tabs
2. **Tab switching:** Click each tab → correct materials grid shown
3. **Material editor:** Click any material card → editor opens with live preview
4. **Business card:** Customize name/title → preview updates live → download PNG → download PDF → verify print dimensions (3.5" x 2")
5. **Letterhead + AI:** Open letterhead editor → ask AI to write a partnership letter → click "Apply to Letter" → content appears in preview → download PDF → verify A4 dimensions
6. **Property flyer:** Select a property from dropdown → flyer auto-populates → ask AI for a catchy headline → download PNG
7. **Email signature:** Edit fields → copy HTML → paste in email client → verify rendering
8. **All downloads:** Verify PNG files are high-res and PDF files are print-ready at correct dimensions
9. **AI assistant:** Test all quick actions (Write Letter, Marketing Copy, Refine Text, Change Tone, Make Shorter) across all AI-enabled materials
10. **Mobile:** Verify responsive layout — editor stacks vertically on small screens
