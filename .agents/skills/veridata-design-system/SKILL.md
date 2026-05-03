---
name: veridata-design-system
description: Use when creating, editing, or reviewing any visual or written content for the Veridata Pro website, landing pages, pricing pages, Odoo pages, integrations pages, marketing materials, blog posts, proposals, pitch decks, or client-facing documents. Enforces the current Veridata Pro positioning, information architecture, typography, color palette, light technical UI patterns, section structures, copy voice, and anti-patterns so everything feels consistent, editorial, and trustworthy rather than like a generic automation shop. Trigger whenever the user mentions the Veridata Pro website, landing page, hero section, pricing section, Odoo page, integrations page, marketing copy, visual design, HTML/CSS work on the site, or copy that prospective clients will read.
---

# Veridata Pro Design System

This skill encodes the visual and editorial identity of Veridata Pro. Apply it to any client-facing artifact — website pages, emails, proposals, social posts, slide decks.

## Core aesthetic direction

Veridata Pro is a **serious, editorial, technical professional-services** brand — closer to a private advisory firm with real engineering depth than a startup SaaS. Buyers are founders, operators, CTOs, and business decision makers who need to trust the person touching their systems. They want competence, clarity, and enough technical texture to believe the work is real.

The design is:

- **Light-forward** — most body sections stay paper/cream, with the homepage hero allowed to remain deep ink
- **Technically lit** — small green "system is on" accents, active dots, thin rules, and structured panels
- **Restrained** — generous whitespace, minimal ornamentation, no spectacle
- **Editorial** — serif display type, italic emphasis for voice, magazine-like composition
- **Operational** — diagrams, layer tables, and cards should feel like integration architecture, not generic marketing blocks
- **Honest** — no stock photos of people in headsets, no abstract cyber imagery, no fake badges

## Current positioning and IA

Veridata Pro helps companies connect Odoo and other business systems so teams stop copying data manually. The main buyer-facing service paths are:

- **Odoo** — customization, Odoo API integrations, data migration, ecommerce, CRM, finance workflows, WhatsApp/email/forms, AI document extraction, reporting, and Odoo partner support.
- **Integrations** — systems that do not talk to each other: CRMs, ERPs, databases, forms, ecommerce, finance tools, AI services, APIs, AWS, MuleSoft, Python/Java services, n8n, Zapier/Make audit or migration.

Navigation should stay focused:

- EN: Home, Odoo, Integrations, Pricing, Leadership, Book a Call
- PT-BR: Início, Odoo, Integrações, Preços, Liderança, Agendar Chamada
- ES-LATAM: Inicio, Odoo, Integraciones, Precios, Liderazgo, Agendar Llamada

Do not create top-level menu items for n8n, AWS, AI, MuleSoft, Python, Java, APIs, databases, Zapier, or Make. They are capabilities inside Odoo or Integrations, not separate service categories.

The homepage is a routing page, not a full service catalog. Keep it short: Hero, Start Here / Choose Your Problem, Main Problems, Services Summary, n8n vs AWS architecture choice, Pricing teaser, short credibility block, Final CTA.

## Typography

--serif: "Fraunces", Georgia, serif; /* Display: all h1, h2, h3 */
--sans: "Inter", -apple-system, sans-serif; /* Body, UI, small labels, eyebrows, tags */
--mono: "JetBrains Mono", ui-monospace, monospace; /* Technical labels, table metadata, chips */

**Rules:**

- Headings are always Fraunces, weight 400, never bold (500)
- Italic Fraunces is reserved for emphasis within headlines — never entire sentences, never in body
- Body is Inter, weight 400 default, 500 for emphasis only
- Labels, eyebrows, technical metadata, layer IDs, and chips may use JetBrains Mono when they reinforce the architecture/interface feel
- Never use Inter for display type. Never use Fraunces for body text.
- Font weights: 400, 500 only. No 300 (too light for some screens) or 600+ (too heavy).
- Hero type can be substantially larger than previous versions. Use responsive breakpoints, not viewport-scaled font formulas.

## Color palette

