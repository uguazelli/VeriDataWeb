# Veridata Pro — Services, Pricing & Strategy

---

## Positioning Statement

> We take complex architecture problems entirely off our clients' hands. We're not an agency. We're not a software house. We're a **fractional architecture team** for companies that can't afford to fail — but can't afford enterprise rates either.

**Primary market:** B2B companies in LatAm expanding into US/EU markets, or US/EU companies with LatAm operations.
**Sweet spot client:** 20–100 employees, $1M–$20M ARR, technically understaffed, growing fast.

---

## The Three Pillars

| Pillar | Problem It Solves | Revenue Model | Avg Deal Size |
|--------|------------------|---------------|---------------|
| **The Shield** (Cybersecurity) | Failing security audits, blocking enterprise deals | Monthly retainer | $270–$2,100/mo |
| **The Engine** (Integrations) | Manual data entry, disconnected systems | One-time project + optional retainer | $400–$3,000+ |
| **Veri Rev Ops** | Sales chaos on WhatsApp, no CRM discipline | Setup fee + monthly | $497 setup + $349–$997/mo |

---

## Pillar 1 — The Shield (Cybersecurity)

### The Core Problem We Solve

Enterprise clients (especially in the US) require vendors to pass security questionnaires before signing contracts. Most LatAm SMBs fail these. We make them pass — fast.

**The emotional trigger:** "I'm losing a $200K contract because I can't answer their security questionnaire."
**Our answer:** The Shield. Connect & Protect plan. 6 weeks. Done.

### Methodology

**Strangler Fig** — We wrap the existing infrastructure with a modern security layer using APISIX (API gateway) + Zitadel (identity/SSO). Zero code changes to the client's existing systems. This is the key selling point for risk-averse technical teams.

### Pricing

| Plan | Base | Per User | Example | Best For |
|------|------|----------|---------|----------|
| **Protect** | $150/mo | +$12/user | 10 users → $270/mo | Small teams, cyber insurance compliance |
| **Connect & Protect** ⭐ | $300/mo | +$20/user | 20 users → $700/mo | B2B selling to enterprise, needs questionnaire support |
| **Transform** | $600/mo | +$30/user | 50 users → $2,100/mo | Fintech/healthtech, SOC 2 / ISO 27001 |

> All plans have a **setup fee** (scope-based, assessed on onboarding call). Don't undercharge this — it covers architecture design, tooling deployment, and initial hardening.

### What's Included by Tier

**Protect:**
- Managed MFA (email & cloud)
- AI Endpoint Detection & Response (24/7)
- Anti-Ransomware Backups
- Vulnerability Monitoring

**Connect & Protect (adds):**
- SSO for legacy apps (no code changes)
- Identity architecture design
- Attack surface management
- Vendor questionnaire support
- vCISO Lite Assessments

**Transform (adds):**
- Full Zero-Trust architecture
- SOC 2 / ISO 27001 preparation
- MDR with human analysts 24/7
- Formal audit representation

### Upsell Path

```
Protect → Connect & Protect (when first enterprise deal comes in)
Connect & Protect → Transform (when they go for SOC 2 / ISO 27001)
Any tier → The Engine (once they're secure, they want to integrate)
```

### Key Objection Handling

| Objection | Response |
|-----------|----------|
| "We already have antivirus" | We don't do antivirus. We build the architecture that makes you pass enterprise procurement. |
| "We don't have time for this" | We work fully remote, async. You approve, we deploy. |
| "Our dev team can handle security" | Your dev team shouldn't be doing security architecture. That's what you're paying enterprise salaries to avoid. |

---

## Pillar 2 — The Engine (Integrations)

### The Core Problem We Solve

Companies with 3–10 disconnected systems bleeding 10–20 hours/week on manual data entry. Usually triggered by a new hire who asks "why are we doing this manually?"

**The emotional trigger:** "My ops team spends 3 hours a day copy-pasting between systems."
**Our answer:** We connect everything. No more copy-paste.

