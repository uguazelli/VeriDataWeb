---
name: veridata-design-system
description: Use when creating, editing, or reviewing any visual or written content for the Veridata Pro website, landing pages, marketing materials, blog posts, proposals, pitch decks, or client-facing documents. Enforces the design system — typography, color palette, layout patterns, section structures, copy voice, and anti-patterns — so everything Veridata Pro ships feels consistent, editorial, and trustworthy rather than generic SaaS startup. Trigger whenever the user mentions the Veridata Pro website, landing page, hero section, pricing section, marketing copy, visual design, HTML/CSS work on the site, or when the user asks for copy that will be read by prospective clients.
---

# Veridata Pro Design System

This skill encodes the visual and editorial identity of Veridata Pro. Apply it to any client-facing artifact — website pages, emails, proposals, social posts, slide decks.

## Core aesthetic direction

Veridata Pro is a **serious, editorial, professional-services** brand — closer to McKinsey or a private advisory firm than a startup SaaS. Buyers are CTOs and founders making multi-year decisions under stress. They want to feel reassured by competence, not excited by marketing flash.

The design is:

- **Restrained** — generous whitespace, minimal ornamentation, no gradients or glow effects
- **Editorial** — serif display type, italic emphasis for voice, magazine-like composition
- **Dark/Light rhythm** — deep ink sections alternating with cream/paper body sections
- **Honest** — no stock photos of people in headsets, no abstract cyber imagery, no fake badges

## Typography

```css
--serif: "Fraunces", Georgia, serif; /* Display: all h1, h2, h3 */
--sans: "Inter", -apple-system, sans-serif; /* Body, UI, small labels */
--mono: "JetBrains Mono", monospace; /* Eyebrows, metadata, tags */
```

**Rules:**

- Headings are always Fraunces, weight 300–400, never bold (500)
- Italic Fraunces is reserved for emphasis within headlines — never entire sentences, never in body
- Body is Inter, weight 400 default, 500 for emphasis only
- Mono is for eyebrow labels, dates, metadata, section labels — never for body text
- Never use Inter for display type. Never use Fraunces for body text.
- Font weights: 300, 400, 500 only. No 600, 700, 800, 900 — too heavy, looks corporate-bloated.

## Color palette

```css
:root {
	--ink: #0e1823; /* Deep ink blue — hero, footer, final CTA */
	--ink-2: #162433; /* Slightly lighter ink for footer */
	--ink-3: #1f3147; /* Button hover state */
	--cream: #f5f1ea; /* Primary cream — on-dark text */
	--cream-2: #ede6d9; /* Muted cream */
	--paper: #faf7f2; /* Body section background */
	--rule: #d8d0be; /* Border / divider in light sections */
	--rule-dark: rgba(245, 241, 234, 0.12); /* Borders in dark sections */
	--text: #1a1a1a; /* Primary body text on light */
	--text-muted: #555; /* Secondary text on light */
	--text-dim: #8b8378; /* Tertiary / mono labels */
	--accent: #2f5a3f; /* Primary accent — forest green */
	--accent-2: #4a7a5a; /* Brighter accent for dark-mode visibility */
	--warn: #b8541e; /* Warning / problem numbering */
}
```

**Usage rules:**

