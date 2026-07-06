---
name: veridata-design
description: >
  The Veri Data ("Sturdy & Clear") visual design system for veridatapro.com pages,
  LinkedIn/social cards, diagrams, mockups, and document visuals (Word/PDF/slides).
  Use this whenever creating, restyling, or reviewing ANY Veri Data branded visual or
  marketing asset — landing pages, hero sections, service/pricing cards, architecture
  and flow diagrams, before/after workflows, comparison tables, LinkedIn opinion/process/
  case cards, or branded document layouts. Trigger it even when the user just says
  "make a Veri Data graphic / post / page / one-pager" without naming the design system.
  Veri Data is a high-value INTEGRATION & AUTOMATION company (critical, can't-fail
  integrations — explicitly not Zapier/Make/n8n territory, and not Odoo-centric), so the
  look is editorial, serious, and restrained: teal + terracotta on cool paper, ink dark
  bands. Do NOT use generic SaaS styling for Veri Data.
---

# Veri Data design system — "Sturdy & Clear"

A restrained, editorial, technical professional-services look. Cool paper surfaces,
teal-navy ink, **teal** as the system color and **terracotta** as the single action color.
The feeling is *engineering you'd trust with the money* — not playful, not hype.

## Before anything else
1. **Read `references/messaging.md`.** The brand's whole point is positioning (high-value,
   can't-fail integration; *not* low-code, *not* Odoo-led). Copy that misses this looks
   off-brand even if the colors are right.
2. **Load the tokens.** Every visual starts from `assets/veridata.css`. Inline it in
   `<head>` (or `@import`) — do not reinvent colors. The token names below are stable.
3. **Pick the surface.** Light (`--paper`) is the default; the **dark ink hero/band** is the
   signature statement look. Don't put a busy gradient anywhere.

## The non-negotiables (what makes it *this* brand)
- **Two colors, two jobs.** Terracotta `#C45A35` = action (primary buttons only). Teal
  `#0E5C5C`/`#2A8C8C` = system: accents, links, status dots, the Veri Data layer in
  diagrams, the recommended pricing tier. Never swap these roles.
- **Ink for authority.** `#0A1F2C` dark bands carry hero statements, the header, and
  emphasis sections. Light teal/terracotta sit *on* paper, not on saturated fills.
- **The eyebrow.** Small uppercase label + a teal dot precedes most section titles. It's
  the system's signature tell. (`.eyebrow` in the CSS.)
- **Rules, not shadows.** Structure comes from thin `--rule` borders, dashed connectors,
  and faint dotted grids — not drop shadows or glows. Cards get one whisper-soft shadow.
- **Public Sans, weight 700 headlines.** One typeface, used with confident weight contrast
  (400 body, 600 labels/buttons, 700 display). No serif, no script, no rounded display fonts.
- **Square-ish geometry.** 8px buttons, 10px cards, 4px/2px tags. Tight, technical.
- **Plain, sharp copy.** See `references/messaging.md` for voice and headline patterns.

## Color & type quick reference
| Token | Value | Use |
|---|---|---|
| `--paper` | `#F8FAFA` | page background |
| `--surface` | `#FFFFFF` | cards / panels |
| `--surface-2` | `#F0F3F4` | subtle bands (credibility strip) |
| `--ink` | `#0A1F2C` | dark bands, header, headings on light |
| `--text` / `--text-muted` / `--text-dim` | `#1A2730` / `#4A5560` / `#7A8590` | body / secondary / labels |
| `--rule` / `--rule-strong` | `#E0E4E8` / `#C5CCD2` | borders |
| `--accent` / `--accent-live` | `#0E5C5C` / `#2A8C8C` | teal: accents, links, status |
| `--cta` / `--cta-strong` | `#C45A35` / `#A04826` | terracotta: primary CTA + hover |
| `--blue` | `#1A56B5` | focus rings, rare data accent |

Type: hero `4rem`/700, section `36px`/700, card title `20px`/700, body `15–17px`/400,
eyebrow & labels `12px`/600 uppercase `0.08em`, tag `11px`/600 uppercase.

## How to build a visual
1. Scaffold a single HTML file. Inline `assets/veridata.css` in `<head>`.
2. Load Public Sans. For browser preview: Google Fonts link below. **For Playwright/
   headless rendering of social cards, base64-embed the Public Sans woff2** (otherwise the
   headline weight falls back and the brand reads wrong). See "Rendering" below.
3. Compose from `references/components.md` — heroes, system/flow panels, card grids,
   pricing, comparison tables, architecture/blueprint diagrams, before→after, stat rows,
   CTA panels, and the four LinkedIn card frames. Don't invent new component languages;
   extend these.
4. Keep one terracotta action per view. Lead sections with an eyebrow.
5. Sanity check against the non-negotiables before delivering.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700&display=swap" rel="stylesheet">
```

## Rendering (social cards / diagrams)
- Canvas: 1200×1200 (square LinkedIn) or 1200×628 (link card). Render at 2× device scale.
- Embed Public Sans as base64 `@font-face` (400/600/700) so headless Chromium gets the
  right weights. If you don't have the font files, fetch Public Sans from Google Fonts and
  inline the woff2 — flag to the user if the network blocks it.
- Put the Veri Data wordmark/`logo.png` bottom-left on social frames when available.

## The four LinkedIn frames (the established rotation)
- **Dark statement card** — ink + dotted grid, big 700 claim, teal eyebrow → opinion posts.
- **Light flow diagram** — paper, one centered system/flow panel + caption → process posts.
- **Mock artifact panel** — ruled card showing a plausible log/alert/config, teal `OK` /
  terracotta `FAIL` rows → case posts.
- **Architecture stack** — blueprint diagram on light with a title bar → service posts.

See `references/components.md` §12 for markup.

## Documents (Word / PDF / slides)
The palette and restraint carry over: ink headings on paper, teal section rules and labels,
body `#1A2730`, terracotta used once if at all, Public Sans throughout, no SaaS gradients.
Use the **docx / pdf / pptx** skills for file mechanics; this skill governs look + message.
Read `references/messaging.md` §"Document visuals".

## Files
- `assets/veridata.css` — distilled, production-resolved tokens + base. Start here.
- `references/components.md` — copy-paste component patterns (TOC at top).
- `references/messaging.md` — positioning, voice, headline do/don't, color-meaning rules.

## Common mistakes to avoid
- Using terracotta as a decorative accent (it's *only* the action color).
- Leading with a tool ("We do Odoo / Zapier") — lead with can't-fail integration.
- Generic SaaS gradients, glows, or soft pastel cards.
- Forgetting the eyebrow + dot before section titles.
- Rendering social cards without embedding Public Sans (headlines lose their weight).