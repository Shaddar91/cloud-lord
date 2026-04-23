# Cloud Lord — Current Design Snapshot

A factual description of the site as it exists today. Use this to tell Claude Design what you have before asking it to propose changes.

## Identity

- **Name:** Cloud Lord
- **Owner:** Tomislav Ivanovic
- **Purpose:** Professional IT consultancy — pitching services to businesses
- **Audience:** Tech decision makers, CTOs, founders looking for cloud/DevOps/AI help
- **Tone today:** Dark, technical, serious

## Services offered

1. Cloud Infrastructure & DevOps (AWS, Hetzner, Terraform, Ansible)
2. AI & Machine Learning Engineering (LLMs, ML pipelines)
3. Container Orchestration (Kubernetes, Docker, Helm)
4. Database & Data Engineering (PostgreSQL, MySQL, Redis)

## Site structure

Single-page app with smooth-scroll navigation. Three sections stacked vertically:

1. **About** — hero with tagline, company description paragraph, 4 highlight cards (Cloud Native, Security First, DevOps Excellence, AI Engineering)
2. **Services** — 4 main service cards with features, then a 17-icon technology stack grid
3. **Contact** — 4 contact cards (Email, LinkedIn, GitHub, Location)

Sticky navbar at the top with logo, 3 section links, LinkedIn + GitHub icons.

## Design system (current)

### Colors

- Background: pure black `#000000` with semi-transparent overlays
- Primary accent: blue `#646cff`, secondary `#747bff` (gradient)
- Text: white with opacity variants (100% / 70% / 50%)
- Borders: white at 10–30% opacity

### Typography

- Font stack: `Inter, system-ui, Avenir, Helvetica, Arial, sans-serif`
- Scale: h3 for section titles, h4 for subsections, h5 for cards, h6 for taglines
- Logo wordmark uses a blue gradient (`#646cff` → `#747bff`), clipped to text

### Layout

- Max container width: 1400px
- Section padding: 2–3rem desktop, 1.5rem mobile
- Card gap: 2–3rem
- Border radius: 12px on cards and sections
- Cards: semi-transparent white overlay on dark background
- Navbar: black 95% opacity with `backdrop-filter: blur(10px)`, 1px bottom border

### Background

- Body uses a dark image (`cool.png`) with low opacity as ambient texture behind content

## Tech stack (for context — not a design concern)

React 18 + Vite + Material-UI 5 + React Router + react-scroll + React Helmet.

Design is implemented via MUI's `sx` prop (inline styling), not a separate design token system.

## What works today

- Consistent dark aesthetic throughout
- Clear information hierarchy: who → what → how to reach
- Navbar is sticky and easy to use
- Logo has personality (the blue gradient treatment)
- Mobile layout collapses sensibly

## What might not be working (for Claude Design to assess)

- Hero doesn't clearly state a value proposition — just says the name and a tagline
- No social proof, no case studies, no client logos
- All 4 highlight cards look identical, blending together
- Services section is dense — 4 service cards + 17 tech icons is a lot to scan
- No visual rhythm; everything uses the same dark card on dark background
- No call-to-action — nothing tells a visitor what to *do* next
- Typography is one flat family; no contrast between display and body
- Blue accent is a slightly generic Vite-ish blue, not distinctive to "Cloud Lord"