- Never introduce a new color without updating this file first
- The accent green (#2F5A3F) is sparingly used — eyebrows, small details, italic highlight text on dark sections. Never as a primary UI color.
- No purple, no cyan, no bright blues — this is the opposite of generic SaaS palette
- Dark sections use `--ink` as background, `--cream` as text. Light sections use `--paper` as background, `--text` as text.
- Never apply gradients. Never apply drop shadows on visible UI. Never use glow/blur effects except the small eyebrow-dot shadow.

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

- Hero uses `.container` with extra top padding (72–112px depending on content)
- Body sections use `.container` with 96px vertical padding (72px on mobile)
- Mobile breakpoint: 768px

## Section patterns

The site uses a small set of section types. Reuse them; don't invent new ones without reason.

1. **Hero** (dark) — eyebrow + big serif h1 with italic emphasis + lede + two CTAs + trust strip
2. **Problem grid** (paper) — section-label + title + sub + 2×2 card grid with numbered problems
3. **Timeline** (cream) — label + title + sub + two-column timeline (WHEN | WHAT) with tag metadata
4. **Services grid** (paper) — label + title + sub + 2×2 equal cards with title + description + outcome tag
5. **Fit section** (dark) — label + title + sub + two-column Right-fit / Wrong-fit list
6. **Credentials split** (paper) — label + two-column: copy with pull-quote | facts table
7. **Pricing featured + entry + footnote** (cream) — one big retainer card, one horizontal gap-assessment strip, one paragraph for projects
8. **FAQ** (paper) — narrow container, simple Q/A rhythm, serif questions
9. **Final CTA** (dark) — big italic headline + sub + single prominent button
10. **Footer** (dark-2) — brand + meta, no nav links (keep minimal)

## Copy voice

This is as important as the visual design. The voice is what differentiates Veridata Pro from generic vCISOs.

**DO:**

- Write like a senior operator talking to another senior operator
- Use italic emphasis for voice moments ("_deliberately_", "_Real timelines, honestly stated._")
- Use specific numbers: "90 days", "42 controls", "$6,000 fixed", "6–8 retainer clients"
- Name the buyer's real pain in their words ("Your US enterprise deal is stuck in security review")
- Acknowledge tradeoffs and constraints openly ("A proper readiness program is 6–12 months")
- Use short, declarative sentences. Periods over commas.

**DO NOT:**

- Promise timelines that defy physics (48 hours, 30-day SOC 2 Type II)
- Offer "audit-pass guarantees" or "free work until you pass" (creates adversarial clients)
- Use invented proprietary framework names (VeriGate, VeriFlow, etc.) without substance behind them
- Claim capabilities the solo practice doesn't have (24/7 monitoring, single-tenant infrastructure)
- Use testimonials unless they're real, attributed, and signed off by the client
- Use generic consulting filler: "architecting the future", "innovative solutions", "synergies"
- Write anything that would make the reader roll their eyes at a conference

**Tone benchmarks:**

- Right: "If a US deal is stuck in security review, the sooner we talk, the better."
- Wrong: "Leverage our proven methodology to accelerate your compliance journey."

- Right: "Most deals close with questionnaires scoring 70–85% on first pass."
- Wrong: "We guarantee world-class compliance outcomes."

## Anti-patterns — reject these if requested

Several visual/copy patterns are **off-limits** for Veridata Pro and should be refused or redirected if a user asks for them:

- Hero images of hooded hackers, padlocks, abstract cyber "matrix" visuals
- Big "Trusted by" logo bars with fake or unlicensed client logos
- Fake testimonials with "Senior Manager at SaaS Company" generic attribution
- "Free trial" language — this is not a SaaS product, it's an advisory engagement
- Urgency tactics: countdown timers, "only 2 spots left!", "price goes up Friday"
- Chatbot widgets on pages where a solo operator can't actually respond in real time
- Emoji as UI decoration
- Gradient text effects, glowing borders, particle backgrounds
- Purple/pink/cyan anywhere
- Bold claims with no evidence ("Industry-leading", "#1 in LatAm", "Award-winning")

If the user explicitly requests any of these, push back with a brief explanation of why it hurts their positioning, and offer the honest alternative.

## When generating new content

1. Start with which section type applies (from the list above)
2. Use the defined CSS variables only — no new colors
3. Match the font hierarchy (serif display, sans body, mono labels)
4. Write copy that passes the "would a senior CTO roll their eyes?" test
5. If creating something new that doesn't fit an existing pattern, first ask whether the pattern should be generalized and added to this skill

## Reference files

When working on the live site, the canonical implementation lives in the main `index.html`. Treat that file as the source of truth for spacing, component structure, and spacing decisions not captured here.