### Two Paths — Critical Positioning

**Enterprise Path (MuleSoft):**
- For clients already paying for MuleSoft licenses — they need an architect, not a vendor.
- Pitch: "You have the tool. You're not using it right. We fix that."
- Higher hourly rate justified by certification depth.

**Agile Path (n8n / APISIX):**
- For SMBs who can't justify MuleSoft costs.
- Pitch: "Same outcome as enterprise, 80% less cost."
- Fast deployment, visible ROI in weeks.

### Pricing

| Package | Price | Optional Retainer | Best For |
|---------|-------|-------------------|----------|
| **Legacy Connection** | $400–$1,000 one-time | +$75/mo | First integration, simple ERP connect |
| **API Gateway** ⭐ | $1,000–$2,250 one-time | +$150/mo managed | Central API layer, rate limiting, security |
| **Event-Based Architecture** | $3,000+ one-time | Custom | Full migration, event-driven, RabbitMQ |

### What's Included by Package

**Legacy Connection:**
- Integration design document
- Working connection in production
- Error handling & monitoring

**API Gateway (adds):**
- Full API architecture design
- Gateway configured and live
- Security policies + rate limiting
- Monitoring dashboard

**Event-Based Architecture (adds):**
- Event architecture design
- Full migration plan
- Implementation + testing
- Knowledge transfer to client team

### Core Service Lines

- **API Development** — REST/GraphQL APIs for external partner connectivity
- **Data Migration** — ETL, On-Prem → Cloud, zero data loss
- **Process Automation** — billing, logistics tracking, HR onboarding

### Tech Stack

| Tool | Use Case |
|------|----------|
| MuleSoft | Enterprise APIs, strict SLAs, legacy ERP |
| APISIX | High Availability gateway, traffic control |
| n8n | SMB automation, Quote-to-Cash pipelines |
| RabbitMQ | Event-driven decoupling |
| AWS / Azure / On-Prem | Deployment flexibility |

### Upsell Path

```
Legacy Connection → API Gateway (when they want more control)
API Gateway → Event-Based (when they're ready to modernize fully)
Any project → Retainer (ongoing managed integration support)
Any project → The Shield (now that they're integrated, they need to secure it)
```

---

## Pillar 3 — Veri Rev Ops

### The Core Problem We Solve

Sales teams running on WhatsApp with zero structure. Leads disappear when reps leave. No CRM. No follow-up. No pipeline visibility. The CEO can't see what's happening in sales.

**The emotional trigger:** "My best salesman quit and took all our client contacts with him."
**Our answer:** Single Tenant CRM + AI-powered WhatsApp inbox. The data is yours, always.

### What It Is

