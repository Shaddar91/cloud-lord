# Copy-paste prompt for Claude Design

> Paste everything below this line into a new Claude Design project, and upload the 4 screenshots from the `screenshots/` folder alongside it.

---

I have a personal consultancy website called **Cloud Lord** and I'd like your help redesigning it. I'm attaching 4 screenshots of the current site: desktop hero, desktop full page, mobile hero, mobile full page.

## About the site

- **Name:** Cloud Lord
- **Owner:** Tomislav Ivanovic (solo consultant)
- **What I sell:** IT consultancy — cloud infrastructure (AWS, Hetzner), DevOps automation, Kubernetes, Terraform, AI/ML engineering
- **Audience:** Tech decision makers (CTOs, founders, engineering leads) looking for a senior consultant
- **Built with:** React + Material-UI (I can port any design back into these components)

## Current design in brief

- Dark theme, pure black background with subtle dark ambient image
- Blue accent color `#646cff` (same as Vite's default blue — slightly generic)
- Single scrolling page, 3 sections: About → Services → Contact
- Sticky navbar with logo and section links
- Everything rendered as white-translucent cards on black
- Font is Inter

## What I want from you

Please do **three things**, in order:

### 1. Critique the current design

Be direct. Tell me what's weak, what's confusing, what's generic, what doesn't earn trust from a CTO. Look at the screenshots and point to specific things — not vague advice.

### 2. Propose three redesign directions

Each direction should be visually distinct, not a variation of the same idea:

- **Direction A — Minimal / editorial**
  Think Vercel, Linear, Stripe. Lots of whitespace, restrained typography, tiny accent color use.

- **Direction B — Bold / technical**
  Think terminal aesthetics, monospace accents, confident color, opinionated layout. Should feel like the site was built by someone who actually ships infra.

- **Direction C — Enterprise / trust-forward**
  Think McKinsey-meets-AWS. Serious, credibility-first, case studies and metrics foregrounded. Blue/navy grounded.

For each direction, show me a full hero section + services section + contact section mockup, at desktop AND mobile sizes.

### 3. Recommend one

After showing all three, tell me which you'd pick for a solo consultant pitching senior engineering buyers, and why. Three sentences max.

## Constraints

- Must work as a single scrolling page (I'm not rebuilding routing)
- Keep the 3-section structure: About, Services, Contact
- Need to be implementable with Material-UI components
- Don't invent fake testimonials or client logos — leave placeholders I can fill in

When you're done, export the chosen direction as HTML so I can feed it to Claude Code to port into my React codebase.
