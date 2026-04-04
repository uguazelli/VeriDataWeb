# VeriData Pro Website Update Plan

## Project Overview
Update the VeriData Pro website to consolidate messaging around security as the primary offering, with MuleSoft/integration as the implementation method. The site is a static HTML website with Tailwind CSS, not Next.js/React as initially described.

## Current Structure Analysis
- Static HTML with Tailwind CSS
- Multiple language versions: English (en), Spanish (es), Portuguese (pt)
- Component-based: header.html, footer.html
- Pages: Home, Integrations, Cybersecurity, Leadership, Academy, RevOps (commented out)

## Required Changes

### 1. Homepage Hero Section (en/index.html)
**Current:**
- Headline: "We get LatAm companies past US enterprise security gates. So deals close faster."
- Subhead: "Fractional architecture for B2B companies expanding into US and European markets..."
- CTAs: "Explore Solutions", "Book a Free Discovery Call"

**New:**
- Headline: "Pass Your Enterprise Security Audit in 48 Hours"
- Subhead: "LatAm companies use our VeriGate architecture to close US/EU deals — minimal code changes, full compliance, zero downtime."
- Risk reversal line: "Audit-ready guarantee: If you don't pass the security review, we work free until you do"
- CTAs: Primary="See if you qualify" (links to Calendly), Secondary="View Security Packages" (links to cybersecurity.html)

### 2. Navigation Updates (components/header.html)
**Current order:** Home | Integrations | Cybersecurity | Leadership
**New order:** Home | Security Packages | Integrations | Leadership | Academy

**Changes:**
- Rename "Cybersecurity" to "Security Packages" (keep same href="cybersecurity.html")
- Remove "RevOps" from navigation (already commented out)
- Ensure "Contact Us" button links to booking calendar (already links to contact.html which should redirect to Calendly)

### 3. Integrations Page (en/integrations.html)
**Security-First Messaging:**
- Add text block: "Every integration we build includes enterprise-grade security baked in — API gateways, identity management, and audit trails. Your MuleSoft investment becomes a security asset, not a liability."
- Frame all integration services as "security-first architecture"

**RevOps Content Integration:**
- Move RevOps content into Integrations page as "Process Automation" subsection
- Update page structure to include this section

### 4. Leadership Page (en/leadership.html)
**Additions:**
- Make "15+ Years Experience" stat card on homepage clickable (link to leadership.html)
- Add certification badges section under Ugo's bio:
  - MuleSoft Certified Platform Architect (placeholder badge)
  - AWS Solutions Architect (placeholder badge)
- Add LinkedIn profile link button next to "Visit VeriAcademy" link
- Add "Previous Experience" line: "Previously architected integrations for [fintech/enterprise] companies in LatAm and US markets"

### 5. SSO Messaging Correction
**Find and replace across all HTML files:**
- "zero code changes" → "minimal code footprint"
- "without code changes" → "non-invasive implementation"
- "no-code" → "zero downtime deployment"
- "SSO for legacy apps — no code changes" → "SSO via gateway headers — minimal legacy modification"

**Specific VeriGate copy:**
- *Legacy apps*: "Secure wrapper architecture — we inject authentication headers (x-client) at the gateway level without rewriting your legacy codebase."
- *Modern apps*: "Lightweight SDK implementation — minimal code injection for modern applications, full integration for legacy systems via APISIX gateway."

### 6. Trust Signals
**Testimonials:**
- Remove anonymous testimonial ("CTO, SaaS company — Mexico") if it exists
- Keep real testimonials with company names

**Pilot Program Banner:**
- Add after hero section on homepage: "Launching Q2 2026: 3 pilot spots available for LatAm B2B companies preparing for US expansion. $1,500 (value $3,000). Apply now."
- Style: Green background with white text, prominent CTA

### 7. Footer Updates (components/footer.html)
- Add LinkedIn icon next to existing social links (if any)
- Ensure navigation matches updated structure

### 8. Multi-language Support
- Apply same changes to Spanish (es/) and Portuguese (pt/) versions
- Update navigation in all language header components

## Technical Implementation Notes
1. **File Locations:**
   - English pages: `/en/`
   - Spanish pages: `/es/`
   - Portuguese pages: `/pt/`
   - Components: `/components/header.html`, `/components/footer.html`

2. **Design System:**
   - Maintain green primary color #2D5A3D
   - Keep existing typography and responsive layouts
   - Preserve "VeriGate" product branding

3. **Implementation Approach:**
   - Update English version first, then replicate to other languages
   - Use consistent copy updates across all pages
   - Test responsive layouts after changes

## Files to Modify
1. `en/index.html` - Homepage hero, testimonials, pilot banner
2. `en/integrations.html` - Security messaging, RevOps content integration
3. `en/leadership.html` - Certification badges, LinkedIn link, experience text
4. `en/cybersecurity.html` - SSO messaging updates
5. `components/header.html` - Navigation reordering
6. `components/footer.html` - LinkedIn icon addition
7. `es/` and `pt/` directories - All corresponding files

## Success Criteria
- Security positioned as primary offering
- Clear "security-first" messaging for integrations
- Accurate SSO implementation descriptions
- Updated navigation reflecting service consolidation
- Consistent messaging across all language versions