A **Private Revenue Data Pipeline** built on:
- **Chatwoot** — unified inbox (WhatsApp + Telegram + Email)
- **EspoCRM** — Single Tenant CRM (hosted on client's infrastructure)
- **VeriRAG Brain** — AI trained on the client's own documents
- **n8n** — automation layer connecting everything

### Key Features

| Feature | What It Does |
|---------|-------------|
| **Universal Inbox** | WhatsApp, Telegram, Email in one panel. Sales history stays with the company. |
| **VeriBot** | AI agent that understands context ("$5K budget, need by Friday") and responds intelligently |
| **VeriRAG Brain** | AI trained on client's price lists, catalogs, product specs (PDF-based) |
| **Audio Intelligence** | Transcribes and processes voice messages from clients |
| **Auto-CRM** | Auto-creates and qualifies leads in EspoCRM from WhatsApp conversations |
| **Stream Summary** | Daily AI-generated chat report sent to management |
| **Multimodal Vision** | Bot analyzes images (broken part photos, error screens) via Gemini Vision |

### Pricing

#### Setup (One-Time)

| Item | Price | What It Covers |
|------|-------|----------------|
| **Implementation & Knowledge Engineering** | **$497** | Data cleaning, embedding 3 Truth Documents, WhatsApp → EspoCRM mapping |

#### Monthly Plans

| Plan | Price | AI Quota | Best For |
|------|-------|----------|---------|
| **Veridata Growth** ⭐ | $349/mo | 5,000 msgs/audios | SMBs with active WhatsApp sales |
| **Fractional CTO** | $997/mo | 15,000 msgs/audios | Larger teams, unlimited knowledge slots, weekly updates |

#### Add-Ons

| Add-On | Price |
|--------|-------|
| **VeriSync Live** (Google Sheets live pricing) | $147 one-time *(requires Growth)* |
| AI Message Top-up (5,000 interactions) | $20/pack |
| New Knowledge Slot (4th, 5th, 6th document) | $47 one-time |
| Emergency Re-Train (rush same week) | $29 |
| Data Cleaning Services | $50/hr |

> **Fair Use:** When the monthly message limit is hit, the bot stays online as a normal channel — human agents can message freely. AI auto-responses pause until next cycle or a top-up is added.

### Upsell Path

```
Growth → Fractional CTO (when volume grows or they want unlimited slots)
Growth + VeriSync Live (when they update pricing frequently)
Rev Ops → The Engine (when they want the CRM connected to their ERP)
Rev Ops → The Shield (when their first enterprise prospect asks about security)
```

---

## Cross-Pillar Strategy

### The Natural Progression

Most clients enter through one pillar and naturally expand:

```
The Shield ──► "Now that I'm secure, my systems are still disconnected"
                        │
                        ▼
                   The Engine ──► "Now that I'm integrated, my sales team is still chaos"
                                           │
                                           ▼
                                      Veri Rev Ops
```

> The goal is **all three pillars** per client. A client with The Shield + The Engine + Rev Ops is the ideal full-stack account.

### Ideal Client Profile (ICP)

- B2B service company or SaaS in LatAm (Colombia, Brazil, Argentina, Mexico)
- 20–100 employees
- Pursuing US or EU enterprise contracts
- Technically understaffed (no internal CTO or architect)
- Has existing legacy systems they can't replace
- Sales team primarily operates via WhatsApp

### Entry Points by Pain

| Client Says | Start Here | Natural Next |
|-------------|------------|--------------|
| "We're failing security questionnaires" | The Shield — Connect & Protect | The Engine |
| "Our team wastes hours copying data between systems" | The Engine — API Gateway | The Shield |
| "We lose leads when salespeople quit" | Rev Ops — Growth | The Engine |
| "We want to close US enterprise clients" | The Shield — Transform | The Engine |
| "We have MuleSoft but aren't using it right" | The Engine — Enterprise Path | The Shield |

---

## Pricing Philosophy

- **Cybersecurity** is recurring (retainer) — this is the MRR foundation. Protect and grow this base.
- **Integrations** are project-based — larger one-time cash flow, optional retainer to convert to MRR.
- **Rev Ops** is hybrid — setup fee covers CAC + a monthly subscription.
- **Never discount the setup fee** — it represents real hours of architecture and data work. Discounting it signals commodity.
- **The per-user pricing on cybersecurity** scales naturally with client growth — no renegotiation needed.

---

## Contact & Sales Channels

| Channel | Use |
|---------|-----|
| **Calendly** | calendly.com/veridata/discovery — primary discovery call booking |
| **WhatsApp** | +1 (740) 520-8080 — LatAm clients prefer this |
| **Telegram Bot** | @veridatapro_bot — tech-forward prospects |
| **Email** | hello@veridatapro.com — formal inquiries |

---

## VeriAcademy (Sister Brand)

**veriacademy.com** — courses on AI Literacy, AI for Productivity, AI for Parents.

Strategic role: top-of-funnel brand awareness and trust-building. Graduates of VeriAcademy courses are warm leads for Veridata Pro services. Don't conflate the two brands publicly — keep them separate but let the relationship be discoverable.

---

*Internal use only — Ugo Guazelli / Veridata Pro*
*Last updated: April 2026*