```css
:root {
	--ink: #0e1823; /* Deep ink blue — hero, footer, final CTA */
	--ink-2: #162433; /* Slightly lighter ink for footer */
	--ink-3: #1f3147; /* Button hover state */
	--cream: #f5f1ea; /* Primary cream — on-dark text */
	--cream-2: #ede6d9; /* Muted cream */
	--paper: #faf7f2; /* Body section background */
	--surface: #ffffff; /* Raised cards and technical panels */
	--surface-2: #fdfbf7; /* Soft card wash */
	--rule: #d8d0be; /* Border / divider in light sections */
	--rule-strong: #bfb49f; /* Stronger dividers for technical UI */
	--rule-dark: rgba(245, 241, 234, 0.12); /* Borders in dark sections */
	--grid-line: rgba(14, 24, 35, 0.055); /* Light technical grid lines */
	--text: #1a1a1a; /* Primary body text on light */
	--text-muted: #555; /* Secondary text on light */
	--text-dim: #8b8378; /* Tertiary / mono labels */
	--accent: #2f5a3f; /* Primary accent — forest green */
	--accent-live: #3f8a55; /* Lit green accent for dots, meters, and active states */
	--accent-2: #4a7a5a; /* Brighter accent for dark-mode visibility */
	--accent-soft: rgba(63, 138, 85, 0.10); /* Soft green background */
	--accent-line: rgba(63, 138, 85, 0.30); /* Green borders/rules */
	--accent-glow: rgba(63, 138, 85, 0.34); /* Small "light on" glow */
	--warn: #b8541e; /* Warning / problem numbering */
	--shadow-ambient: 0 24px 70px -48px rgba(14, 24, 35, 0.42);
}
```

**Usage rules:**

- Never introduce a new color without updating this file first
- The accent stays green. Do not adopt yellow/ember from references.
- Use green as a live-system signal: small glowing dots, meter fills, top rules, active card borders, and dark-hero button hover states.
- No purple, no cyan, no bright blues — this is the opposite of generic SaaS palette.
- Dark sections use `--ink` as background, `--cream` as text. Light sections use `--paper` or `--cream` as background, `--text` as text.
- Gradients are allowed only as subtle surface washes, thin light rules, or grid overlays. Never use gradient text, blobs, bokeh, or decorative orbs.
- Shadows are allowed for raised technical cards and panels, but keep them ambient and soft. No heavy floating SaaS cards.
- Glow is allowed only for small green "light on" accents, meter fills, and thin highlight rules.

## Layout

```css
.container {
	max-width: 1180px;
	padding: 0 32px;
} /* Main content width */
.container-narrow {
	max-width: 860px;
	padding: 0 32px;
} /* Long-form copy */
section {
	padding: 96px 0;
} /* Default vertical rhythm */
```

- Hero uses `.hero-section.bg-ink` with extra top padding, very large display type, and an optional technical system panel
- Body sections use `.container` with 96px vertical padding (72px on mobile)
- Mobile breakpoint: 768px

## Section patterns

The site uses a small set of section types. Reuse them; don't invent new ones without reason.

1. **Hero** (dark) — eyebrow + very large serif h1 + lede + supporting stack note + two CTAs + jump links + technical workflow panel
2. **Signal problem list** (paper) — section-label + title + row-based light panels using `L01`, `L02`, etc. in a left rail, a thin divider, and a small green "system on" dot at the right; use `.signal-list` with `.problem-card`
3. **Timeline** (cream) — label + title + sub + two-column timeline (WHEN | WHAT) with tag metadata
4. **Services grid** (paper/cream) — label + title + sub + equal `.tool-card` cards with title + description + outcome tag; cards use subtle technical grid background and small green status dot
5. **Operating layers / technical rows** (paper) — row cards with `L01` style mono IDs, short Inter titles, one concrete operational outcome, and optional small green meter bars
6. **Fit section** (dark or paper depending on surrounding rhythm) — label + title + sub + two-column Right-fit / Wrong-fit list
7. **Credentials split** (paper) — label + two-column: copy with pull-quote | `.stat-card` facts table; stat cards use subtle grid background and a green status dot
8. **Pricing featured + entry + footnote** (cream/paper) — cards stay light with subtle grid background; the featured card uses green border/light, not a dark block
9. **FAQ** (paper) — narrow container, simple Q/A rhythm, serif questions
10. **Final CTA** (paper preferred) — big italic headline + sub + single prominent button
11. **Footer** (paper or ink depending on page) — brand + meta, no fake trust links
12. **Legal list** (paper) — privacy/legal sections use `.legal-list` and `.legal-card` with `L01` style labels; avoid visible `1.`, `2.`, `3.` legal headings

## Technical UI Components

Use these to make the site feel more technical without becoming hostile to non-technical buyers:

