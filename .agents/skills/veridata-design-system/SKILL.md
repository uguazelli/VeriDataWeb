---
name: veridata-design-system
description: Use when creating, editing, or reviewing any visual or written content for the Veridata Pro website, landing pages, marketing materials, blog posts, proposals, pitch decks, or client-facing documents. Enforces the design system — typography, color palette, layout patterns, section structures, copy voice, and anti-patterns — so everything Veridata Pro ships feels consistent, editorial, and trustworthy rather than generic SaaS startup. Trigger whenever the user mentions the Veridata Pro website, landing page, hero section, pricing section, marketing copy, visual design, HTML/CSS work on the site, or when the user asks for copy that will be read by prospective clients.
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
2. **Problem grid** (paper) — section-label + title + sub + 2×2 card grid with numbered problems
3. **Timeline** (cream) — label + title + sub + two-column timeline (WHEN | WHAT) with tag metadata
4. **Services grid** (paper) — label + title + sub + 2×2 equal cards with title + description + outcome tag
5. **Operating layers table** (paper) — four row cards (L01–L04) with Inter titles, mono metadata, and small green meter bars
6. **Fit section** (dark or paper depending on surrounding rhythm) — label + title + sub + two-column Right-fit / Wrong-fit list
7. **Credentials split** (paper) — label + two-column: copy with pull-quote | facts table
8. **Pricing featured + entry + footnote** (cream/paper) — cards should remain light; the featured card uses green border/light, not a dark block
9. **FAQ** (paper) — narrow container, simple Q/A rhythm, serif questions
10. **Final CTA** (paper preferred) — big italic headline + sub + single prominent button
11. **Footer** (paper or ink depending on page) — brand + meta, no fake trust links

## Technical UI Components

Use these to make the site feel more technical without becoming hostile to non-technical buyers:

- **Raised cards**: 8px radius, thin border, white/surface background, soft ambient shadow, optional subtle grid overlay
- **Hero system panel**: dark panel inside dark hero with dashed dividers, nodes, small meter bars, and green active states
- **Layer rows**: row-based cards with `L01` style mono IDs, short Inter titles, one concrete operational outcome, and two meter bars
- **Accent dots**: small green dots with restrained glow; never large blobs
- **Meters**: visual explanation only; avoid implying false measured results unless the metric is real

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
- Gradient text effects, neon glowing borders, particle backgrounds, decorative blobs/orbs
- Purple/pink/cyan/yellow accents anywhere
- Full dark-theme pages aimed at non-technical buyers; a dark hero is okay, but the body should return to light surfaces
- Bold claims with no evidence ("Industry-leading", "#1 in LatAm", "Award-winning")

If the user explicitly requests any of these, push back with a brief explanation of why it hurts their positioning, and offer the honest alternative.

## When generating new content

1. Start with which section type applies (from the list above)
2. Use the defined CSS variables only — no new colors
3. Match the font hierarchy (serif display, sans body, mono technical labels)
4. Write copy that passes the "would a senior CTO roll their eyes?" test
5. If creating something new that doesn't fit an existing pattern, first ask whether the pattern should be generalized and added to this skill

## Reference files

When working on the live site, the canonical homepage implementation lives in `en/index.html`, with translated mirrors in `pt/index.html` and `es/index.html`. Shared visual rules live in `assets/css/styles.css`. Treat those files as the source of truth for spacing, component structure, and decisions not captured here.