- **Raised cards**: 8px radius, thin border, white/surface background, soft ambient shadow, subtle grid overlay when the card is pricing, service, stat, or technical UI
- **Hero system panel**: dark panel inside dark hero with dashed dividers, nodes, small meter bars, and green active states
- **Signal rows**: row-based cards with `L01` style mono IDs, a left label rail, short serif title, concise Inter description, and one small green status dot; do not use bare `01`, `02`, or `1.` numbering for visible card labels
- **Accent dots**: small green dots with restrained glow; never large blobs
- **Technical grid backgrounds**: use only subtle `--grid-line` overlays, normally 36px or 44px grid spacing; keep cards light and readable
- **Meters**: visual explanation only; avoid implying false measured results unless the metric is real

## Copy voice

This is as important as the visual design. The voice is what differentiates Veridata Pro from generic automation shops, cheap no-code freelancers, Odoo-only developers, AWS-only consultancies, and AI chatbot agencies.

**DO:**

- Write like a senior operator talking to another senior operator
- Use italic emphasis for voice moments ("_deliberately_", "_Real timelines, honestly stated._")
- Use specific numbers when real: "$300 audit", "$600 sprint", "$200/month", "15+ years", "66% cost reduction"
- Name the buyer's real pain in their words ("Your team is copying data between Odoo, spreadsheets, and the CRM")
- Acknowledge tradeoffs and constraints openly ("n8n is right for fast operational automation; AWS is better when reliability and retries matter")
- Use short, declarative sentences. Periods over commas.

**DO NOT:**

- Promise outcomes that depend on messy client systems ("fully automated in 48 hours", "zero manual work guaranteed")
- Offer fake guarantees or no-risk theatrics ("free work until it works", "automation guaranteed")
- Use invented proprietary framework names (VeriGate, VeriFlow, etc.) without substance behind them
- Claim capabilities the solo practice doesn't have (24/7 monitoring, single-tenant infrastructure)
- Use testimonials unless they're real, attributed, and signed off by the client
- Use generic consulting filler: "architecting the future", "innovative solutions", "synergies"
- Write anything that would make the reader roll their eyes at a conference

**Tone benchmarks:**

- Right: "If your team is moving data between Odoo, spreadsheets, and a CRM every week, the integration layer is missing."
- Wrong: "Leverage our innovative workflow platform to transform business productivity."

- Right: "Start with one workflow. If it becomes critical, move it into AWS-native architecture."
- Wrong: "We automate everything with AI agents and no-code workflows."

## Anti-patterns — reject these if requested

Several visual/copy patterns are **off-limits** for Veridata Pro and should be refused or redirected if a user asks for them:

- Hero images of stock operators, headsets, abstract AI brains, generic cloud diagrams, or disconnected SaaS icon piles
- Big "Trusted by" logo bars with fake or unlicensed client logos
- Fake testimonials with "Senior Manager at SaaS Company" generic attribution
- "Free trial" language — this is not a SaaS product, it's an advisory engagement
- Urgency tactics: countdown timers, "only 2 spots left!", "price goes up Friday"
- Chatbot widgets on pages where a solo operator can't actually respond in real time
- Emoji as UI decoration
- Gradient text effects, neon glowing borders, particle backgrounds, decorative blobs/orbs
- Purple/pink/cyan/yellow accents anywhere
- Full dark-theme pages aimed at non-technical buyers; a dark hero is okay, but the body should return to light surfaces
- Bold claims with no evidence ("Industry-leading", "#1 in LatAm", "Award-winning")
- Top-level service sprawl: separate menu items for n8n, AWS, AI, MuleSoft, APIs, Python, Java, databases, Zapier, or Make
- Copy that makes Veridata Pro sound like only an n8n freelancer, only an Odoo developer, only an AWS consultancy, or an AI chatbot agency

If the user explicitly requests any of these, push back with a brief explanation of why it hurts their positioning, and offer the honest alternative.

## When generating new content

1. Start with which section type applies (from the list above)
2. Use the defined CSS variables only — no new colors
3. Match the font hierarchy (serif display, sans body, mono technical labels)
4. Write copy that passes the "would a senior CTO roll their eyes?" test
5. If creating something new that doesn't fit an existing pattern, first ask whether the pattern should be generalized and added to this skill

## Reference files

When working on the live site, treat these files as source of truth for decisions not captured here:

- Homepage routing pattern: `en/index.html`, mirrored in `pt/index.html` and `es/index.html`
- Odoo page pattern: `en/odoo.html`, mirrored in `pt/odoo.html` and `es/odoo.html`
- Integrations depth page: `en/integrations.html`, mirrored in `pt/integrations.html` and `es/integrations.html`
- Pricing page/cards: `en/pricing.html`, mirrored in `pt/pricing.html` and `es/pricing.html`
- Shared visual rules: `assets/css/styles.css`
- Shared navigation/footer: `components/header.html`, `components/footer.html`, plus translations in `assets/js/main.js`
